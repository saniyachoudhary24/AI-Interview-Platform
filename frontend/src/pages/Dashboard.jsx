
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  BrainCircuit,
  LayoutDashboard,
  FileText,
  MessageSquare,
  History,
  BarChart3,
  LogOut,
  UserCircle,
  ArrowRight,
  CheckCircle2,
  Target,
  Clock,
  UploadCloud,
} from "lucide-react";

function getHistory() {
  try {
    const records = JSON.parse(
      localStorage.getItem("interviewHistory") || "[]"
    );

    return Array.isArray(records) ? records : [];
  } catch {
    return [];
  }
}

function timeToSeconds(time) {
  const [minutes, seconds] = String(time || "00:00")
    .split(":")
    .map(Number);

  return (minutes || 0) * 60 + (seconds || 0);
}

function formatDuration(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  return `${hours}h ${minutes}m ${remainingSeconds}s`;
}

const menuItems = [
  {
    name: "Resume",
    icon: FileText,
    path: "/resume",
  },
  {
    name: "Start Interview",
    icon: MessageSquare,
    path: "/interview-setup",
  },
  {
    name: "Interview History",
    icon: History,
    path: "/history",
  },
  {
    name: "Performance",
    icon: BarChart3,
    path: "/performance",
  },
];

export default function Dashboard() {

  const [interviews] = useState(getHistory);

  const totalInterviews = interviews.length;

  const totalQuestions = interviews.reduce(
    (total, interview) =>
      total + Number(interview.answeredCount || 0),
    0
  );

  const totalSeconds = interviews.reduce(
    (total, interview) =>
      total + timeToSeconds(interview.formattedTime),
    0
  );

  const recentInterviews = interviews.slice(0, 5);

  const stats = [
    {
      title: "Completed Interviews",
      value: totalInterviews,
      icon: CheckCircle2,
    },
    {
      title: "Average AI Score",
      value: "Pending",
      icon: Target,
    },
    {
      title: "Questions Answered",
      value: totalQuestions,
      icon: MessageSquare,
    },
    {
      title: "Practice Time",
      value: formatDuration(totalSeconds),
      icon: Clock,
    },
  ];

  return (
    <div className="min-h-screen bg-beige text-coffee flex flex-col md:flex-row">

      {/* Sidebar */}

      <aside className="w-full md:w-64 bg-cream border-r border-[#E5D5C5] p-6 flex flex-col">

        <Link to="/" className="flex items-center gap-3 mb-10">

          <div className="bg-terracotta text-white p-2 rounded-xl">
            <BrainCircuit size={28} />
          </div>

          <span className="text-xl font-bold">
            Interview<span className="text-terracotta">AI</span>
          </span>

        </Link>

        <p className="text-xs tracking-widest text-warm-muted font-semibold mb-4">
          MAIN MENU
        </p>

        <nav className="space-y-3">

          <Link
            to="/dashboard"
            className="flex items-center gap-3 bg-terracotta text-white px-4 py-3 rounded-xl"
          >
            <LayoutDashboard size={20} />
            Dashboard
          </Link>

          {menuItems.map(({ name, icon: Icon, path }) => (

            <Link
              key={name}
              to={path}
              className="flex items-center gap-3 text-coffee px-4 py-3 rounded-xl hover:bg-[#F1DFD2] transition"
            >
              <Icon size={20} />
              {name}
            </Link>

          ))}

        </nav>

        <div className="mt-auto pt-12">

          <Link
            to="/"
            className="flex items-center gap-3 text-terracotta px-4 py-3 rounded-xl hover:bg-[#F1DFD2]"
          >
            <LogOut size={20} />
            Exit Demo
          </Link>

        </div>

      </aside>

      {/* Main Dashboard */}

      <main className="flex-1 min-w-0 p-6 lg:p-10">

        {/* Header */}

        <header className="flex flex-wrap items-center justify-between gap-5 mb-8">

          <div>

            <h1 className="text-3xl font-bold">
              Dashboard
            </h1>

            <p className="text-warm-muted mt-2">
              Track your interview preparation journey.
            </p>

          </div>

          <div className="flex items-center gap-3 bg-cream border border-[#E5D5C5] p-3 rounded-xl">

            <UserCircle
              size={36}
              className="text-terracotta"
            />

            <div>

              <p className="font-semibold">
                Demo User
              </p>

              <p className="text-xs text-warm-muted">
                Demo Account
              </p>

            </div>

          </div>

        </header>

        {/* Demo Notice */}

        <div className="bg-[#F1DFD2] text-terracotta-dark rounded-xl p-4 mb-6 text-sm">

          Practice statistics are calculated from completed
          interviews saved in this browser. User authentication
          and AI evaluation are pending backend integration.

        </div>

        {/* Welcome Banner */}

        <section className="bg-terracotta text-white rounded-3xl p-8 mb-8">

          <p className="text-sm text-[#F8D9C7] mb-3">
            YOUR CAREER JOURNEY
          </p>

          <h2 className="text-3xl font-bold">
            Welcome back!
          </h2>

          <p className="mt-3 text-[#FFF0E7] max-w-xl">
            Every interview is an opportunity to improve.
            Keep practicing and take the next step towards
            your dream career.
          </p>

          <Link
            to="/interview-setup"
            className="mt-6 bg-cream text-terracotta px-6 py-3 rounded-xl flex items-center gap-2 font-semibold w-fit hover:bg-[#F1DFD2] transition"
          >
            Start New Interview
            <ArrowRight size={20} />
          </Link>

        </section>

        {/* Dynamic Statistics */}

        <section className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

          {stats.map(({ title, value, icon: Icon }) => (

            <div
              key={title}
              className="bg-cream border border-[#E5D5C5] rounded-2xl p-6 shadow-sm"
            >

              <div className="bg-[#F1DFD2] text-terracotta p-3 rounded-xl w-fit mb-4">
                <Icon size={24} />
              </div>

              <p className="text-sm text-warm-muted">
                {title}
              </p>

              <h3 className="text-2xl font-bold mt-2">
                {value}
              </h3>

            </div>

          ))}

        </section>

        {/* Resume and Performance */}

        <section className="grid lg:grid-cols-2 gap-6 mb-8">

          {/* Resume Card */}

          <div className="bg-cream border border-[#E5D5C5] rounded-2xl p-7">

            <div className="flex items-center gap-3 mb-4">

              <FileText
                size={26}
                className="text-terracotta"
              />

              <h2 className="text-xl font-bold">
                Your Resume
              </h2>

            </div>

            <p className="text-warm-muted text-sm mb-5">
              Upload your resume for personalized interview
              questions after backend integration.
            </p>

            <div className="border-2 border-dashed border-[#DCCABB] rounded-xl p-6 text-center">

              <UploadCloud
                size={40}
                className="mx-auto text-terracotta mb-3"
              />

              <p className="font-medium">
                Upload Your Resume
              </p>

              <Link
                to="/resume"
                className="inline-block bg-terracotta hover:bg-terracotta-dark text-white px-5 py-2 rounded-lg mt-4 transition"
              >
                Choose File
              </Link>

            </div>

          </div>

          {/* Performance Card */}

          <div className="bg-cream border border-[#E5D5C5] rounded-2xl p-7">

            <div className="flex items-center gap-3 mb-6">

              <BarChart3
                size={26}
                className="text-terracotta"
              />

              <h2 className="text-xl font-bold">
                Performance Overview
              </h2>

            </div>

            {[
              "Technical Knowledge",
              "Communication",
              "Answer Relevance",
              "Completeness",
            ].map((label) => (

              <div key={label} className="mb-5">

                <div className="flex justify-between gap-2 text-sm mb-2">

                  <span>{label}</span>

                  <span className="text-warm-muted text-xs">
                    Pending AI Evaluation
                  </span>

                </div>

                <div className="h-2.5 bg-[#EADDD0] rounded-full" />

              </div>

            ))}

            <Link
              to="/performance"
              className="flex items-center gap-2 text-terracotta font-semibold mt-6"
            >
              View Performance Analytics
              <ArrowRight size={18} />
            </Link>

          </div>

        </section>

        {/* Recent Interviews */}

        <section className="bg-cream border border-[#E5D5C5] rounded-2xl p-7">

          <div className="flex flex-wrap justify-between items-center gap-4 mb-6">

            <h2 className="text-xl font-bold">
              Recent Interviews
            </h2>

            <Link
              to="/history"
              className="flex items-center gap-2 text-terracotta font-semibold text-sm"
            >
              View Full History
              <ArrowRight size={18} />
            </Link>

          </div>

          {recentInterviews.length > 0 ? (

            <div className="overflow-x-auto">

              <table className="w-full text-left whitespace-nowrap">

                <thead className="bg-[#F1DFD2] text-warm-muted text-sm">

                  <tr>
                    <th className="p-4">Job Role</th>
                    <th className="p-4">Date</th>
                    <th className="p-4">Difficulty</th>
                    <th className="p-4">Score</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Action</th>
                  </tr>

                </thead>

                <tbody>

                  {recentInterviews.map((interview) => (

                    <tr
                      key={interview.id}
                      className="border-b border-[#E5D5C5]"
                    >

                      <td className="p-4 font-medium">
                        {interview.role}
                      </td>

                      <td className="p-4 text-warm-muted">
                        {new Date(interview.date)
                          .toLocaleDateString("en-IN")}
                      </td>

                      <td className="p-4">
                        {interview.difficulty}
                      </td>

                      <td className="p-4 font-semibold text-terracotta">
                        Pending
                      </td>

                      <td className="p-4">

                        <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">
                          Completed
                        </span>

                      </td>

                      <td className="p-4">

                        <Link
                          to="/results"
                          state={interview}
                          className="text-terracotta font-semibold text-sm"
                        >
                          View Results
                        </Link>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          ) : (

            <div className="text-center py-12">

              <History
                size={48}
                className="mx-auto text-terracotta mb-4"
              />

              <h3 className="text-xl font-bold">
                No Interviews Yet
              </h3>

              <p className="text-warm-muted mt-3">
                Complete your first mock interview to start
                tracking your progress.
              </p>

              <Link
                to="/interview-setup"
                className="inline-block bg-terracotta text-white rounded-xl px-6 py-3 mt-6 font-semibold"
              >
                Start Your First Interview
              </Link>

            </div>

          )}

        </section>

      </main>

    </div>
  );
}
