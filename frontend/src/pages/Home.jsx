import { Link } from "react-router-dom";

import {
  BrainCircuit,
  ArrowRight,
  FileText,
  BarChart3,
  MessageSquare,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "Resume-Based Interviews",
    description:
      "Practice personalized questions based on your resume, skills, projects and target job role.",
  },
  {
    icon: MessageSquare,
    title: "AI Mock Interviews",
    description:
      "Prepare for real interviews through interactive AI-powered practice sessions.",
  },
  {
    icon: BarChart3,
    title: "Performance Analytics",
    description:
      "Understand your strengths, identify weaknesses and track your improvement.",
  },
];

const steps = [
  {
    number: "01",
    title: "Upload Your Resume",
    description: "Provide your resume and target job role.",
  },
  {
    number: "02",
    title: "Start Your Interview",
    description: "Practice personalized interview questions.",
  },
  {
    number: "03",
    title: "Review Your Feedback",
    description: "Understand your performance and improve.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F8F1E7] text-[#412D25]">

      {/* Navigation Bar */}
      <nav className="bg-[#FFFAF5] border-b border-[#E5D5C5]">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-wrap items-center justify-between gap-4">

          <a href="#home" className="flex items-center gap-3">
            <div className="bg-[#B45335] text-white p-2 rounded-xl">
              <BrainCircuit size={28} />
            </div>

            <span className="text-xl font-bold">
              Interview<span className="text-[#B45335]">AI</span>
            </span>
          </a>

          <div className="hidden md:flex gap-8 text-[#78665D] font-medium">
            <a href="#home" className="hover:text-[#B45335]">
              Home
            </a>

            <a href="#features" className="hover:text-[#B45335]">
              Features
            </a>

            <a href="#how-it-works" className="hover:text-[#B45335]">
              How It Works
            </a>
          </div>

         <div className="flex gap-3">
           <Link
             to="/login"
             className="px-5 py-2 border border-terracotta text-terracotta rounded-lg font-medium hover:bg-[#F1DFD2] transition"
           >
             Login
           </Link>

           <Link
             to="/register"
             className="bg-terracotta hover:bg-terracotta-dark text-white px-5 py-2 rounded-lg font-medium transition"
           >
             Sign Up
           </Link>
        </div>

        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="max-w-7xl mx-auto px-6 py-16 lg:py-24 grid lg:grid-cols-2 gap-14 items-center"
      >

        <div>

          <div className="inline-flex items-center gap-2 bg-[#F1DFD2] border border-[#DFBBA7] text-[#93432B] px-4 py-2 rounded-full mb-6 text-sm font-medium">
            <Sparkles size={16} />
            AI-Powered Interview Preparation
          </div>

          <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold leading-tight">
            Practice Smarter.
            <br />
            Interview
            <span className="block text-[#B45335]">
              With Confidence.
            </span>
          </h1>

          <p className="text-[#78665D] text-lg mt-6 leading-relaxed max-w-xl">
            Prepare for your dream job with personalized mock
            interviews, resume-based questions and AI-powered
            performance feedback.
          </p>

          <div className="flex flex-wrap gap-4 mt-8">

            <Link
              to="/register"
              className="flex items-center gap-3 bg-terracotta hover:bg-terracotta-dark text-white px-7 py-4 rounded-xl font-semibold transition"
            >
              Get Started
              <ArrowRight size={20} />
            </Link>

            <a
              href="#features"
              className="border border-[#B45335] text-[#93432B] hover:bg-[#F1DFD2] px-7 py-4 rounded-xl font-medium transition"
            >
              Explore Features
            </a>

          </div>

          <div className="flex flex-wrap gap-5 mt-8 text-sm text-[#78665D]">

            <span className="flex items-center gap-2">
              <CheckCircle2
                size={18}
                className="text-[#B45335]"
              />
              Personalized Practice
            </span>

            <span className="flex items-center gap-2">
              <CheckCircle2
                size={18}
                className="text-[#B45335]"
              />
              Skill Improvement
            </span>

          </div>

        </div>

        {/* Interview Preview Card */}
        <div className="bg-[#FFFAF5] border border-[#E5D5C5] rounded-3xl p-6 md:p-8 shadow-xl shadow-[#B45335]/10">

          <div className="flex items-center gap-4 mb-8">

            <div className="bg-[#F1DFD2] text-[#B45335] p-4 rounded-2xl">
              <BrainCircuit size={36} />
            </div>

            <div>
              <h3 className="text-xl font-semibold">
                AI Interviewer
              </h3>

              <p className="text-[#78665D] text-sm">
                Sample Interview Preview
              </p>
            </div>

          </div>

          {/* Progress Bar */}
          <div className="flex justify-between text-sm text-[#78665D] mb-3">
            <span>Question 1 of 5</span>
            <span className="text-[#B45335] font-semibold">
              20%
            </span>
          </div>

          <div className="bg-[#EADDD0] h-2 rounded-full mb-7">
            <div className="bg-[#B45335] h-2 w-1/5 rounded-full" />
          </div>

          {/* Sample Question */}
          <div className="bg-[#F5E8DC] border border-[#E5D5C5] rounded-xl p-5">

            <p className="text-sm text-[#93432B] font-semibold mb-3">
              Technical Question
            </p>

            <p className="leading-relaxed text-[#412D25]">
              Can you explain one of the projects mentioned
              in your resume and describe your contribution?
            </p>

          </div>

          {/* Answer Preview */}
          <div className="bg-[#FFFCF8] border border-[#DCCABB] rounded-xl p-5 mt-5 text-[#78665D] min-h-24">
            Type your answer here...
          </div>

          <button
            disabled
            className="bg-[#B45335] text-white opacity-75 rounded-xl w-full py-3 mt-5 font-medium cursor-not-allowed"
          >
            Submit Answer
          </button>

          <p className="text-xs text-[#78665D] text-center mt-4">
            Demonstration only — live AI integration pending.
          </p>

        </div>

      </section>

      {/* Features Section */}
      <section
        id="features"
        className="max-w-7xl mx-auto px-6 py-20"
      >

        <div className="text-center mb-12">

          <p className="text-[#B45335] font-semibold tracking-widest text-sm mb-3">
            PLATFORM FEATURES
          </p>

          <h2 className="text-3xl md:text-4xl font-bold">
            Everything You Need to Prepare
          </h2>

          <p className="text-[#78665D] mt-4">
            A smarter approach to interview preparation.
          </p>

        </div>

        <div className="grid md:grid-cols-3 gap-6">

          {features.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="bg-[#FFFAF5] border border-[#E5D5C5] hover:border-[#B45335] hover:-translate-y-1 rounded-2xl p-7 shadow-sm hover:shadow-lg transition"
            >

              <div className="bg-[#F1DFD2] text-[#B45335] p-4 rounded-xl w-fit mb-5">
                <Icon size={28} />
              </div>

              <h3 className="text-xl font-semibold mb-3">
                {title}
              </h3>

              <p className="text-[#78665D] leading-relaxed">
                {description}
              </p>

            </div>
          ))}

        </div>

      </section>

      {/* How It Works Section */}
      <section
        id="how-it-works"
        className="bg-[#F0E2D3] border-y border-[#E5D5C5] py-20"
      >

        <div className="max-w-7xl mx-auto px-6">

          <p className="text-[#B45335] font-semibold tracking-widest text-sm text-center mb-3">
            THREE SIMPLE STEPS
          </p>

          <h2 className="text-3xl md:text-4xl font-bold text-center mb-14">
            How It Works
          </h2>

          <div className="grid md:grid-cols-3 gap-10">

            {steps.map((step) => (
              <div key={step.number} className="text-center">

                <div className="mx-auto bg-[#B45335] text-white w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold mb-5">
                  {step.number}
                </div>

                <h3 className="text-xl font-semibold">
                  {step.title}
                </h3>

                <p className="text-[#78665D] mt-3">
                  {step.description}
                </p>

              </div>
            ))}

          </div>

        </div>

      </section>

      {/* Footer */}
      <footer className="bg-[#412D25] text-[#F8F1E7] py-10 px-6 text-center">

        <div className="flex justify-center items-center gap-2 mb-4">
          <BrainCircuit size={25} className="text-[#E7AF91]" />

          <span className="text-xl font-bold">
            Interview<span className="text-[#E7AF91]">AI</span>
          </span>
        </div>

        <p className="text-sm text-[#E5D5C5]">
          AI-Powered Interview Preparation Platform
        </p>

        <p className="mt-3 text-sm text-[#D9C4B4]">
          Computer Science & Engineering Student Project
        </p>

      </footer>

    </div>
  );
}
