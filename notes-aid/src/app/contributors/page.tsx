"use client"
import { Github } from 'lucide-react';
import { useState, useEffect } from 'react';
import Image from 'next/image'

interface Contributor {
    id: number;
    login: string;
    avatar_url: string;
    html_url: string;
    contributions: number;
}

export default function Contributors() {
    const [contributors, setContributors] = useState<Contributor[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchContributors = async () => {
            try {
                setLoading(true);
                const response = await fetch('https://api.github.com/repos/MinavKaria/Notes-Aid/contributors');
                
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                
                const data = await response.json();
                setContributors(data);
            } catch (err: any) {
                setError(err.message);
                console.error("Failed to fetch contributors:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchContributors();
    }, []);

    if (loading) return (
        <div className="flex items-center justify-center min-h-screen dark:bg-gray-900">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 dark:border-blue-400"></div>
        </div>
    );
    
    if (error) return (
        <div className="min-h-screen flex items-center justify-center dark:bg-gray-900">
            <div className="bg-red-50 dark:bg-red-900/30 p-6 rounded-lg border border-red-200 dark:border-red-800">
                <p className="text-red-600 dark:text-red-400">Error loading contributors: {error}</p>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-12">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold text-center mb-3 text-gray-800 dark:text-gray-100">
                    Project Contributors
                </h1>
                <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
                    Meet the amazing people who have contributed to this project
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                    {contributors.map(contributor => (
                        <div 
                            key={contributor.id} 
                            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 p-6 flex flex-col items-center"
                        >
                            <div className="relative group mb-4">
                                <div className="h-24 w-24 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700 ring-4 ring-gray-50 dark:ring-gray-700">
                                    <Image 
                                        src={contributor.avatar_url} 
                                        alt={`${contributor.login}'s avatar`}
                                        width={96}
                                        height={96}
                                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                                <div className="absolute inset-0 rounded-full bg-black bg-opacity-0 group-hover:bg-opacity-10 dark:group-hover:bg-opacity-30 transition-all duration-300"></div>
                            </div>
                            
                            <h2 className="text-lg font-semibold text-center text-gray-800 dark:text-gray-200 mb-2">
                                {contributor.login}
                            </h2>
                            {/* <p className="text-center mb-4">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                                    {contributor.contributions} contributions
                                </span>
                            </p> */}
                            <div className="flex justify-center mt-auto">
                               
                                <a 
                                    href={contributor.html_url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center px-3 py-1.5 text-sm rounded-md bg-gray-800 dark:bg-gray-700 text-white hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors duration-200 gap-2"
                                >
                                     <Github className="w-6 h-6 text-gray-800 dark:text-gray-200" />
                                    View Profile
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}