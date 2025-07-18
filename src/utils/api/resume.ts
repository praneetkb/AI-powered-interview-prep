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
  const resumeRef = doc(db, "users", userId, "resume", resumeId);
  try {
    await setDoc(resumeRef, { experience: experience }, { merge: true });
  } catch (error) {
    console.error("Error updating experience section:", error);
    throw error;
  }
}

// - Implement a function to retrieve user's complete resume

export async function getResumeDetails(userId: string): Promise<Resume> { 
    const resumeRef = collection(db, "users", userId, "resume");
    const resumeSnapshot = await getDocs(resumeRef);

    const resume: Resume = {
      id: userId,
      experience: [],
      other: "",
      projects: "",
      skills: '',
    };

    resumeSnapshot.docs.forEach((doc) => {
      resume.experience = doc.get("experience") || [];
      resume.other = doc.get("other") || "";
      resume.projects = doc.get("projects") || "";
      resume.skills = doc.get("skills") || "";
    });
  
    return resume;
  }

// - Implement a function to update specific sections of the resume
export async function updateResumeSection(
  userId: string,
  resumeId: string,
  section: "other" | "projects" | "skills",
  content: string
): Promise<void> {
  try {
    const sectionRef = doc(db, "users", userId, "resume", resumeId);
    await setDoc(sectionRef, { [section]: content }, { merge: true });
  } catch (error) {
    console.error(`Error updating ${section} section:`, error);
  }
}
