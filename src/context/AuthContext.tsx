"use client";

import { auth, provider } from "@/lib/firebase/firebaseConfig";
import {
  User,
  onAuthStateChanged,
  signOut,
  signInWithPopup,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  user: User | null;
  isLoadingUser: boolean;
  signIn: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  const signIn = async (): Promise<void> => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      console.error("Error signing in:", errorMessage);
      throw error;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await signOut(auth);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      console.error("Error signing out:", errorMessage);
      throw error; 
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      setCurrentUser(user);
      setIsLoadingUser(false);
    });

    return unsubscribe;
  }, []);

  const value: AuthContextType = {
    user: currentUser,
    isLoadingUser,
    signIn,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
