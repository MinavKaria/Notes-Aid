"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  BookOpen,
  Users,
  Clock,
  Shield,
  ArrowRight,
  Menu,
  X,
  Eye,
  Timer,
} from "lucide-react";
import useCountAnimation from "@/hooks/useCountAnimation";

const CountingNumber = ({
  value,
  suffix = "",
}: {
  value: number;
  suffix?: string;
}) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const [count, setIsVisible] = useCountAnimation(value);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => observer.disconnect();
  }, [setIsVisible]);

  return (
    <div ref={targetRef}>
      {count}
      {suffix}
    </div>
  );
};

const NotesAidLanding = () => {
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


      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrollY > 50 ? "bg-black/80 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full" />
                </div>
              </div>
              <span className="text-xl font-bold">NotesAid</span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#about"
                className="text-gray-300 hover:text-white transition-colors"
              >
                About
              </a>
              <a
                href="#features"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Features
              </a>
              <a
                href="#pricing"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Pricing
              </a>
              <button className="bg-white text-black px-6 py-2 rounded-full font-medium hover:bg-gray-100 transition-colors">
                Get Started
              </button>
            </div>

            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-md border-t border-gray-800">
            <div className="px-6 py-4 space-y-4">
              <a
                href="#about"
                className="block text-gray-300 hover:text-white transition-colors"
              >
                About
              </a>
              <a
                href="#features"
                className="block text-gray-300 hover:text-white transition-colors"
              >
                Features
              </a>
              <a
                href="#pricing"
                className="block text-gray-300 hover:text-white transition-colors"
              >
                Pricing
              </a>
              <button className="w-full bg-white text-black px-6 py-2 rounded-full font-medium hover:bg-gray-100 transition-colors">
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>

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
        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }

        .group:hover .group-hover\:animate-logo-pulse {
          animation: logo-pulse 2.5s ease-in-out infinite;
        }

        @keyframes logo-pulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 1;
            box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4);
          }
          25% {
            transform: scale(1.05);
            opacity: 0.9;
            box-shadow: 0 0 0 8px rgba(255, 255, 255, 0.1);
          }
          50% {
            transform: scale(1.1);
            opacity: 0.8;
            box-shadow: 0 0 0 16px rgba(255, 255, 255, 0.05);
          }
          75% {
            transform: scale(1.05);
            opacity: 0.9;
            box-shadow: 0 0 0 8px rgba(255, 255, 255, 0.1);
          }
        }

        @keyframes book-float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg) scale(1);
          }
          25% {
            transform: translateY(-8px) rotate(1deg) scale(1.02);
          }
          50% {
            transform: translateY(-12px) rotate(0deg) scale(1.05);
          }
          75% {
            transform: translateY(-6px) rotate(-1deg) scale(1.02);
          }
        }

        @keyframes book-glow {
          0%,
          100% {
            filter: drop-shadow(0 0 8px rgba(147, 51, 234, 0.3));
          }
          50% {
            filter: drop-shadow(0 0 16px rgba(147, 51, 234, 0.5))
              drop-shadow(0 0 24px rgba(59, 130, 246, 0.3));
          }
        }

        @keyframes page-flip-left {
          0%,
          100% {
            transform: perspective(100px) rotateY(0deg);
            box-shadow: -2px 0 4px rgba(0, 0, 0, 0.1);
          }
          50% {
            transform: perspective(100px) rotateY(-5deg);
            box-shadow: -3px 0 6px rgba(0, 0, 0, 0.2);
          }
        }

        @keyframes page-flip-right {
          0%,
          100% {
            transform: perspective(100px) rotateY(0deg);
            box-shadow: 2px 0 4px rgba(0, 0, 0, 0.1);
          }
          50% {
            transform: perspective(100px) rotateY(5deg);
            box-shadow: 3px 0 6px rgba(0, 0, 0, 0.2);
          }
        }

        @keyframes text-appear {
          0% {
            width: 0%;
            opacity: 0;
          }
          50% {
            opacity: 0.5;
          }
          100% {
            opacity: 1;
          }
        }

        @keyframes book-inner-glow {
          0%,
          100% {
            opacity: 0.2;
            transform: scale(1);
          }
          50% {
            opacity: 0.4;
            transform: scale(1.05);
          }
        }

        @keyframes sparkle-1 {
          0%,
          100% {
            transform: scale(0) rotate(0deg);
            opacity: 0;
          }
          50% {
            transform: scale(1) rotate(180deg);
            opacity: 1;
          }
        }

        @keyframes sparkle-2 {
          0%,
          100% {
            transform: scale(0) rotate(0deg);
            opacity: 0;
          }
          60% {
            transform: scale(1.2) rotate(270deg);
            opacity: 0.8;
          }
        }

        @keyframes sparkle-3 {
          0%,
          100% {
            transform: scale(0) rotate(0deg);
            opacity: 0;
          }
          40% {
            transform: scale(1.1) rotate(360deg);
            opacity: 0.9;
          }
        }

        @keyframes sparkle-4 {
          0%,
          100% {
            transform: scale(0) rotate(0deg);
            opacity: 0;
          }
          70% {
            transform: scale(1) rotate(180deg);
            opacity: 0.7;
          }
        }

        .animate-book-float {
          animation: book-float 4s ease-in-out infinite;
        }

        .group:hover .group-hover\:animate-book-glow {
          animation: book-glow 3s ease-in-out infinite;
        }

        .group:hover .group-hover\:animate-page-flip-left {
          animation: page-flip-left 6s ease-in-out infinite;
        }

        .group:hover .group-hover\:animate-page-flip-right {
          animation: page-flip-right 6s ease-in-out infinite 0.5s;
        }

        .animate-text-appear {
          animation: text-appear 2s ease-out forwards;
        }

        .group:hover .group-hover\:animate-book-inner-glow {
          animation: book-inner-glow 4s ease-in-out infinite;
        }

        .group:hover .group-hover\:animate-sparkle-1 {
          animation: sparkle-1 3s ease-in-out infinite;
        }

        .group:hover .group-hover\:animate-sparkle-2 {
          animation: sparkle-2 3.5s ease-in-out infinite 0.5s;
        }

        .group:hover .group-hover\:animate-sparkle-3 {
          animation: sparkle-3 2.8s ease-in-out infinite 1s;
        }

        .group:hover .group-hover\:animate-sparkle-4 {
          animation: sparkle-4 3.2s ease-in-out infinite 1.5s;
        }

        @keyframes aurora-wave-reverse {
          0%,
          100% {
            transform: translateX(0%) translateY(0%) rotate(0deg);
            opacity: 0.2;
          }
          33% {
            transform: translateX(-2%) translateY(1%) rotate(-1deg);
            opacity: 0.3;
          }
          66% {
            transform: translateX(1%) translateY(-0.5%) rotate(0.8deg);
            opacity: 0.4;
          }
        }

        @keyframes aurora-wave-slow {
          0%,
          100% {
            transform: translateX(0%) translateY(0%) rotate(0deg) scale(1);
            opacity: 0.15;
          }
          50% {
            transform: translateX(0.5%) translateY(-0.5%) rotate(0.3deg)
              scale(1.02);
            opacity: 0.25;
          }
        }

        @keyframes pulse-slow {
          0%,
          100% {
            transform: scale(1) rotate(0deg);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.1) rotate(5deg);
            opacity: 0.5;
          }
        }

        @keyframes pulse-offset {
          0%,
          100% {
            transform: scale(0.9) rotate(0deg);
            opacity: 0.25;
          }
          50% {
            transform: scale(1.15) rotate(-3deg);
            opacity: 0.45;
          }
        }

        @keyframes pulse-slow-reverse {
          0%,
          100% {
            transform: scale(1.05) rotate(0deg);
            opacity: 0.2;
          }
          50% {
            transform: scale(0.95) rotate(8deg);
            opacity: 0.4;
          }
        }

        @keyframes aurora-drift {
          0%,
          100% {
            transform: translateY(0px) translateX(0px) rotate(0deg);
            opacity: 0.3;
          }
          25% {
            transform: translateY(-20px) translateX(10px) rotate(2deg);
            opacity: 0.4;
          }
          50% {
            transform: translateY(10px) translateX(-5px) rotate(-1deg);
            opacity: 0.5;
          }
          75% {
            transform: translateY(-5px) translateX(15px) rotate(1.5deg);
            opacity: 0.35;
          }
        }

        @keyframes shimmer {
          0%,
          100% {
            transform: translateY(0px) scale(1);
            opacity: 0.4;
          }
          50% {
            transform: translateY(-30px) scale(1.2);
            opacity: 0.8;
          }
        }

        @keyframes fog-drift {
          0%,
          100% {
            transform: translateX(0%) scale(1);
            opacity: 0.1;
          }
          50% {
            transform: translateX(2%) scale(1.05);
            opacity: 0.15;
          }
        }

        @keyframes fog-drift-reverse {
          0%,
          100% {
            transform: translateX(0%) scale(1);
            opacity: 0.08;
          }
          50% {
            transform: translateX(-3%) scale(1.08);
            opacity: 0.12;
          }
        }
      `}</style>
    </div>
  );
};

export default NotesAidLanding;
