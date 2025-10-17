"use client";
import React, { useState, useEffect } from "react";
import {
  Users,
  Clock,
  ArrowRight,
  Heart,
  Star,
  GitBranch,
  Github,
} from "lucide-react";

import Layout from "@/components/Layout";

interface Contributor {
  username: string;
  name: string;
  avatar_url: string;
  contributions: number;
  profile_url: string;
}

const App = () => {
  const [scrollY] = useState(0);
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [loadingContributors, setLoadingContributors] = useState(false);

  // useEffect(() => {
  //   const handleScroll = () => setScrollY(window.scrollY);
  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, []);

  const contributionReasons = [
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Help Fellow Students",
      description:
        "Share your knowledge and help thousands of students succeed in their academic journey.",
      color: "text-red-400",
    },
      {
        icon: <Clock className="w-6 h-6" />,
        title: "Make Learning Accessible",
        description:
          "Contribute to a platform that provides free educational resources to students college-wide.",
        color: "text-blue-400",
      },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Join Our Community",
      description:
        "Connect with like-minded students and developers who are passionate about education.",
      color: "text-green-400",
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: "Gain Recognition",
      description:
        "Get featured on our contributors wall and build your reputation in the developer community.",
      color: "text-yellow-400",
    },
  ];

  const fetchContributors = async () => {
    setLoadingContributors(true);
    try {
      const response = await fetch("/contributors.json");
      if (!response.ok) throw new Error("Failed to fetch contributors");

      const contributorsData = await response.json();

      const contributorsWithGitHubData = await Promise.all(
        contributorsData.map(async (contributor: Contributor) => {
          try {
            const githubResponse = await fetch(
              `https://api.github.com/users/${contributor.username}`
            );
            if (githubResponse.ok) {
              const githubData = await githubResponse.json();
              return {
                username: contributor.username,
                name: githubData.name || contributor.username,
                avatar_url: githubData.avatar_url,
                contributions: contributor.contributions || 1,
                profile_url: githubData.html_url,
              };
            }
          } catch (error) {
            console.error(
              `Error fetching GitHub data for ${contributor.username}:`,
              error
            );
          }

          return {
            username: contributor.username,
            name: contributor.name || contributor.username,
            avatar_url: `https://github.com/${contributor.username}.png`,
            contributions: contributor.contributions || 1,
            profile_url: `https://github.com/${contributor.username}`,
          };
        })
      );

      setContributors(
        contributorsWithGitHubData.sort(
          (a, b) => b.contributions - a.contributions
        )
      );
    } catch (error) {
      console.error("Error fetching contributors:", error);
      // Fallback contributors
      setContributors([
        {
          username: "minavkaria",
          name: "Minav Karia",
          avatar_url: "https://github.com/minavkaria.png",
          contributions: 150,
          profile_url: "https://github.com/minavkaria",
        },
        {
          username: "yashankkothari",
          name: "Yashank Kothari",
          avatar_url: "https://github.com/yashankkothari.png",
          contributions: 120,
          profile_url: "https://github.com/yashankkothari",
        },
      ]);
    } finally {
      setLoadingContributors(false);
    }
  };

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    fetchContributors();
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Layout>
      <section className="relative min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-4xl mx-auto">
          <div
            className="mb-8 relative"
            style={{ transform: `translateY(${scrollY * 0.1}px)` }}
          >
            <div className="w-32 h-32 mx-auto mb-8 relative group">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 opacity-20 group-hover:animate-pulse" />
              <div className="absolute inset-2 rounded-xl bg-black border-2 border-white flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:animate-logo-pulse">
                <div className="relative w-16 h-12 group-hover:animate-book-glow">
                  <div className="absolute left-1/2 top-0 w-0.5 h-full bg-white/60 transform -translate-x-1/2" />

                  <div className="absolute left-0 top-0 w-7 h-full bg-white rounded-l-md border border-white/30 group-hover:animate-page-flip-left">
                    <div className="p-1.5 space-y-1">
                      <div
                        className="h-0.5 bg-gray-400 rounded animate-text-appear"
                        style={{ width: "80%", animationDelay: "0.1s" }}
                      />
                      <div
                        className="h-0.5 bg-gray-400 rounded animate-text-appear"
                        style={{ width: "90%", animationDelay: "0.2s" }}
                      />
                      <div
                        className="h-0.5 bg-gray-400 rounded animate-text-appear"
                        style={{ width: "75%", animationDelay: "0.3s" }}
                      />
                      <div
                        className="h-0.5 bg-gray-400 rounded animate-text-appear"
                        style={{ width: "85%", animationDelay: "0.4s" }}
                      />
                    </div>
                  </div>

                  <div className="absolute right-0 top-0 w-7 h-full bg-white rounded-r-md border border-white/30 group-hover:animate-page-flip-right">
                    <div className="p-1.5 space-y-1">
                      <div
                        className="h-0.5 bg-gray-400 rounded animate-text-appear"
                        style={{ width: "85%", animationDelay: "0.5s" }}
                      />
                      <div
                        className="h-0.5 bg-gray-400 rounded animate-text-appear"
                        style={{ width: "70%", animationDelay: "0.6s" }}
                      />
                      <div
                        className="h-0.5 bg-gray-400 rounded animate-text-appear"
                        style={{ width: "90%", animationDelay: "0.7s" }}
                      />
                      <div
                        className="h-0.5 bg-gray-400 rounded animate-text-appear"
                        style={{ width: "80%", animationDelay: "0.8s" }}
                      />
                    </div>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-blue-400/20 to-purple-400/20 rounded-lg group-hover:animate-book-inner-glow" />

                  <div className="absolute -top-2 -left-2 w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-80 group-hover:animate-sparkle-1" />
                  <div className="absolute -top-1 -right-3 w-1 h-1 bg-purple-400 rounded-full opacity-0 group-hover:opacity-70 group-hover:animate-sparkle-2" />
                  <div className="absolute -bottom-2 left-1 w-1.5 h-1.5 bg-blue-400 rounded-full opacity-0 group-hover:opacity-75 group-hover:animate-sparkle-3" />
                  <div className="absolute -bottom-1 -right-1 w-1 h-1 bg-pink-400 rounded-full opacity-0 group-hover:opacity-80 group-hover:animate-sparkle-4" />
                </div>
              </div>
            </div>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">
            NotesAid
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            All subjects for your course, semester, and branch. Centralized and
            free.
          </p>

          <div className="flex justify-center items-center">
            <button
              className="group bg-white text-black px-8 py-4 rounded-full font-medium text-lg hover:bg-gray-100 transition-all duration-300 flex items-center space-x-2 shadow-2xl hover:shadow-white/20"
              onClick={() => {
                window.location.href = "/select";
              }}
            >
              <span>Start Learning Now</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
              <div className="flex flex-col items-center space-y-1">
                  <div className="text-white/70 text-sm font-light animate-pulse">Scroll</div>
                  <div className="animate-bounce">
                      <svg
                          className="w-5 h-5 text-white/70"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                      >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                  </div>
              </div>
          </div>

      </section>

      <section id="contribute" className="py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/30 to-gray-900/50" />
        <div className="absolute inset-0">
          <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_50%_50%,_rgba(17,24,39,0)_0%,_rgba(88,28,135,0.15)_50%,_rgba(0,0,0,0)_100%)]" />
        </div>

        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm mb-6 backdrop-blur-sm">
              <GitBranch className="w-4 h-4 mr-2" />
              Open Source
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-600 bg-clip-text text-transparent">
              Want to Contribute?
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Join our amazing community of contributors and help make education
              accessible for everyone
            </p>
          </div>

          <div className="max-w-5xl mx-auto mb-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {contributionReasons.map((reason, index) => (
                <div
                  key={index}
                  className="group p-4 rounded-lg bg-gray-900/30 border border-gray-800 hover:border-gray-700 transition-all duration-300 text-center"
                >
                  <div className="flex justify-center mb-3">
                    <div
                      className={`p-2.5 rounded-full bg-gray-800/50 ${reason.color}`}
                    >
                      {reason.icon}
                    </div>
                  </div>
                  <h3 className="text-base font-semibold mb-2 text-white">
                    {reason.title}
                  </h3>
                  <p className="text-gray-400 text-xs leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-gray-900/40 border border-gray-800 rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-4 text-white">
                Ready to Make a Difference?
              </h3>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Want to contribute notes, videos, or other educational content? Contact us to get started with content contributions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:your-email@example.com?subject=NotesAid Contribution Request&body=Hi, I would like to contribute to NotesAid. Please provide me with access to edit content."
                  className="inline-flex items-center justify-center px-6 py-3 bg-white text-black font-medium rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Heart className="w-5 h-5 mr-2" />
                  Request Contributor Access
                </a>
                <a
                  href="#contributors"
                  className="inline-flex items-center justify-center px-6 py-3 border border-gray-700 text-white font-medium rounded-lg hover:border-gray-600 hover:bg-gray-900/50 transition-colors"
                >
                  <Users className="w-5 h-5 mr-2" />
                  Meet Contributors
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section id="contributors" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gray-800/50 border border-gray-700 text-gray-300 text-sm mb-6">
              <Star className="w-4 h-4 mr-2" />
              Contributors
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Our Contributors
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Meet the people who make NotesAid possible through their contributions
            </p>
          </div>


          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {loadingContributors ? (
                // Loading skeleton
                Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="text-center">
                    <div className="bg-gray-800/30 border border-gray-800 rounded-xl p-6 animate-pulse">
                      <div className="w-16 h-16 bg-gray-700 rounded-full mx-auto mb-4"></div>
                      <div className="h-4 bg-gray-700 rounded mb-2"></div>
                      <div className="h-3 bg-gray-700 rounded w-3/4 mx-auto"></div>
                    </div>
                  </div>
                ))
              ) : contributors.length > 0 ? (
                contributors.map((contributor, index) => (
                  <div key={contributor.username} className="text-center group">
                    <div className="bg-gray-900/30 border border-gray-800 hover:border-gray-700 rounded-xl p-6 transition-all duration-300 hover:bg-gray-800/30">
                      <div className="relative mb-4">
                        <img
                          src={contributor.avatar_url}
                          alt={contributor.name}
                          className="w-16 h-16 rounded-full mx-auto border-2 border-gray-700 group-hover:border-gray-600 transition-colors"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = `https://github.com/${contributor.username}.png`;
                          }}
                        />
                        {index < 3 && (
                          <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center text-black text-xs font-bold">
                            {index + 1}
                          </div>
                        )}
                      </div>
                      <h3 className="text-white font-medium mb-1 text-sm">
                        {contributor.name}
                      </h3>
                      <p className="text-gray-500 text-xs mb-3">
                        @{contributor.username}
                      </p>
                      {/*<div className="flex items-center justify-center text-xs text-gray-500 mb-3">*/}
                      {/*  <Code className="w-3 h-3 mr-1" />*/}
                      {/*  {contributor.contributions}*/}
                      {/*</div>*/}
                      <a
                        href={contributor.profile_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-blue-400 hover:text-blue-300 text-xs transition-colors"
                      >
                        <Github className="w-3 h-3 mr-1" />
                        GitHub
                      </a>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <div className="text-gray-400">
                    <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No contributors found. Be the first to contribute!</p>
                  </div>
                </div>
              )}
            </div>
          </div>


          <div className="max-w-2xl mx-auto text-center mt-16">
            <div className="bg-gray-900/30 border border-gray-800 rounded-xl p-8">
              <h3 className="text-xl font-bold mb-4 text-white">
                Want to be Featured?
              </h3>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Contact us to request contributor access and start adding valuable educational content to help fellow students.
              </p>
              <a
                href="mailto:your-email@example.com?subject=NotesAid Contribution Request&body=Hi, I would like to contribute educational content to NotesAid. Please provide me with contributor access."
                className="inline-flex items-center px-6 py-3 bg-white text-black font-medium rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Heart className="w-4 h-4 mr-2" />
                Request Access
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Studies?
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Join thousands of students who are already using NotesAid to achieve
            academic excellence
          </p>
          <button
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-12 py-4 rounded-full font-medium text-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-2xl"
            onClick={() => {
              window.location.href = "/select";
            }}
          >
            Get Started for Free
          </button>
        </div>
      </section>

      <footer className="border-t border-gray-800 py-12 px-6 text-center text-gray-400 text-base">
        <div className="mb-4 italic text-lg text-gray-300 flex flex-col items-center">
          <span className="w-full flex flex-col sm:flex-row justify-center items-center gap-2">
            <span>
              &quot;Education is the most powerful weapon which you can use to change the world.&quot;
            </span>
            <span className="block mt-2 sm:mt-0 sm:ml-4 text-sm text-gray-500 whitespace-nowrap self-end">
              - Nelson Mandela
            </span>
          </span>
        </div>
        <div className="flex flex-col items-center gap-2 text-sm text-gray-400">
          <span>
            Love from{" "}
            <span className="text-purple-400 font-semibold">NotesAid</span>{" "}
            <span role="img" aria-label="love">
              ❤️
            </span>
          </span>
          <span>
            <a
              href="https://github.com/minavkaria"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-500 underline transition-colors font-semibold"
            >
              Minav Karia
            </a>
            &nbsp;&amp;&nbsp;
            <a
              href="https://github.com/yashankkothari"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-500 underline transition-colors font-semibold"
            >
              Yashank Kothari
            </a>
          </span>
        </div>
      </footer>
    </Layout>
  );
};

export default App;
