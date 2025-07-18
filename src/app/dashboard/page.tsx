"use client";

import { InterviewForm } from "@/components/forms/InterviewForm";
import { ResumeForm } from "@/components/forms/ResumeForm";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAuth } from "@/context/AuthContext";
import { Interview } from "@/models/interview";
import { getInterviews } from "@/utils/api/interviews";
import { Briefcase, Plus, Upload } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

/**
 * Dashboard component that displays user interview preparation progress and allows
 * users to manage their applications.
 *
 * @returns {JSX.Element} The rendered Dashboard component.
 */
export default function Dashboard() {
  const { user } = useAuth();
  const userId = user?.uid;

  const [isResumeDialogOpen, setIsResumeDialogOpen] = useState(false);
  const [isInterviewDialogOpen, setIsInterviewDialogOpen] = useState(false);
  const [interviewData, setInterviewData] = useState<Interview[]>([]);

  /**
   * TODO:
   * Fetch interview data when the component mounts or userId changes.
   * If userId is not available, it exits early.
   */
  useEffect(() => {
    const fetchData = async( ) => {
      if(!userId) {
        return;
      }

      try {
        const data = await getInterviews(userId);
        setInterviewData(data);

      } catch (error) {
        console.error("Error fetching interview data:", error);
        toast.error("Failed to load interview data"); 
      }
    };

    fetchData();
  }, [userId]);

  const handleResumeSubmit = () => {
    toast("Resume uploaded successfully!", {
      description: "Your resume has been processed and is ready for analysis.",
    });
    setIsResumeDialogOpen(false);
  };

  const handleInterviewSubmit = () => {
    toast("Interview session started", {
      description: "Good luck with your practice interview!",
    });
    setIsInterviewDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-6 py-8">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Dashboard
            </h1>
            <p className="text-muted-foreground">
              Track your interview preparation progress and manage your
              applications.
            </p>
          </div>
          <div className="flex gap-3 mt-4 lg:mt-0">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsResumeDialogOpen(true)}
            >
              <Upload className="mr-2 h-4 w-4" />
              Upload Resume
            </Button>
            <Button
              size="sm"
              className="shadow-medium"
              onClick={() => setIsInterviewDialogOpen(true)}
            >
              <Plus className="mr-2 h-4 w-4" />
              New Interview
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-medium">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Interviews
              </CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{interviewData.length}</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Applications */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  Your Applications
                </CardTitle>
                <CardDescription>
                  Select an application to start an interview practice
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {interviewData.map((app, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border rounded-lg bg-card/50"
                  >
                    <Link href={{ pathname: `/chat/${app.id}` }}>
                      <div className="space-y-1">
                        <p className="font-medium">{app.job_title}</p>
                        <p className="text-sm text-muted-foreground">
                          {app.company}
                        </p>
                      </div>
                    </Link>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Resume Dialog */}
      <Dialog open={isResumeDialogOpen} onOpenChange={setIsResumeDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Upload Resume Information</DialogTitle>
            <DialogDescription>
              Fill in your resume details to help generate better interview
              questions.
            </DialogDescription>
          </DialogHeader>
          <ResumeForm
            onSubmit={handleResumeSubmit}
            onCancel={() => setIsResumeDialogOpen(false)}
            userId={userId}
          />
        </DialogContent>
      </Dialog>

      {/* Interview Dialog */}
      <Dialog
        open={isInterviewDialogOpen}
        onOpenChange={setIsInterviewDialogOpen}
      >
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Create New Interview Application</DialogTitle>
            <DialogDescription>
              Add a job position and description to start generating interview
              questions.
            </DialogDescription>
          </DialogHeader>
          <InterviewForm
            onSubmit={handleInterviewSubmit}
            onCancel={() => setIsInterviewDialogOpen(false)}
            userId={userId}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
