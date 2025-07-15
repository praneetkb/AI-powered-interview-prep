"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { buildPrompt } from "@/lib/prompt";
import { Message } from "@/models/chat";
import { Interview } from "@/models/interview";
import { genaiService } from "@/utils/api/genai";
import { getInterviewById } from "@/utils/api/interviews";
import { Bot, Loader2, MessageSquare, Send, User } from "lucide-react";
import { use, useEffect, useState } from "react";
import { toast } from "sonner";

export default function Chat({
  params,
}: {
  params: Promise<{ interviewId: string }>;
}) {
  const { user } = useAuth();
  const userId = user?.uid;
  const { interviewId } = use(params);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hi! I'm your AI interview preparation assistant. I can help you generate personalized interview questions based on your resume and job descriptions. How would you like to start?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);

  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [interviewData, setInterviewData] = useState<Interview>();

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) {
        return;
      }

      try {
        const data = await getInterviewById(userId, interviewId);
        setInterviewData(data);
      } catch (error) {
        console.error("Error fetching interview data:", error);
        toast.error("Failed to load interview data.");
      }
    };

    fetchData();
  }, [interviewId, userId]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue("");
    setIsLoading(true);

    try {
      if (!interviewData) {
        throw new Error("Interview data not found");
      }

      // Append past messages as history to the prompt
      const systemPrompt = buildPrompt(interviewData, messages);

      const aiResponseText = await genaiService.sendMessageWithPrompt(
        currentInput,
        systemPrompt
      );

      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponseText,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiResponse]);
    } catch (error) {
      console.error("Error getting AI response:", error);

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content:
          "Sorry, I'm having trouble processing your request right now. Please try again.",
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-6 py-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 h-[calc(100vh-12rem)]">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="border-0 shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="h-5 w-5 text-primary" />
                  AI Assistant
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <div
                    className={`h-2 w-2 rounded-full ${
                      isLoading ? "bg-yellow-500" : "bg-green-500"
                    }`}
                  ></div>
                  <span className="text-sm text-muted-foreground">
                    {isLoading ? "Thinking..." : "Online"}
                  </span>
                </div>
                <p className="text-sm">
                  I can help you prepare for interviews by generating
                  personalized questions.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-3 flex flex-col">
            <Card className="border-0 shadow-medium flex-1 flex flex-col">
              <CardHeader className="border-b">
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Interview Prep Chat
                </CardTitle>
              </CardHeader>

              {/* Scrollable Messages Container */}
              <CardContent className="flex-1">
                <div className="h-96 overflow-y-auto p-6 space-y-6">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-3 ${
                        message.isUser ? "justify-end" : "justify-start"
                      }`}
                    >
                      {!message.isUser && (
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <Bot className="h-4 w-4 text-primary" />
                        </div>
                      )}

                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                          message.isUser
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        }`}
                      >
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">
                          {message.content}
                        </p>
                        <p
                          className={`text-xs mt-2 ${
                            message.isUser
                              ? "text-primary-foreground/70"
                              : "text-muted-foreground"
                          }`}
                        >
                          {message.timestamp
                            .getHours()
                            .toString()
                            .padStart(2, "0")}
                          :
                          {message.timestamp
                            .getMinutes()
                            .toString()
                            .padStart(2, "0")}
                        </p>
                      </div>

                      {message.isUser && (
                        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                          <User className="h-4 w-4 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Loading indicator */}
                  {isLoading && (
                    <div className="flex gap-3 justify-start">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <Bot className="h-4 w-4 text-primary" />
                      </div>
                      <div className="bg-muted rounded-2xl px-4 py-3">
                        <div className="flex items-center gap-2">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span className="text-sm text-muted-foreground">
                            Thinking...
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>

              {/* Input Section */}
              <div className="p-6 border-t">
                <div className="flex gap-3">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ask for interview questions, preparation tips, or specific guidance..."
                    onKeyDown={handleKeyPress}
                    className="flex-1"
                    disabled={isLoading}
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isLoading}
                    className="shadow-medium"
                  >
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Press Enter to send • AI responses are generated based on your
                  resume and job preferences
                </p>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
