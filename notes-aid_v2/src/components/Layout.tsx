"use client"; 

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const [isMounted, setIsMounted] = useState(false);

      useEffect(() => {
        setIsMounted(true);
      }, []);
    
      if (!isMounted) {
        return
      }
  return (
    <>
    <div className="min-h-screen  text-white bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden">
      {/*<div className="fixed inset-0 overflow-hidden pointer-events-none">*/}
      {/*  {[...Array(20)].map((_, i) => (*/}
      {/*    <div*/}
      {/*      key={i}*/}
      {/*      className="absolute w-1 h-1 bg-white rounded-full opacity-60"*/}
      {/*      style={{*/}
      {/*        left: `${Math.random() * 100}%`,*/}
      {/*        top: `${Math.random() * 100}%`,*/}
      {/*        animation: `twinkle ${3 + Math.random() * 4}s infinite`,*/}
      {/*        animationDelay: `${Math.random() * 2}s`,*/}
      {/*      }}*/}
      {/*    />*/}
      {/*  ))}*/}
      {/*</div>*/}


      <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      <main className="pt-5">{children}</main>

        <footer className="border-t border-gray-800 bg-gray-900/30 backdrop-blur-sm mt-12">
            <div className="max-w-6xl mx-auto px-6 py-8">
                <div className="flex flex-col items-center gap-4 text-center">
                    <span className="text-base text-gray-300">
                        Love from{" "}
                        <span className="text-purple-400 font-semibold">NotesAid</span>{" "}
                        <span role="img" aria-label="love" className="text-red-400">
                            ❤️
                        </span>
                    </span>
                    <div className="flex flex-col sm:flex-row items-center gap-2 text-sm">
                        <span className="text-gray-400">Created by:</span>
                        <div className="flex items-center gap-3">
                            <a
                                href="https://github.com/minavkaria"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 hover:text-blue-300 underline transition-colors font-semibold hover:scale-105 transform duration-200"
                            >
                                Minav Karia
                            </a>
                            <span className="text-gray-500">&</span>
                            <a
                                href="https://github.com/yashankkothari"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 hover:text-blue-300 underline transition-colors font-semibold hover:scale-105 transform duration-200"
                            >
                                Yashank Kothari
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>

      </div>
    </>
  );
}
