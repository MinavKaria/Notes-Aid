"use client";
import Layout from "@/components/Layout";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useFirebaseAuth } from "@/components/FirebaseAuthProvider";
import { useRouter } from "next/navigation";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/lib/firebase";

interface AppCard {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  link?: string;
}

const AppSelection: React.FC = () => {
  const { data: session, status } = useSession();
  const { user: firebaseUser, loading: firebaseLoading } = useFirebaseAuth();
  const router = useRouter();
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const isAuthenticated = session || firebaseUser;
  const isLoading = status === "loading" || firebaseLoading;

  useEffect(() => {
  }, [isAuthenticated, isLoading, router]);

  const handleGoogleSignIn = async () => {
    setIsAuthenticating(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Authentication failed:", error);
      alert("Authentication failed. Please try again.");
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleExplore = async (appId: string) => {
    if (!isAuthenticated) {
      await handleGoogleSignIn();
      return;
    }

    const app = apps.find(a => a.id === appId);
    if (app?.link) {
      window.location.href = app.link;
    } else {
      alert("Coming Soon!");
    }
  };

  const apps: AppCard[] = [
    {
      id: "leaderboard",
      title: "Leaderboard",
      description:
        "Track and compete with peers on academic performance",
      icon: (
        <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
          <svg
            className="w-10 h-10 text-white"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          </svg>
        </div>
      ),
      link:"/leaderboard"
    },
    {
      id: "notesaid",
      title: "NotesAid",
      description: "Access comprehensive study materials and resources for all subjects",
      icon: (
        <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
          <svg
            className="w-10 h-10 text-white"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          </svg>
        </div>
      ),
      link:"/notesaid/choose"
    },
    // {
    //   id: "document-ai",
    //   title: "Document AI",
    //   description: "Upload PDFs, chat with AI, generate quizzes, and study smarter with voice assistance",
    //   icon: (
    //     <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg">
    //       <svg
    //         className="w-10 h-10 text-white"
    //         viewBox="0 0 24 24"
    //         fill="none"
    //         stroke="currentColor"
    //         strokeWidth="2"
    //       >
    //         <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    //         <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    //         <circle cx="12" cy="12" r="2" fill="currentColor" />
    //         <path d="M12 14v4" />
    //         <path d="M12 6v2" />
    //       </svg>
    //     </div>
    //   ),
    //   link:"/pdf-parse"
    // },
    {
      id: "bluebook",
      title: "BlueBook",
      description:
        "Comprehensive digital textbook and reference library",
      icon: (
        <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center">
          <svg
            className="w-10 h-10 text-white"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          </svg>
        </div>
      ),
    },
    
  ];

  return (
    <Layout>
      <div className="min-h-screen flex flex-col justify-center items-center px-4 py-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent drop-shadow-lg">
          Select an App
        </h2>
        <div className="w-full max-w-6xl flex flex-col items-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {apps.map((app) => (
              <div
                key={app.id}
                className="bg-gray-900 rounded-2xl p-6 flex flex-col items-center text-center border border-gray-800 hover:border-gray-700 transition-all duration-300 hover:scale-105 group shadow-xl hover:shadow-2xl hover:shadow-gray-800/30"
              >
        
                <div className="mb-6 group-hover:animate-pulse flex items-center justify-center w-16 h-16 bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 rounded-xl shadow-inner">
                  {app.icon}
                </div>

              
                <h3 className="text-xl font-semibold mb-3 text-white tracking-wide">
                  {app.title}
                </h3>

                
                <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow">
                  {app.description}
                </p>

            
                <button
                  onClick={() => handleExplore(app.id)}
                  disabled={isAuthenticating}
                  className="bg-white text-black px-8 py-2.5 rounded-full font-semibold hover:bg-gray-200 transition-colors duration-200 shadow-md hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isAuthenticating ? "Authenticating..." : !isAuthenticated ? "Sign in to Continue" : "Let's Go"}
                </button>
              </div>
            ))}
          </div>
        </div>


        {!isAuthenticated && !isLoading && (
          <div className="mt-8 text-center">
            <p className="text-gray-400 text-sm">
              Please sign in with Google to access the apps
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AppSelection;
