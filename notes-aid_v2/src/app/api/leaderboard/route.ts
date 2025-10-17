import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import dbConnect from '@/lib/mongoose';
import { cache, CacheKeys, CacheTTL } from '@/lib/cache';
import { SgpaEntry, LeaderboardFilter, MongoConnection } from '@/types/api';

function calculateAvgCgpa(sgpaList: SgpaEntry[] | SgpaEntry): number {
  // Handle both array and single object cases
  if (!sgpaList) {
    return 0;
  }
  
  const sgpaArray = Array.isArray(sgpaList) ? sgpaList : [sgpaList];
  if (sgpaArray.length === 0) {
    return 0;
  }
  
  const validSgpas = sgpaArray.filter((sem: SgpaEntry) => sem.sgpa > 0);
  if (validSgpas.length === 0) {
    return 0;
  }
  
  const total = validSgpas.reduce((sum: number, sem: SgpaEntry) => sum + sem.sgpa, 0);
  return Number((total / validSgpas.length).toFixed(2));
}

const getDataModel = (mongooseInstance: MongoConnection) => {
  const DataSchema = new mongoose.Schema({
    seat_number: String,
    name: String,
    admission_year: Number,
    sgpa_list: [{
      semester: Number,
      sgpa: Number
    }],
    avg_cgpa: Number
  }, { strict: false });

  return mongooseInstance.models.data || mongooseInstance.model('data', DataSchema, 'data');
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Try to get from cache first
    const cacheKey = CacheKeys.leaderboard(searchParams);
    const cached = await cache.get(cacheKey);
    if (cached) {
      return NextResponse.json(cached);
    }

    const connection = await dbConnect('leaderboard');
    const DataModel = getDataModel(connection as unknown as MongoConnection);

    
    const filter: LeaderboardFilter = {
      admission_year: 0
    };

    const admissionYear = searchParams.get('admission_year') ? 
      Number(searchParams.get('admission_year')) : 2024;
    filter.admission_year = admissionYear;

    if (searchParams.has('name')) {
      const nameValue = searchParams.get('name');
      if (nameValue) {
        filter.name = { $regex: nameValue, $options: 'i' };
      }
    }

    if (searchParams.has('seat_number')) {
      const seatNumberValue = searchParams.get('seat_number');
      if (seatNumberValue) {
        filter.seat_number = seatNumberValue;
      }
    }

    if (searchParams.has('min_cgpa')) {
      filter.avg_cgpa = { $gte: Number(searchParams.get('min_cgpa')) };
    }
    if (searchParams.has('max_cgpa')) {
      filter.avg_cgpa = { 
        ...filter.avg_cgpa, 
        $lte: Number(searchParams.get('max_cgpa')) 
      };
    }

    const page = Number(searchParams.get('page')) || 1;
    const limit = Math.min(Number(searchParams.get('limit')) || 50, 100); 
    const skip = (page - 1) * limit;

    const sort: Record<string, 1 | -1> = {};
    const sortBy = searchParams.get('sort_by') || 'avg_cgpa';
    const sortOrder = searchParams.get('sort_order') === 'asc' ? 1 : -1;
    
    if (sortBy === 'avg_cgpa') {
      sort.avg_cgpa = sortOrder;
    } else if (sortBy === 'name') {
      sort.name = sortOrder;
    } else if (sortBy === 'seat_number') {
      sort.seat_number = sortOrder;
    } else {
      sort.avg_cgpa = -1; 
    }

    const query = DataModel.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean();

    let data: unknown[] = await query;

    data = data.map((student: unknown) => {
      const studentData = student as Record<string, unknown>;
      return {
        ...studentData,
        avg_cgpa: (studentData.avg_cgpa as number) ?? calculateAvgCgpa(studentData.sgpa_list as SgpaEntry[] | SgpaEntry)
      };
    });

    const total = await DataModel.countDocuments(filter);

    const response = {
      data,
      pagination: {
        current_page: page,
        per_page: limit,
        total_records: total,
        total_pages: Math.ceil(total / limit),
        has_next: skip + limit < total,
        has_prev: page > 1
      },
      filters: {
        admission_year: admissionYear,
        sort_by: sortBy,
        sort_order: sortOrder === 1 ? 'asc' : 'desc'
      }
    };

    // Cache the result for 15 minutes - leaderboard changes frequently
    await cache.set(cacheKey, response, { ttl: CacheTTL.LONG * 3 }); // 15 minutes

    return NextResponse.json(response);

  } catch (error) {
    console.error('Leaderboard API Error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch leaderboard data',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
