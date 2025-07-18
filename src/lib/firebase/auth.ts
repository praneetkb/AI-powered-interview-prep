/**
 * Module for handling user authentication with Firebase.
 *
 * Functions:
 * - onAuthStateChanged: Subscribe to authentication state changes.
 * - signInWithGoogle: Sign in a user using Google authentication.
 * - signOutWithGoogle: Sign out the currently authenticated user.
 */

import {
  type User,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged as _onAuthStateChanged,
} from "firebase/auth";

import { auth } from "./firebaseConfig";

// TODO:
// - Implement a function to subscribe to authentication state changes

export function onAuthStateChanged(callback: (authUser: User | null) => void) {
  return _onAuthStateChanged(auth, callback);
}

// - Implement a function to sign in a user using Google authentication
export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider(); 

  try {
    const result = await signInWithPopup(auth, provider);

    if(!result || !result.user) {
      throw new Error("Google Sign In Failed");
    }

    return result.user.uid;
  } catch (error) {
    console.error("Error signing in with Google:", error);
  }
}

// - Implement a function to sign out the currently authenticated user
export async function signOutWithGoogle() {
  try {
    await auth.signOut();
  } catch (error) {
      console.error("Error signing out with Google:", error)
    }
} 
