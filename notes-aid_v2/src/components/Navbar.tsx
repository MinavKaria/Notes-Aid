"use client";
import { X, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
// import Image from "next/image";
import NotificationBell from "./NotificationBell";
import { useSession, signOut } from "next-auth/react";
import { useFirebaseAuth } from "@/components/FirebaseAuthProvider";
import { firebaseGoogleLogin, firebaseLogout } from "@/lib/firebaseAuth";

function Navbar({
  isMenuOpen,
  setIsMenuOpen,
}: {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
}) {
  const [scrollY, setScrollY] = useState(0);
  const { data: session, status } = useSession(); // NextAuth for GitHub admin
  const { user: firebaseUser, loading: firebaseLoading } = useFirebaseAuth(); // Firebase for Google users

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrollY > 50 ? "bg-black/80 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Link
                href="/"
                className="text-xl font-bold hover:text-gray-300 transition-colors"
              >
                NotesAid
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="/select"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Apps
              </Link>

              {/* Notification Bell */}
              <NotificationBell />

              {status === "loading" || firebaseLoading ? (
                <span className="text-gray-400">Loading...</span>
              ) : session ? (
                // GitHub admin user
                <div className="flex items-center space-x-4">
                  {/*{session.user?.image && (*/}
                  {/*  <img*/}
                  {/*    src={session.user.image}*/}
                  {/*    alt="avatar"*/}
                  {/*    width={32}*/}
                  {/*    height={32}*/}
                  {/*    className="w-8 h-8 rounded-full"*/}
                  {/*  />*/}
                  {/*)}*/}
                  <span className="text-gray-200">
                    {session.user?.name || session.user?.email}
                  </span>
                  {session.user?.isAdmin && (
                    <span className="px-2 py-1 bg-purple-600 text-white text-xs rounded-full">
                      Admin
                    </span>
                  )}
                  <button
                    onClick={() => signOut()}
                    className="border border-black bg-white text-black rounded px-4 py-2 font-medium transition-colors duration-200 hover:bg-black hover:text-white"
                    style={{ boxShadow: "none" }}
                  >
                    Logout
                  </button>
                </div>
              ) : firebaseUser ? (

                <div className="flex items-center space-x-4">
                  {/*{firebaseUser.photoURL && (*/}
                  {/*  <img*/}
                  {/*    src={firebaseUser.photoURL}*/}
                  {/*    alt="avatar"*/}
                  {/*    width={32}*/}
                  {/*    height={32}*/}
                  {/*    className="w-8 h-8 rounded-full"*/}
                  {/*  />*/}
                  {/*)}*/}
                  <span className="text-gray-200">
                    {firebaseUser.displayName || firebaseUser.email}
                  </span>
                  <button
                    onClick={firebaseLogout}
                    className="border border-black bg-white text-black rounded px-4 py-2 font-medium transition-colors duration-200 hover:bg-black hover:text-white"
                    style={{ boxShadow: "none" }}
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={firebaseGoogleLogin}
                    className="border border-black bg-white text-black rounded px-4 py-2 font-medium transition-colors duration-200 hover:bg-black hover:text-white"
                    style={{ boxShadow: "none" }}
                  >
                    Login
                  </button>

                </div>
              )}
            </div>

            <div className="flex items-center space-x-4 md:hidden">
              <NotificationBell />
              <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-md border-t border-gray-800">
            <div className="px-6 py-4 space-y-4">
              <Link
                href="/select"
                className="block text-gray-300 hover:text-white transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Apps
              </Link>


              <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <span>
                    {session?.user?.name || "Guest"}
                  </span>
                </div>
                <button
                  onClick={() => signOut()}
                  className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors"
                >
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

export default Navbar;
