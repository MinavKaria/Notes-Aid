import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import getDataModel from '@/app/interface/dataModel';
import { SgpaEntry, LeaderboardFilter, SemesterFilter } from '@/types/api';

// Helper function to calculate average CGPA
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

export async function GET(request: NextRequest) {
  try {
    const connection = await dbConnect('leaderboard');
    
    // @ts-expect-error getDataModel return type not properly typed
    const DataModel = getDataModel(connection);

    const { searchParams } = new URL(request.url);

    // Build complex filter
    const filter: LeaderboardFilter = {
      admission_year: 0 // Will be set below
    };

    // Admission Year (compulsory, default 2024)
    const admissionYear = searchParams.get('admission_year') ? 
      Number(searchParams.get('admission_year')) : 2024;
    filter.admission_year = admissionYear;

    // Text search in name (fuzzy search)
    const searchQuery = searchParams.get('q');
    if (searchQuery) {
      filter.$or = [
        { name: { $regex: searchQuery, $options: 'i' } },
        { seat_number: { $regex: searchQuery, $options: 'i' } }
      ];
    }

    // Specific name search
    if (searchParams.has('name')) {
      const nameValue = searchParams.get('name');
      if (nameValue) {
        filter.name = { $regex: nameValue, $options: 'i' };
      }
    }

    // CGPA range
    if (searchParams.has('min_cgpa') || searchParams.has('max_cgpa')) {
      filter.avg_cgpa = {};
      if (searchParams.has('min_cgpa')) {
        filter.avg_cgpa.$gte = Number(searchParams.get('min_cgpa'));
      }
      if (searchParams.has('max_cgpa')) {
        filter.avg_cgpa.$lte = Number(searchParams.get('max_cgpa'));
      }
    }

    // Semester-specific SGPA filters
    if (searchParams.has('semester_sgpa_min') || searchParams.has('semester_sgpa_max')) {
      const semesterFilter: SemesterFilter = {};
      if (searchParams.has('semester_sgpa_min')) {
        semesterFilter.$gte = Number(searchParams.get('semester_sgpa_min'));
      }
      if (searchParams.has('semester_sgpa_max')) {
        semesterFilter.$lte = Number(searchParams.get('semester_sgpa_max'));
      }
      filter['sgpa_list.sgpa'] = semesterFilter;
    }

    // Pagination
    const page = Number(searchParams.get('page')) || 1;
    const limit = Math.min(Number(searchParams.get('limit')) || 20, 50);
    const skip = (page - 1) * limit;

    // Sorting
    const sort: Record<string, 1 | -1> = { avg_cgpa: -1 }; // Default sort
    if (searchParams.has('sort_by')) {
      const sortBy = searchParams.get('sort_by');
      const sortOrder = searchParams.get('sort_order') === 'asc' ? 1 : -1;
      if (sortBy) {
        sort[sortBy] = sortOrder;
      }
    }

    const data: unknown[] = await DataModel.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean();

    // Calculate avg_cgpa if not present
    const processedData = data.map((student: unknown) => {
      const studentData = student as Record<string, unknown>;
      return {
        ...studentData,
        avg_cgpa: (studentData.avg_cgpa as number) ?? calculateAvgCgpa(studentData.sgpa_list as SgpaEntry[] | SgpaEntry)
      };
    });

    const total = await DataModel.countDocuments(filter);

    return NextResponse.json({
      data: processedData,
      pagination: {
        current_page: page,
        per_page: limit,
        total_records: total,
        total_pages: Math.ceil(total / limit)
      },
      search_params: {
        query: searchQuery,
        admission_year: admissionYear,
        applied_filters: Object.keys(filter).filter(key => key !== 'admission_year')
      }
    });

  } catch (error) {
    console.error('Search API Error:', error);
    return NextResponse.json(
      { error: 'Search failed' },
      { status: 500 }
    );
  }
}