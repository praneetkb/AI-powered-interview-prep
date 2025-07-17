/**
 * Module for handling user interviews with Firebase.
 *
 * Functions:
 * - createInterview: Create a new interview for a user.
 * - getInterviews: Retrieve all interviews for a user.
 * - getInterviewById: Retrieve a specific interview by its ID.
 */

import { addDoc, collection, doc, getDoc, getDocs } from "firebase/firestore";

import { BaseInterview, Interview } from "@/models/interview";
import { db } from "@/lib/firebase/firebaseConfig";

// TODO:
// - Implement a function to create a new interview for a user
export async function createInterview(
  userId: string,
  interview_info: BaseInterview
) {
  return;
}

// - Implement a function to retrieve all interviews for a user
export async function getInterviews(userId: string): Promise<Interview[]> {
  return;
}

// - Implement a function to retrieve a specific interview by its ID
export async function getInterviewById(userId: string, interviewId: string) {
  return;
}
