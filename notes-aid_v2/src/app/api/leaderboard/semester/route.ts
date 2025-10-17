import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import { PipelineStage } from "mongoose";
import getDataModel from '@/app/interface/dataModel';

export async function GET(request: NextRequest) {
  try {
    const connection = await dbConnect('leaderboard');

    // @ts-expect-error getDataModel return type not properly typed
    const DataModel = getDataModel(connection);

    const { searchParams } = new URL(request.url);

    const admissionYear = searchParams.get('admission_year') ? 
      Number(searchParams.get('admission_year')) : 2024;

    const semester = searchParams.get('semester');
    if (!semester) {
      return NextResponse.json(
        { error: 'semester parameter is required' },
        { status: 400 }
      );
    }

    const semesterNum = Number(semester);


    const page = Number(searchParams.get('page')) || 1;
    const limit = Math.min(Number(searchParams.get('limit')) || 50, 100);
    const skip = (page - 1) * limit;


    const pipeline: PipelineStage[] = [
      { $match: { admission_year: admissionYear } },
      { $unwind: { path: '$sgpa_list' } },
      { 
        $match: { 
          'sgpa_list.semester': semesterNum,
          'sgpa_list.sgpa': { $gt: 0 }
        } 
      },
      {
        $addFields: {
          semester_sgpa: '$sgpa_list.sgpa',
          semester_number: semesterNum
        }
      },
      { $sort: { 'sgpa_list.sgpa': -1 } },
      { $skip: skip },
      { $limit: limit }
    ];

    const data = await DataModel.aggregate(pipeline);

    const countPipeline = [
      { $match: { admission_year: admissionYear } },
      { $unwind: { path: '$sgpa_list' } },
      { 
        $match: { 
          'sgpa_list.semester': semesterNum,
          'sgpa_list.sgpa': { $gt: 0 }
        } 
      },
      { $count: 'total' }
    ];

    const countResult = await DataModel.aggregate(countPipeline);
    const total = countResult[0]?.total || 0;

    return NextResponse.json({
      data,
      pagination: {
        current_page: page,
        per_page: limit,
        total_records: total,
        total_pages: Math.ceil(total / limit),
        has_next: skip + limit < total,
        has_prev: page > 1
      },
      metadata: {
        admission_year: admissionYear,
        semester: semesterNum,
        type: 'semester_wise_ranking'
      }
    });

  } catch (error) {
    console.error('Semester API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch semester data' },
      { status: 500 }
    );
  }
}