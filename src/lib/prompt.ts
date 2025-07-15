import { Message } from "@/models/chat";
import { Interview } from "@/models/interview";

export function buildPrompt(
  interview_info: Interview,
  pastMessages?: Message[]
) {
  const { job_description, company, job_title } = interview_info;

  const basePrompt = `You are an expert interview software engineering preparation assistant. Your role is to help users with their software engineering interviews. 
        You have expert knowledge of software engineering concepts, algorithms, data structures, system design, and behavioral interview techniques.
        You will generate personalized interview questions based on the user's job description, company, and job title.
        The user is preparing for a software engineering interview at ${company} for the position of ${job_title}.
        The job description is as follows: ${job_description}.
        The user will send you their answer to the questions and you will provide feedback on their answers.`;

  if (pastMessages) {
    return `${basePrompt}\n You will be given past messages. Answer accordingly to the past messages. Here are the past messages: ${pastMessages.join(
      "\n"
    )}`;
  }

  return basePrompt;
}
