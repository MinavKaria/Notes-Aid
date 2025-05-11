"use client";
import { Github } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";

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
        const response = await fetch(
          "https://api.github.com/repos/MinavKaria/Notes-Aid/contributors"
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        setContributors(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
        console.error("Failed to fetch contributors:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchContributors();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 dark:border-blue-400"></div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center dark:bg-gray-900">
        <div className="bg-red-50 dark:bg-red-900/30 p-6 rounded-lg border border-red-200 dark:border-red-800">
          <p className="text-red-600 dark:text-red-400">
            Error loading contributors: {error}
          </p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-base-200 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-3 text-base-content">
          Project Contributors
        </h1>
        <p className="text-center text-base-content/70 mb-8">
          Meet the amazing people who have contributed to this project
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {contributors.map((contributor) => (
            <div
              key={contributor.id}
              className="card bg-base-100 border border-base-300 shadow hover:shadow-lg transition-all duration-300"
            >
              <div className="card-body items-center text-center">
                <div className="group mb-4">
                  <div className="avatar relative overflow-hidden transition-transform duration-300 transform group-hover:scale-105">
                    <div className="w-24 rounded-full ring ring-base-300 ring-offset-base-100 ring-offset-5 overflow-hidden">
                      <Image
                        src={contributor.avatar_url}
                        alt={`${contributor.login}'s avatar`}
                        width={96}
                        height={96}
                        className="object-cover"
                        unoptimized
                      />
                      <div className="absolute inset-0 rounded-full bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                    </div>
                  </div>
                </div>
                <h2 className="card-title text-base-content">
                  {contributor.login}
                </h2>
                {/* <p className="badge badge-info badge-outline text-xs mt-2">
              {contributor.contributions} contributions
            </p> */}
                <div className="mt-4">
                  <a
                    href={contributor.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm btn-outline gap-2"
                    aria-label="View Profile"
                  >
                    <Github className="w-5 h-5" />
                    View Profile
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
