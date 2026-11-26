
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  BrainCircuit,
  ArrowLeft,
  History as HistoryIcon,
  Search,
  CalendarDays,
  CheckCircle2,
  MessageSquare,
  Clock,
  ArrowRight,
  Target,
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

export default function History() {
  const [interviews] = useState(getHistory);
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("All");

  const filteredInterviews = interviews.filter(
    (interview) =>
      interview.role
        .toLowerCase()
        .includes(search.trim().toLowerCase()) &&
      (difficulty === "All" ||
        interview.difficulty === difficulty)
  );

  const totalQuestions = interviews.reduce(
    (total, interview) =>
      total + interview.answeredCount,
    0
  );

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
        <div className="flex flex-wrap justify-between items-center gap-5 mb-8">

          <div>
            <h1 className="text-4xl font-bold">
              Interview History
            </h1>

            <p className="text-warm-muted mt-3">
              Review your previous interviews and track
              your preparation journey.
            </p>
          </div>

          <Link
            to="/interview-setup"
            className="flex items-center gap-2 bg-terracotta hover:bg-terracotta-dark text-white px-6 py-3 rounded-xl font-semibold transition"
          >
            New Interview
            <ArrowRight size={18} />
          </Link>

        </div>

        {/* Demo Notice */}
        <div className="bg-[#F1DFD2] text-terracotta-dark rounded-xl p-4 mb-7 text-sm">
          Demo mode — completed practice sessions are saved
          in this browser. AI evaluation scores are not yet
          available.
        </div>

        {/* Statistics */}
        <section className="grid sm:grid-cols-3 gap-5 mb-8">

          {[
            {
              title: "Total Interviews",
              value: interviews.length,
              icon: HistoryIcon,
            },
            {
              title: "Questions Answered",
              value: totalQuestions,
              icon: MessageSquare,
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
                <Icon size={25} />
              </div>

              <p className="text-warm-muted text-sm">
                {title}
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {value}
              </h2>

            </div>

          ))}

        </section>

        {/* History Section */}
        <section className="bg-cream border border-[#E5D5C5] rounded-3xl p-6 md:p-8">

          <h2 className="text-2xl font-bold mb-6">
            Previous Interviews
          </h2>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-7">

            <div className="relative flex-1">

              <Search
                size={20}
                className="absolute left-4 top-3.5 text-warm-muted"
              />

              <input
                type="text"
                aria-label="Search by job role"
                placeholder="Search by job role..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white border border-[#DCCABB] rounded-xl py-3 pl-12 pr-4 outline-none focus:border-terracotta"
              />

            </div>

            <select
              aria-label="Filter by difficulty"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="bg-white border border-[#DCCABB] rounded-xl px-5 py-3 outline-none focus:border-terracotta"
            >
              <option value="All">All Difficulties</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>

          </div>

          {/* Interview Records */}
          {filteredInterviews.length > 0 ? (

            <div className="space-y-4">

              {filteredInterviews.map((interview) => (

                <article
                  key={interview.id}
                  className="bg-[#FCF6EF] border border-[#E5D5C5] rounded-2xl p-6"
                >

                  <div className="flex flex-wrap justify-between items-start gap-4">

                    <div>
                      <h3 className="text-xl font-bold">
                        {interview.role}
                      </h3>

                      <p className="flex items-center gap-2 text-sm text-warm-muted mt-2">
                        <CalendarDays size={16} />
                        {new Date(
                          interview.date
                        ).toLocaleDateString("en-IN")}
                      </p>
                    </div>

                    <span className="flex items-center gap-1 bg-green-100 text-green-700 rounded-full px-3 py-1 text-xs font-medium">
                      <CheckCircle2 size={15} />
                      Completed
                    </span>

                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-6">

                    <div>
                      <p className="text-xs text-warm-muted">
                        Difficulty
                      </p>
                      <p className="font-semibold mt-1">
                        {interview.difficulty}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-warm-muted">
                        Questions Answered
                      </p>
                      <p className="font-semibold mt-1">
                        {interview.answeredCount}/
                        {interview.questionCount}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-warm-muted">
                        Time Taken
                      </p>
                      <p className="flex items-center gap-1 font-semibold mt-1">
                        <Clock size={16} />
                        {interview.formattedTime}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-warm-muted">
                        AI Score
                      </p>
                      <p className="font-semibold text-terracotta mt-1">
                        Pending
                      </p>
                    </div>

                  </div>

                  <div className="flex justify-end mt-5">

                    <Link
                      to="/results"
                      state={interview}
                      className="flex items-center gap-2 border border-terracotta text-terracotta hover:bg-[#F1DFD2] px-5 py-2.5 rounded-xl font-medium transition"
                    >
                      View Results
                      <ArrowRight size={17} />
                    </Link>

                  </div>

                </article>

              ))}

            </div>

          ) : (

            <div className="text-center py-16">

              <HistoryIcon
                size={55}
                className="mx-auto text-terracotta mb-5"
              />

              <h3 className="text-xl font-bold">
                {interviews.length === 0
                  ? "No Interviews Yet"
                  : "No Matching Interviews"}
              </h3>

              <p className="text-warm-muted mt-3">
                {interviews.length === 0
                  ? "Complete your first mock interview to see your history here."
                  : "Try changing your search or difficulty filter."}
              </p>

              {interviews.length === 0 && (
                <Link
                  to="/interview-setup"
                  className="inline-block bg-terracotta text-white rounded-xl px-6 py-3 mt-6 font-semibold"
                >
                  Start Your First Interview
                </Link>
              )}

            </div>

          )}

        </section>

      </main>

    </div>
  );
}
