import type {StudentData} from "@/types/leaderboard";
import {BarChart3, BookOpen, Calendar, Star, Trophy, X} from "lucide-react";

export const StudentDetailModal = ({
                                       student,
                                       isOpen,
                                       onClose
                                   }: {
    student: StudentData | null;
    isOpen: boolean;
    onClose: () => void;
}) => {
    if (!isOpen || !student) return null;


    const sgpaListRaw = student.sgpa_list || [];
    const sgpaList = Array.isArray(sgpaListRaw) ? sgpaListRaw : [sgpaListRaw];
    const validSgpas = sgpaList.filter(sgpa => sgpa && sgpa.sgpa > 0);

    // Calculate analytics
    const bestSemester = validSgpas.reduce((max, current) =>
        current.sgpa > max.sgpa ? current : max, validSgpas[0] || {semester: 0, sgpa: 0});
    const worstSemester = validSgpas.reduce((min, current) =>
        current.sgpa < min.sgpa ? current : min, validSgpas[0] || {semester: 0, sgpa: 0});

    // Calculate trend (improvement/decline)
    const trend = validSgpas.length >= 2
        ? validSgpas[validSgpas.length - 1].sgpa - validSgpas[0].sgpa
        : 0;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div
                className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-gray-800 rounded-2xl border border-gray-700 shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-700">
                    <div>
                        <h2 className="text-2xl font-bold text-white">{student.name}</h2>
                        <p className="text-gray-400">{student.seat_number} • {student.admission_year}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                    >
                        <X className="w-5 h-5"/>
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    {/* Overall Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-gray-700/30 rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <Trophy className="w-4 h-4 text-yellow-400"/>
                                <span className="text-sm text-gray-400">Overall CGPA</span>
                            </div>
                            <div className="text-2xl font-bold text-white">
                                {student.avg_cgpa?.toFixed(2) || 'N/A'}
                            </div>
                        </div>

                        <div className="bg-gray-700/30 rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <BookOpen className="w-4 h-4 text-blue-400"/>
                                <span className="text-sm text-gray-400">Completed Semesters</span>
                            </div>
                            <div className="text-2xl font-bold text-white">
                                {validSgpas.length}
                            </div>
                        </div>

                        <div className="bg-gray-700/30 rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <BarChart3 className="w-4 h-4 text-green-400"/>
                                <span className="text-sm text-gray-400">Performance Trend</span>
                            </div>
                            <div className={`text-2xl font-bold ${
                                trend > 0 ? 'text-green-400' : trend < 0 ? 'text-red-400' : 'text-gray-400'
                            }`}>
                                {trend > 0 ? '+' : ''}{trend.toFixed(2)}
                            </div>
                        </div>
                    </div>

                    {/* Semester Breakdown */}
                    <div>
                        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-blue-400"/>
                            Semester-wise SGPA Breakdown
                        </h3>

                        {validSgpas.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {validSgpas.sort((a, b) => a.semester - b.semester).map(({semester, sgpa}) => (
                                    <div
                                        key={semester}
                                        className={`bg-gray-700/30 rounded-lg p-4 border-l-4 ${
                                            semester === bestSemester.semester
                                                ? 'border-green-400 bg-green-900/20'
                                                : semester === worstSemester.semester && validSgpas.length > 1
                                                    ? 'border-red-400 bg-red-900/20'
                                                    : 'border-gray-600'
                                        }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <div className="text-sm text-gray-400 mb-1">Semester {semester}</div>
                                                <div className={`text-xl font-bold ${
                                                    sgpa >= 9 ? 'text-green-400' :
                                                        sgpa >= 8 ? 'text-yellow-400' :
                                                            sgpa >= 7 ? 'text-blue-400' : 'text-gray-400'
                                                }`}>
                                                    {sgpa.toFixed(2)}
                                                </div>
                                            </div>
                                            {semester === bestSemester.semester && validSgpas.length > 1 && (
                                                <Star className="w-4 h-4 text-green-400"/>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8 text-gray-400">
                                No semester data available
                            </div>
                        )}
                    </div>


                    {validSgpas.length > 1 && (
                        <div>
                            <h3 className="text-xl font-bold text-white mb-4">Performance Analysis</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-green-900/20 border border-green-400/30 rounded-lg p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Star className="w-4 h-4 text-green-400"/>
                                        <span className="text-sm text-green-400">Best Performance</span>
                                    </div>
                                    <div className="text-white">
                                        Semester {bestSemester.semester}: <span
                                        className="font-bold">{bestSemester.sgpa.toFixed(2)}</span>
                                    </div>
                                </div>

                                <div className="bg-red-900/20 border border-red-400/30 rounded-lg p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <BarChart3 className="w-4 h-4 text-red-400"/>
                                        <span className="text-sm text-red-400">Lowest Performance</span>
                                    </div>
                                    <div className="text-white">
                                        Semester {worstSemester.semester}: <span
                                        className="font-bold">{worstSemester.sgpa.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};