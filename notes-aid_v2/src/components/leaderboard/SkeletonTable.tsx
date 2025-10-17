const SkeletonTable = ({ rows = 10 }: { rows?: number }) => (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 overflow-hidden animate-pulse">
        <div className="p-6 border-b border-gray-700">
            <div className="h-6 bg-gray-700/50 rounded w-48"></div>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead className="bg-gray-700/50">
                <tr>
                    <th className="py-4 px-6">
                        <div className="h-4 bg-gray-600/50 rounded w-12"></div>
                    </th>
                    <th className="py-4 px-6">
                        <div className="h-4 bg-gray-600/50 rounded w-16"></div>
                    </th>
                    <th className="py-4 px-6">
                        <div className="h-4 bg-gray-600/50 rounded w-24"></div>
                    </th>
                    <th className="py-4 px-6">
                        <div className="h-4 bg-gray-600/50 rounded w-16"></div>
                    </th>
                    <th className="py-4 px-6">
                        <div className="h-4 bg-gray-600/50 rounded w-12"></div>
                    </th>
                </tr>
                </thead>
                <tbody>
                {Array.from({ length: rows }).map((_, i) => (
                    <tr key={i} className="border-t border-gray-700/50">
                        <td className="py-4 px-6">
                            <div className="w-8 h-8 bg-gray-700/50 rounded-full"></div>
                        </td>
                        <td className="py-4 px-6">
                            <div className="h-5 bg-gray-700/50 rounded w-32"></div>
                        </td>
                        <td className="py-4 px-6">
                            <div className="h-5 bg-gray-700/50 rounded w-20"></div>
                        </td>
                        <td className="py-4 px-6">
                            <div className="h-5 bg-gray-700/50 rounded w-16"></div>
                        </td>
                        <td className="py-4 px-6">
                            <div className="h-5 bg-gray-700/50 rounded w-12"></div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    </div>
);

export default SkeletonTable;