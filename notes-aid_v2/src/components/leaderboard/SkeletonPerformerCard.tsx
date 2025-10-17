const SkeletonPerformerCard = () => (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 animate-pulse">
        <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-gray-700/50 rounded-full"></div>
                <div>
                    <div className="h-5 bg-gray-700/50 rounded w-24 mb-2"></div>
                    <div className="h-4 bg-gray-700/50 rounded w-16"></div>
                </div>
            </div>
            <div className="text-right">
                <div className="h-6 bg-gray-700/50 rounded w-12 mb-1"></div>
                <div className="h-3 bg-gray-700/50 rounded w-10"></div>
            </div>
        </div>
    </div>
);

const SkeletonPerformanceBreakdown = () => (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 animate-pulse">
        <div className="flex items-center gap-2 mb-6">
            <div className="w-5 h-5 bg-gray-700/50 rounded"></div>
            <div className="h-6 bg-gray-700/50 rounded w-48"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="text-center">
                    <div className="h-10 bg-gray-700/50 rounded w-12 mx-auto mb-2"></div>
                    <div className="h-4 bg-gray-700/50 rounded w-32 mx-auto mb-2"></div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                        <div className="bg-gray-600/50 h-2 rounded-full w-3/4"></div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const SkeletonTopPerformersGrid = ({ count = 6 }: { count?: number }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: count }).map((_, i) => (
            <div
                key={i}
                className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 animate-pulse"
            >
                <div className="absolute top-4 right-4 w-8 h-8 bg-gray-700/50 rounded-full"></div>
                <div className="pr-12">
                    <div className="h-6 bg-gray-700/50 rounded w-32 mb-2"></div>
                    <div className="h-4 bg-gray-700/50 rounded w-20 mb-4"></div>
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="h-8 bg-gray-700/50 rounded w-16 mb-1"></div>
                            <div className="h-3 bg-gray-700/50 rounded w-12"></div>
                        </div>
                        <div className="text-right">
                            <div className="h-5 bg-gray-700/50 rounded w-12 mb-1"></div>
                            <div className="h-3 bg-gray-700/50 rounded w-8"></div>
                        </div>
                    </div>
                </div>
            </div>
        ))}
    </div>
);

export { SkeletonPerformanceBreakdown, SkeletonTopPerformersGrid,SkeletonPerformerCard };