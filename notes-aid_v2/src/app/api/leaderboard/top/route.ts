import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import getDataModel from '@/app/interface/dataModel';
import { SgpaEntry } from '@/types/api';

export async function GET(request: NextRequest) {
    try {
        const connection = await dbConnect('leaderboard');

        // @ts-expect-error getDataModel return type not properly typed
        const DataModel = getDataModel(connection);

        const { searchParams } = new URL(request.url);

        // Admission Year (compulsory, default 2024)
        const admissionYear = searchParams.get('admission_year') ? 
            Number(searchParams.get('admission_year')) : 2024;

        const filter = { admission_year: admissionYear };

        // Get top N students (default 10, max 50)
        const topN = Math.min(Number(searchParams.get('count')) || 10, 50);

        const data: unknown[] = await DataModel.find(filter)
            .sort({ avg_cgpa: -1 })
            .limit(topN)
            .lean();

        // Calculate avg_cgpa if not present
        const processedData = data.map((student: unknown) => {
            const studentData = student as Record<string, unknown>;
            return {
                ...studentData,
                avg_cgpa: (studentData.avg_cgpa as number) ?? calculateAvgCgpa(studentData.sgpa_list as SgpaEntry[] | SgpaEntry)
            };
        });

        return NextResponse.json({
            data: processedData,
            metadata: {
                admission_year: admissionYear,
                top_count: topN,
                type: 'top_cgpa_performers'
            }
        });

    } catch (error) {
        console.error('Top API Error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch top performers' },
            { status: 500 }
        );
    }
}

function calculateAvgCgpa(sgpa_list: SgpaEntry[] | SgpaEntry): number | null {
    if (!sgpa_list) return null;
    
    const sgpaArray = Array.isArray(sgpa_list) ? sgpa_list : [sgpa_list];
    if (sgpaArray.length === 0) return null;
    
    const validSgpas = sgpaArray.filter((sgpa: SgpaEntry) => typeof sgpa.sgpa === 'number' && !isNaN(sgpa.sgpa));
    if (validSgpas.length === 0) return null;
    
    const sum = validSgpas.reduce((acc: number, sgpa: SgpaEntry) => acc + sgpa.sgpa, 0);
    return Number((sum / validSgpas.length).toFixed(2));
}

