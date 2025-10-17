import type {StudentData} from "@/types/leaderboard";

export function calculateTiedRanks(
    students: StudentData[],
    scoreField: "avg_cgpa" | "semester_sgpa",
    pageOffset: number = 0
): Array<{ student: StudentData; rank: number; index: number }> {
    const studentsWithRanks: Array<{
        student: StudentData;
        rank: number;
        index: number;
    }> = [];
    let currentRank = 1 + pageOffset;
    let previousScore: number | null = null;
    let studentsWithSameRank = 0;

    students.forEach((student, index) => {
        const currentScore =
            scoreField === "avg_cgpa" ? student.avg_cgpa : student.semester_sgpa;

        if (previousScore !== null && currentScore !== previousScore) {
            currentRank += studentsWithSameRank;
            studentsWithSameRank = 1;
        } else if (previousScore === currentScore) {
            studentsWithSameRank++;
        } else {
            studentsWithSameRank = 1;
        }

        studentsWithRanks.push({
            student,
            rank: currentRank,
            index,
        });

        previousScore = currentScore || 0;
    });

    return studentsWithRanks;
}