import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import getDataModel from '@/app/interface/dataModel';

export async function GET(request: NextRequest) {
  try {
    const connection = await dbConnect('leaderboard');
    // dbConnect returns a Connection; getDataModel expects the mongoose module type.
    // Cast the connection to the expected type to satisfy TypeScript.
    const DataModel = getDataModel((connection as unknown) as typeof import('mongoose'));

    const { searchParams } = new URL(request.url);

    const admissionYear = searchParams.get('admission_year') ? 
      Number(searchParams.get('admission_year')) : 2024;

    const filter = { admission_year: admissionYear };

    const analyticsData = await DataModel.aggregate([
      { $match: filter },
      {
        $group: {
          _id: null,
          total_students: { $sum: 1 },
          avg_cgpa: { $avg: '$avg_cgpa' },
          max_cgpa: { $max: '$avg_cgpa' },
          min_cgpa: { $min: '$avg_cgpa' },
          students_above_9: {
            $sum: { $cond: [{ $gte: ['$avg_cgpa', 9] }, 1, 0] }
          },
          students_above_8: {
            $sum: { $cond: [{ $gte: ['$avg_cgpa', 8] }, 1, 0] }
          },
          students_above_7: {
            $sum: { $cond: [{ $gte: ['$avg_cgpa', 7] }, 1, 0] }
          }
        }
      }
    ]);

    const cgpaDistribution = await DataModel.aggregate([
      { $match: filter },
      {
        $bucket: {
          groupBy: '$avg_cgpa',
          boundaries: [0, 6, 7, 8, 9, 10],
          default: 'Other',
          output: {
            count: { $sum: 1 },
            students: { $push: { name: '$name', cgpa: '$avg_cgpa' } }
          }
        }
      }
    ]);

    const stats = analyticsData[0] || {};

    return NextResponse.json({
      admission_year: admissionYear,
      statistics: {
        total_students: stats.total_students || 0,
        average_cgpa: Number((stats.avg_cgpa || 0).toFixed(2)),
        highest_cgpa: stats.max_cgpa || 0,
        lowest_cgpa: stats.min_cgpa || 0,
        performance_breakdown: {
          above_9_cgpa: stats.students_above_9 || 0,
          above_8_cgpa: stats.students_above_8 || 0,
          above_7_cgpa: stats.students_above_7 || 0
        }
      },
      cgpa_distribution: cgpaDistribution
    });

  } catch (error) {
    console.error('Analytics API Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate analytics' },
      { status: 500 }
    );
  }
}