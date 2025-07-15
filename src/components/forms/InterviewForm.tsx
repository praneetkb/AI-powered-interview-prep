import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createInterview } from "@/utils/api/interviews";
import { BaseInterview } from "@/models/interview";
import { useState } from "react";
import { toast } from "sonner";

interface InterviewFormProps {
  onSubmit: () => void;
  onCancel: () => void;
  userId?: string;
}

export function InterviewForm({
  onSubmit,
  onCancel,
  userId,
}: InterviewFormProps) {
  const [jobTitle, setjobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [company, setCompany] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  // TODO: 
  // Implement a function to handle form submission: 
  // - Validate user is logged in 
  // - Create a new interview object with form submission details 
  // - Update the interviews in the database

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="jobDescription">Company</Label>
        <Input
          id="company"
          placeholder="Paste the complete job description here..."
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="jobTitle">Job Position</Label>
        <Input
          id="jobTitle"
          placeholder="e.g., Senior Frontend Developer"
          value={jobTitle}
          onChange={(e) => setjobTitle(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="jobDescription">Job Description</Label>
        <Textarea
          id="jobDescription"
          placeholder="Paste the complete job description here..."
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          className="min-h-[200px]"
          required
        />
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSaving}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isSaving}>
          {isSaving ? "Saving..." : "Create Interview"}
        </Button>
      </div>
    </form>
  );
}
