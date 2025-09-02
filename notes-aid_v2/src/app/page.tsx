"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  BookOpen,
  Users,
  Clock,
  Shield,
  ArrowRight,
  Eye,
  Timer,
} from "lucide-react";

import CountingNumber from "@/components/CountingNumber";
import Navbar from "@/components/Navbar";



const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY] = useState(0);

    // useEffect(() => {
    //   const handleScroll = () => setScrollY(window.scrollY);
    //   window.addEventListener('scroll', handleScroll);
    //   return () => window.removeEventListener('scroll', handleScroll);
    // }, []);

  const features = [
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Comprehensive Notes",
      description:
        "Access detailed notes for all subjects across different courses and semesters, organized and ready to use.",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Community Driven",
      description:
        "Built by students, for students. Share knowledge and contribute to a growing educational community.",
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Always Available",
      description:
        "24/7 access to your study materials. Study anywhere, anytime, on any device with internet connection.",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Quality Assured",
      description:
        "All notes are reviewed and verified by academic experts to ensure accuracy and completeness.",
    },
  ];

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; 
  }



  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `twinkle ${3 + Math.random() * 4}s infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>


      <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

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

        
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="group bg-white text-black px-8 py-4 rounded-full font-medium text-lg hover:bg-gray-100 transition-all duration-300 flex items-center space-x-2 shadow-2xl hover:shadow-white/20">
              <span>Start Learning Now</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="border border-white/30 text-white px-8 py-4 rounded-full font-medium text-lg hover:bg-white/10 transition-colors backdrop-blur-sm">
              Watch Demo
            </button>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      <section id="features" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              Why Choose NotesAid?
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Discover the features that make NotesAid the ultimate study
              companion for students worldwide
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-8 rounded-2xl bg-gradient-to-br from-gray-900/50 to-gray-800/50 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105 backdrop-blur-sm"
              >
                <div className="text-purple-400 mb-4 group-hover:text-purple-300 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-purple-100 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/30 to-gray-900/50" />
        <div className="absolute inset-0">
          <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_50%_50%,_rgba(17,24,39,0)_0%,_rgba(88,28,135,0.15)_50%,_rgba(0,0,0,0)_100%)]" />
          <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_80%_20%,_rgba(120,50,255,0.1)_0%,_rgba(0,0,0,0)_100%)]" />
        </div>

        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 border border-purple-500/20 text-purple-400 text-sm mb-6 backdrop-blur-sm">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse mr-2"></div>
              Our Growth
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
              Growing Together
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Join thousands of students who have transformed their academic
              journey with NotesAid
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto mb-12 px-4 sm:px-6">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl opacity-20 group-hover:opacity-40 blur transition duration-500"></div>
              <div className="relative bg-black/40 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-white/10 transform hover:scale-[1.02] transition-all duration-300">
                <div className="flex items-center justify-center mb-4">
                  <div className="p-2 sm:p-3 bg-blue-500/10 rounded-xl group-hover:bg-blue-500/20 transition-colors duration-300">
                    <Eye className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" />
                  </div>
                </div>
                <div className="text-center">
                  <span className="block text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                    <CountingNumber value={20000} suffix="+" />
                  </span>
                  <p className="text-gray-300 font-medium text-base sm:text-lg">
                    Total Views
                  </p>
                  <p className="text-gray-500 text-xs sm:text-sm mt-1">
                    All time
                  </p>
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl opacity-20 group-hover:opacity-40 blur transition duration-500"></div>
              <div className="relative bg-black/40 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-white/10 transform hover:scale-[1.02] transition-all duration-300">
                <div className="flex items-center justify-center mb-4">
                  <div className="p-2 sm:p-3 bg-purple-500/10 rounded-xl group-hover:bg-purple-500/20 transition-colors duration-300">
                    <Timer className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400" />
                  </div>
                </div>
                <div className="text-center">
                  <span className="block text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                    <CountingNumber value={1500} suffix="+" />
                  </span>
                  <p className="text-gray-300 font-medium text-base sm:text-lg">
                    Active Hours
                  </p>
                  <p className="text-gray-500 text-xs sm:text-sm mt-1">
                    Learning content
                  </p>
                </div>
              </div>
            </div>

            <div className="relative group sm:col-span-2 lg:col-span-1">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl opacity-20 group-hover:opacity-40 blur transition duration-500"></div>
              <div className="relative bg-black/40 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-white/10 transform hover:scale-[1.02] transition-all duration-300">
                <div className="flex items-center justify-center mb-4">
                  <div className="p-2 sm:p-3 bg-pink-500/10 rounded-xl group-hover:bg-pink-500/20 transition-colors duration-300">
                    <Users className="w-6 h-6 sm:w-8 sm:h-8 text-pink-400" />
                  </div>
                </div>
                <div className="text-center">
                  <span className="block text-4xl sm:text-5xl font-bold bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent mb-2">
                    <CountingNumber value={1500} suffix="+" />
                  </span>
                  <p className="text-gray-300 font-medium text-base sm:text-lg">
                    Active Users
                  </p>
                  <p className="text-gray-500 text-xs sm:text-sm mt-1">
                    Monthly learners
                  </p>
                </div>
              </div>
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
          <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-12 py-4 rounded-full font-medium text-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-2xl">
            Get Started for Free
          </button>
        </div>
      </section>

      <footer className="border-t border-gray-800 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full" />
                  </div>
                </div>
                <span className="text-xl font-bold">NotesAid</span>
              </div>
              <p className="text-gray-400">
                Empowering students worldwide with comprehensive study materials
                and resources.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                {/* <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Pricing
                  </a>
                </li> */}
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    API
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Documentation
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Project</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contributors
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Community
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 NotesAid. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
       
      `}</style>
    </div>
  );
};

export default App;
