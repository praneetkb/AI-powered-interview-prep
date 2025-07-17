/**
 * Module for interacting with user resume data in Firestore.
 *
 * Functions:
 * - updateResumeExperience: Update user's resume experience.
 * - getResumeDetails: Retrieve user's complete resume.
 * - updateResumeSection: Update specific sections of the resume.
 */

import { collection, doc, getDocs, setDoc } from "firebase/firestore";

import { db } from "@/lib/firebase/firebaseConfig";
import { Resume, ResumeExperience } from "@/models/resume";

// TODO:
// - Implement a function to update user's resume experience
export async function updateResumeExperience(
  userId: string,
  resumeId: string,
  experience: ResumeExperience[]
): Promise<void> {
  return;
}

// - Implement a function to retrieve user's complete resume

export async function getResumeDetails(userId: string): Promise<Resume> { 
    return 
}

// - Implement a function to update specific sections of the resume
export async function updateResumeSection(
  userId: string,
  resumeId: string,
  section: "other" | "projects" | "skills",
  content: string
): Promise<void> {
    return 
}
