
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  BrainCircuit,
  ArrowLeft,
  ArrowRight,
  Briefcase,
  SlidersHorizontal,
  MessageSquare,
  CheckCircle2,
  Clock,
} from "lucide-react";

export default function InterviewSetup() {
const navigate = useNavigate();
  const [role, setRole] = useState("Software Developer");
  const [difficulty, setDifficulty] = useState("Medium");
  const [questionCount, setQuestionCount] = useState(5);
  const [message, setMessage] = useState("");

  function handleSubmit(e) {
  e.preventDefault();

  if (!role.trim()) return;

  navigate("/interview", {
    state: {
      role: role.trim(),
      difficulty,
      questionCount,
    },
  });
}

  return (
    <div className="min-h-screen bg-beige text-coffee">

      {/* Header */}
      <header className="bg-cream border-b border-[#E5D5C5] px-6 py-5">
        <div className="max-w-6xl mx-auto flex items-center gap-3">

          <div className="bg-terracotta text-white p-2 rounded-xl">
            <BrainCircuit size={28} />
          </div>

          <span className="text-xl font-bold">
            Interview<span className="text-terracotta">AI</span>
          </span>

        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">

        <Link
          to="/dashboard"
          className="flex items-center gap-2 text-terracotta mb-8"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </Link>

        <h1 className="text-4xl font-bold">
          Configure Your Interview
        </h1>

        <p className="text-warm-muted mt-3 mb-8">
          Customize your mock interview according to your
          career goals and preparation level.
        </p>

        <div className="grid lg:grid-cols-3 gap-7">

          {/* Interview Configuration */}
          <form
            onSubmit={handleSubmit}
            className="lg:col-span-2 bg-cream border border-[#E5D5C5] rounded-3xl p-7 md:p-9 space-y-8"
          >

            {/* Job Role */}
            <div>

              <label
                htmlFor="role"
                className="flex items-center gap-3 font-bold text-xl mb-4"
              >
                <Briefcase className="text-terracotta" />
                Target Job Role
              </label>

              <input
                id="role"
                type="text"
                value={role}
                onChange={(e) => {
                  setRole(e.target.value);
                  setMessage("");
                }}
                placeholder="Enter your preferred job role"
                required
                className="w-full bg-white border border-[#DCCABB] rounded-xl px-4 py-4 outline-none focus:border-terracotta"
              />

              <p className="text-sm text-warm-muted mt-2">
                Example: Software Developer, Data Analyst,
                Frontend Developer
              </p>

            </div>

            {/* Difficulty */}
            <div>

              <h2 className="flex items-center gap-3 font-bold text-xl mb-4">
                <SlidersHorizontal className="text-terracotta" />
                Difficulty Level
              </h2>

              <div className="grid sm:grid-cols-3 gap-3">

                {[
                  ["Easy", "Basic concepts"],
                  ["Medium", "Intermediate questions"],
                  ["Hard", "Advanced concepts"],
                ].map(([level, description]) => (

                  <button
                    key={level}
                    type="button"
                    aria-pressed={difficulty === level}
                    onClick={() => {
                      setDifficulty(level);
                      setMessage("");
                    }}
                    className={`border rounded-xl p-5 text-left transition cursor-pointer ${
                      difficulty === level
                        ? "border-terracotta bg-[#F1DFD2]"
                        : "border-[#E5D5C5] bg-white hover:border-terracotta"
                    }`}
                  >

                    <div className="flex justify-between items-center">

                      <span className="font-semibold">
                        {level}
                      </span>

                      {difficulty === level && (
                        <CheckCircle2
                          size={19}
                          className="text-terracotta"
                        />
                      )}

                    </div>

                    <p className="text-xs text-warm-muted mt-2">
                      {description}
                    </p>

                  </button>

                ))}

              </div>
            </div>

            {/* Question Count */}
            <div>

              <h2 className="flex items-center gap-3 font-bold text-xl mb-4">
                <MessageSquare className="text-terracotta" />
                Number of Questions
              </h2>

              <div className="grid grid-cols-3 gap-3">

                {[5, 10, 15].map((count) => (

                  <button
                    key={count}
                    type="button"
                    aria-pressed={questionCount === count}
                    onClick={() => {
                      setQuestionCount(count);
                      setMessage("");
                    }}
                    className={`border rounded-xl py-5 transition cursor-pointer ${
                      questionCount === count
                        ? "bg-terracotta text-white border-terracotta"
                        : "bg-white border-[#DCCABB] hover:border-terracotta"
                    }`}
                  >

                    <span className="block text-2xl font-bold">
                      {count}
                    </span>

                    <span className="text-sm">
                      Questions
                    </span>

                  </button>

                ))}

              </div>
            </div>

            {/* Confirmation */}
            {message && (
              <div
                role="status"
                className="bg-green-50 text-green-700 border border-green-200 rounded-xl p-4 text-sm"
              >
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={!role.trim()}
              className="w-full bg-terracotta hover:bg-terracotta-dark text-white rounded-xl py-4 flex justify-center items-center gap-3 font-semibold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Start Interview
              <ArrowRight size={20} />
            </button>

          </form>

          {/* Interview Summary */}
          <aside className="space-y-6">

            <div className="bg-cream border border-[#E5D5C5] rounded-2xl p-6">

              <h2 className="text-xl font-bold mb-6">
                Interview Summary
              </h2>

              <div className="space-y-5">

                <div>
                  <p className="text-sm text-warm-muted">
                    Target Role
                  </p>
                  <p className="font-semibold mt-1 break-words">
                    {role.trim() || "Not selected"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-warm-muted">
                    Difficulty
                  </p>
                  <p className="font-semibold text-terracotta mt-1">
                    {difficulty}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-warm-muted">
                    Total Questions
                  </p>
                  <p className="font-semibold mt-1">
                    {questionCount}
                  </p>
                </div>

                <div>
                  <p className="flex items-center gap-2 text-sm text-warm-muted">
                    <Clock size={17} />
                    Estimated Duration
                  </p>

                  <p className="font-semibold mt-1">
                    {questionCount * 2}–{questionCount * 3} minutes
                  </p>

                </div>

              </div>
            </div>

            {/* Instructions */}
            <div className="bg-[#F1DFD2] rounded-2xl p-6">

              <h2 className="font-bold text-lg mb-4">
                Before You Start
              </h2>

              {[
                "Choose a quiet environment.",
                "Read each question carefully.",
                "Provide clear and relevant answers.",
                "Review your feedback after completion.",
              ].map((tip) => (

                <div
                  key={tip}
                  className="flex items-start gap-3 mb-4"
                >

                  <CheckCircle2
                    size={18}
                    className="text-terracotta shrink-0 mt-1"
                  />

                  <p className="text-sm text-warm-muted">
                    {tip}
                  </p>

                </div>

              ))}

            </div>

          </aside>

        </div>

        <p className="text-center text-xs text-warm-muted mt-8">
          Demo mode — live AI question generation is pending.
        </p>

      </main>

    </div>
  );
}
