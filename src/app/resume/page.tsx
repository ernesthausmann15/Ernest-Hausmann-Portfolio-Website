import type { Metadata } from "next";
import { ResumeView } from "@/components/resume/resume-view";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Resume of Ernest Hausmann, a junior software engineer moving from leadership and infrastructure work into frontend development.",
};

export default function ResumePage() {
  return <ResumeView />;
}
