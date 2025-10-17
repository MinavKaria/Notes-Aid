"use client"
import React, { createContext, useContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import app from "@/lib/firebase";
import { firebaseGoogleLogin, firebaseLogout } from "@/lib/firebaseAuth";

interface AuthContextType {
  user: FirebaseUser | null;
  loading: boolean;
  firebaseGoogleLogin: () => Promise<FirebaseUser | null>;
  firebaseLogout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  firebaseGoogleLogin: async () => null,
  firebaseLogout: async () => {},
});

export function useFirebaseAuth() {
  return useContext(AuthContext);
}

export function FirebaseAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);
  return (
    <AuthContext.Provider value={{ user, loading, firebaseGoogleLogin, firebaseLogout }}>
      {children}
    </AuthContext.Provider>
  );
}
