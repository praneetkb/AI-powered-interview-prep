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
// - Implement a function to retrieve user's complete resume
// - Implement a function to update specific sections of the resume
