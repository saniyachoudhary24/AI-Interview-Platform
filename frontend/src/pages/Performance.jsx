
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  BrainCircuit,
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Target,
  Clock,
  MessageSquare,
  TrendingUp,
  History,
  Lock,
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

export default function Performance() {
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

  const difficultyData = [
    { name: "Easy", color: "#84A98C" },
    { name: "Medium", color: "#B45335" },
    { name: "Hard", color: "#785548" },
  ].map((item) => {
    const count = interviews.filter(
      (interview) => interview.difficulty === item.name
    ).length;

    return {
      ...item,
      count,
      percentage: totalInterviews
        ? Math.round((count / totalInterviews) * 100)
        : 0,
    };
  });

  const recentInterviews = interviews.slice(0, 5);

  return (
    <div className="min-h-screen bg-beige text-coffee">

      {/* Header */}
      <header className="bg-cream border-b border-[#E5D5C5] px-6 py-5">

        <div className="max-w-7xl mx-auto flex items-center gap-3">

          <div className="bg-terracotta text-white p-2 rounded-xl">
            <BrainCircuit size={28} />
          </div>

          <span className="text-xl font-bold">
            Interview<span className="text-terracotta">AI</span>
          </span>

        </div>

      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">

        <Link
          to="/dashboard"
          className="flex items-center gap-2 text-terracotta mb-8"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </Link>

        {/* Page Heading */}
        <div className="mb-8">

          <h1 className="text-4xl font-bold">
            Performance Analytics
          </h1>

          <p className="text-warm-muted mt-3">
            Monitor your interview preparation and track
            your progress over time.
          </p>

        </div>

        {/* Demo Notice */}
        <div className="bg-[#F1DFD2] text-terracotta-dark rounded-xl p-4 mb-8 text-sm">
          Practice statistics are calculated from your
          completed interviews stored in this browser.
          AI performance scores are pending backend integration.
        </div>

        {/* Statistics Cards */}
        <section className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

          {[
            {
              title: "Completed Interviews",
              value: totalInterviews,
              icon: History,
            },
            {
              title: "Questions Answered",
              value: totalQuestions,
              icon: MessageSquare,
            },
            {
              title: "Total Practice Time",
              value: formatDuration(totalSeconds),
              icon: Clock,
            },
            {
              title: "Average AI Score",
              value: "Pending",
              icon: Target,
            },
          ].map(({ title, value, icon: Icon }) => (

            <div
              key={title}
              className="bg-cream border border-[#E5D5C5] rounded-2xl p-6"
            >

              <div className="bg-[#F1DFD2] text-terracotta p-3 rounded-xl w-fit mb-4">
                <Icon size={26} />
              </div>

              <p className="text-sm text-warm-muted">
                {title}
              </p>

              <h2 className="text-2xl font-bold mt-3">
                {value}
              </h2>

            </div>

          ))}

        </section>

        {/* Charts */}
        <section className="grid lg:grid-cols-2 gap-7 mb-8">

          {/* Difficulty Distribution */}
          <div className="bg-cream border border-[#E5D5C5] rounded-3xl p-7">

            <h2 className="flex items-center gap-3 text-xl font-bold mb-3">

              <BarChart3
                size={26}
                className="text-terracotta"
              />

              Difficulty Distribution

            </h2>

            <p className="text-sm text-warm-muted mb-8">
              Breakdown of your completed interview sessions.
            </p>

            {difficultyData.map((item) => (

              <div key={item.name} className="mb-7">

                <div className="flex justify-between mb-3">

                  <span className="font-semibold">
                    {item.name}
                  </span>

                  <span className="text-sm text-warm-muted">
                    {item.count} interviews ({item.percentage}%)
                  </span>

                </div>

                <div className="bg-[#EADDD0] h-4 rounded-full">

                  <div
                    className="h-4 rounded-full transition-all"
                    style={{
                      width: `${item.percentage}%`,
                      backgroundColor: item.color,
                    }}
                  />

                </div>

              </div>

            ))}

          </div>

          {/* Recent Activity Chart */}
          <div className="bg-cream border border-[#E5D5C5] rounded-3xl p-7">

            <h2 className="flex items-center gap-3 text-xl font-bold mb-3">

              <TrendingUp
                size={26}
                className="text-terracotta"
              />

              Recent Practice Activity

            </h2>

            <p className="text-sm text-warm-muted mb-6">
              Questions answered in your last five interviews.
            </p>

            {recentInterviews.length > 0 ? (

              <div className="h-56 flex items-end justify-around gap-3 border-b border-[#DCCABB]">

                {[...recentInterviews].reverse().map(
                  (interview) => (

                    <div
                      key={interview.id}
                      className="flex-1 min-w-0 flex flex-col items-center justify-end h-full"
                    >

                      <span className="text-sm font-semibold text-terracotta mb-2">
                        {interview.answeredCount}
                      </span>

                      <div
                        title={interview.role}
                        className="bg-terracotta rounded-t-lg w-full max-w-14"
                        style={{
                          height: `${
                            Math.min(
                              Number(interview.answeredCount || 0),
                              15
                            ) / 15 * 75
                          }%`,
                        }}
                      />

                      <span className="text-xs text-warm-muted mt-3 mb-2">
                        {new Date(interview.date).toLocaleDateString(
                          "en-IN",
                          {
                            day: "numeric",
                            month: "short",
                          }
                        )}
                      </span>

                    </div>

                  )
                )}

              </div>

            ) : (

              <div className="text-center py-10">

                <BarChart3
                  size={45}
                  className="mx-auto text-terracotta mb-4"
                />

                <p className="text-warm-muted">
                  Complete an interview to see your activity.
                </p>

              </div>

            )}

          </div>

        </section>

        {/* Skill Analysis */}
        <section className="bg-cream border border-[#E5D5C5] rounded-3xl p-7 mb-8">

          <h2 className="flex items-center gap-3 text-xl font-bold mb-3">

            <Target
              size={26}
              className="text-terracotta"
            />

            AI Skill Analysis

          </h2>

          <p className="text-warm-muted text-sm mb-7">
            Detailed evaluation of your interview skills.
          </p>

          {[
            "Technical Knowledge",
            "Communication Skills",
            "Answer Relevance",
            "Answer Completeness",
          ].map((skill) => (

            <div key={skill} className="mb-6">

              <div className="flex justify-between items-center mb-3">

                <span className="font-medium">
                  {skill}
                </span>

                <span className="text-xs text-warm-muted flex items-center gap-2">

                  <Lock size={14} />

                  Pending AI Evaluation

                </span>

              </div>

              <div className="h-3 rounded-full bg-[#EADDD0]" />

            </div>

          ))}

          <div className="bg-[#F1DFD2] rounded-xl p-4 mt-7 text-sm text-terracotta-dark">
            Personalized skill scores will appear here
            once the AI evaluation service is connected.
          </div>

        </section>

        {/* Recent Interview Table */}
        <section className="bg-cream border border-[#E5D5C5] rounded-3xl p-7 mb-8">

          <div className="flex flex-wrap justify-between items-center gap-4 mb-6">

            <h2 className="text-xl font-bold">
              Recent Practice Sessions
            </h2>

            <Link
              to="/history"
              className="flex items-center gap-2 text-terracotta font-medium"
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
                    <th className="p-4">Difficulty</th>
                    <th className="p-4">Questions</th>
                    <th className="p-4">Time Taken</th>
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

                      <td className="p-4">
                        {interview.difficulty}
                      </td>

                      <td className="p-4">
                        {interview.answeredCount}/
                        {interview.questionCount}
                      </td>

                      <td className="p-4">
                        {interview.formattedTime}
                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          ) : (

            <p className="text-warm-muted text-center py-8">
              No completed practice sessions yet.
            </p>

          )}

        </section>

        {/* Motivation Banner */}
        <section className="bg-terracotta text-white rounded-3xl p-8">

          <h2 className="text-2xl font-bold">
            Keep Practicing, Keep Improving!
          </h2>

          <p className="text-[#FFF0E7] mt-3">
            Consistent practice helps you build confidence
            and prepare for your future interviews.
          </p>

          <Link
            to="/interview-setup"
            className="inline-flex items-center gap-3 bg-cream text-terracotta rounded-xl px-6 py-3 mt-6 font-semibold"
          >
            Start New Interview
            <ArrowRight size={20} />
          </Link>

        </section>

      </main>

    </div>
  );
}
