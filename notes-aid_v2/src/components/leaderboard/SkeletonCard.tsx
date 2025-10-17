
const SkeletonCard = () => (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 animate-pulse">
        <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-gray-700/50 rounded-lg w-10 h-10"></div>
            <div className="text-right">
                <div className="h-8 bg-gray-700/50 rounded w-16 mb-2"></div>
                <div className="h-4 bg-gray-700/50 rounded w-20"></div>
            </div>
        </div>
    </div>
);

export default SkeletonCard;