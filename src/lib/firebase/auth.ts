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
  return
}

// - Implement a function to sign in a user using Google authentication
export async function signInWithGoogle() {
  return;
}

// - Implement a function to sign out the currently authenticated user
export async function signOutWithGoogle() {
  return;
}
