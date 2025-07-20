"use client";
import { useState, useEffect } from "react";
import Leaderboard from "@/components/Leaderboard";
import { GoogleLogin, GoogleOAuthProvider, CredentialResponse, googleLogout } from '@react-oauth/google';
import { parseCookies, setCookie, destroyCookie } from "nookies";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  email?: string;
  [key: string]: any;
}

export default function LeaderboardPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState("");
  const handleLogout = () => {
    googleLogout();
    destroyCookie(null, "googleToken");
    setIsLoggedIn(false);
    setError("");
  };

  useEffect(() => {
    const cookies = parseCookies();
    const token = cookies.googleToken;

    if (token) {
      try {
        const decoded = jwtDecode<DecodedToken>(token);
        if (decoded.email?.endsWith("@somaiya.edu")) {
          setIsLoggedIn(true);
        } else {
          destroyCookie(null, "googleToken");
        }
      } catch {
        destroyCookie(null, "googleToken");
      }
    }
  }, []);

  const handleLoginSuccess = (credentialResponse: CredentialResponse) => {
    const token = credentialResponse.credential;
    if (!token) {
      setError("No token received from Google.");
      return;
    }

    try {
      const decoded = jwtDecode<DecodedToken>(token);
      const email = decoded.email || "";

      if (email.endsWith("@somaiya.edu")) {
        setCookie(null, "googleToken", token, {
          maxAge: 7 * 24 * 60 * 60,
          path: "/",
        });
        setIsLoggedIn(true);
        setError("");
      } else {
        setError("Please sign in with your Somaiya email.");
      }
    } catch {
      setError("Invalid token. Try again.");
    }
  };

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""}>
      {!isLoggedIn ? (
        <div className="min-h-screen flex items-center justify-center">
          <div className="p-8 rounded-lg text-center">
            <h1 className="text-base-content dark:text-neutral-content font-semibold mb-4">
              Sign in with Somaiya Email to view Leaderboard
            </h1>
            <GoogleLogin
              onSuccess={handleLoginSuccess}
              onError={() => setError("Google Login failed")}
              shape="rectangular"
              text="continue_with"
              theme="outline"
              logo_alignment="center"
              hosted_domain="somaiya.edu"
            />
            {error && <p className="mt-4 text-red-600 font-medium">{error}</p>}
          </div>
        </div>
      ) : (
        <div className="w-full relative">
          <button
            onClick={handleLogout}
            className="sm:absolute relative w-full sm:w-fit right-0 top-4 sm:right-4 h-12 btn btn-neutral dark:btn-primary transition-all duration-200 flex items-center justify-center gap-2"
          >
            Logout
          </button>
          <Leaderboard />
        </div>
      )}
    </GoogleOAuthProvider>
  );
}
