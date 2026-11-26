
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  BrainCircuit,
  ArrowLeft,
  ArrowRight,
  Clock,
  CheckCircle2,
  MessageSquare,
  Lightbulb,
  Flag,
} from "lucide-react";

const sampleQuestions = [
  "Tell me about yourself and your technical background.",
  "Explain one of the projects you have worked on and describe your contribution.",
  "What programming languages are you comfortable with and why?",
  "How do you approach solving a difficult technical problem?",
  "Why should we hire you for this role?",
  "Explain the difference between frontend and backend development.",
  "What is object-oriented programming?",
  "How do you identify and fix bugs in your code?",
  "What is the purpose of a database?",
  "Describe a situation where you worked successfully in a team.",
  "How do you manage deadlines and multiple tasks?",
  "Explain how an API works.",
  "How do you ensure the quality of your code?",
  "Describe a challenge you faced during a project and how you overcame it.",
  "Where do you see yourself professionally in five years?",
];

export default function Interview() {
  const location = useLocation();

  const role = location.state?.role || "Software Developer";
  const difficulty = location.state?.difficulty || "Medium";

  const requestedCount = Number(location.state?.questionCount);
  const questionCount = [5, 10, 15].includes(requestedCount)
    ? requestedCount
    : 5;

  const questions = sampleQuestions.slice(0, questionCount);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(
    Array(questionCount).fill("")
  );
  const [seconds, setSeconds] = useState(0);
  const [finished, setFinished] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (finished) return;

    const timer = setInterval(() => {
      setSeconds((previous) => previous + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [finished]);

  const minutes = Math.floor(seconds / 60);

  const formattedTime =
    `${String(minutes).padStart(2, "0")}:` +
    `${String(seconds % 60).padStart(2, "0")}`;

  const answeredCount = answers.filter(
    (answer) => answer.trim()
  ).length;

  const progress = Math.round(
    (answeredCount / questionCount) * 100
  );

  function handleAnswerChange(e) {
    const updatedAnswers = [...answers];

    updatedAnswers[currentQuestion] = e.target.value;

    setAnswers(updatedAnswers);
    setError("");
  }

  function nextQuestion() {
    if (!answers[currentQuestion].trim()) {
      setError("Please enter your answer before continuing.");
      return;
    }

    setError("");

    if (currentQuestion < questionCount - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  }

  function previousQuestion() {
    setError("");

    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  }

 function finishInterview() {
  if (answeredCount !== questionCount) {
    setError("Please answer all questions before finishing.");
    return;
  }

  const completedInterview = {
    id: crypto.randomUUID(),
    role,
    difficulty,
    questionCount,
    answeredCount,
    formattedTime,
    date: new Date().toISOString(),
    status: "Completed",
  };

  try {
    const saved = JSON.parse(
      localStorage.getItem("interviewHistory") || "[]"
    );

    const previousInterviews = Array.isArray(saved)
      ? saved
      : [];

    localStorage.setItem(
      "interviewHistory",
      JSON.stringify([
        completedInterview,
        ...previousInterviews,
      ])
    );
  } catch {
    setError("Unable to save interview history. Please try again.");
    return;
  }

  setError("");
  setFinished(true);
}

  if (finished) {
    return (
      <div className="min-h-screen bg-beige text-coffee flex items-center justify-center p-6">

        <div className="bg-cream border border-[#E5D5C5] rounded-3xl shadow-lg p-10 max-w-xl w-full text-center">

          <CheckCircle2
            size={70}
            className="mx-auto text-terracotta mb-6"
          />

          <h1 className="text-3xl font-bold">
            Interview Completed!
          </h1>

          <p className="text-warm-muted mt-4">
            Congratulations on completing your practice interview.
          </p>

          <div className="bg-[#F1DFD2] rounded-2xl p-6 mt-7 space-y-4">

            <p>
              Job Role: <strong>{role}</strong>
            </p>

            <p>
              Difficulty: <strong>{difficulty}</strong>
            </p>

            <p>
              Questions Answered:{" "}
              <strong>
                {answeredCount}/{questionCount}
              </strong>
            </p>

            <p>
              Time Taken: <strong>{formattedTime}</strong>
            </p>

          </div>

          <p className="text-sm text-warm-muted mt-6">
            AI evaluation and detailed feedback will be available
            after backend integration.
          </p>

          <Link
  to="/results"
  state={{
    role,
    difficulty,
    answeredCount,
    questionCount,
    formattedTime,
  }}
  className="block bg-terracotta hover:bg-terracotta-dark text-white rounded-xl py-4 mt-7 font-semibold"
>
  View Results and Feedback
</Link>

          <Link
            to="/interview-setup"
            className="block text-terracotta mt-4 font-medium"
          >
            Practice Another Interview
          </Link>

        </div>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-beige text-coffee">

      {/* Header */}
      <header className="bg-cream border-b border-[#E5D5C5] px-6 py-5">

        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-4">

          <div className="flex items-center gap-3">

            <div className="bg-terracotta text-white rounded-xl p-2">
              <BrainCircuit size={28} />
            </div>

            <span className="text-xl font-bold">
              Interview<span className="text-terracotta">AI</span>
            </span>

          </div>

          <div className="flex items-center gap-2 bg-[#F1DFD2] text-terracotta-dark px-5 py-3 rounded-xl font-semibold">

            <Clock size={20} />
            {formattedTime}

          </div>

        </div>

      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">

        <div className="flex flex-wrap items-center justify-between gap-4 mb-7">

          <div>

            <h1 className="text-3xl font-bold">
              Mock Interview
            </h1>

            <p className="text-warm-muted mt-2">
              {role} | {difficulty} Difficulty
            </p>

          </div>

          <span className="bg-[#F1DFD2] text-terracotta-dark px-4 py-2 rounded-full text-sm font-medium">
            Demo Practice Session
          </span>

        </div>

        {/* Progress Bar */}
        <section className="bg-cream border border-[#E5D5C5] rounded-2xl p-6 mb-7">

          <div className="flex justify-between mb-3">

            <span className="font-medium">
              Question {currentQuestion + 1} of {questionCount}
            </span>

            <span className="text-terracotta font-semibold">
              {progress}% Answered
            </span>

          </div>

          <div className="bg-[#EADDD0] h-3 rounded-full">

            <div
              className="bg-terracotta h-3 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />

          </div>

        </section>

        <div className="grid lg:grid-cols-3 gap-7">

          {/* Interview Area */}
          <section className="lg:col-span-2 bg-cream border border-[#E5D5C5] rounded-3xl p-7 md:p-9">

            <div className="flex items-center gap-4 mb-8">

              <div className="bg-[#F1DFD2] text-terracotta rounded-2xl p-4">
                <BrainCircuit size={40} />
              </div>

              <div>

                <h2 className="text-xl font-bold">
                  AI Interviewer
                </h2>

                <p className="text-sm text-warm-muted">
                  Sample practice question
                </p>

              </div>

            </div>

            {/* Question */}
            <div className="bg-[#F1DFD2] rounded-2xl p-6 mb-7">

              <p className="text-sm font-semibold text-terracotta-dark mb-3">
                QUESTION {currentQuestion + 1}
              </p>

              <h3 className="text-xl font-semibold leading-relaxed">
                {questions[currentQuestion]}
              </h3>

            </div>

            {/* Answer */}
            <label
              htmlFor="answer"
              className="flex items-center gap-2 font-semibold mb-4"
            >
              <MessageSquare
                size={20}
                className="text-terracotta"
              />
              Your Answer
            </label>

            <textarea
              id="answer"
              rows={8}
              value={answers[currentQuestion]}
              onChange={handleAnswerChange}
              placeholder="Type your answer here..."
              className="w-full bg-white border border-[#DCCABB] rounded-xl p-5 outline-none focus:border-terracotta resize-y"
            />

            <p className="text-right text-sm text-warm-muted mt-2">
              {answers[currentQuestion].trim()
                ? answers[currentQuestion]
                    .trim()
                    .split(/\s+/).length
                : 0}{" "}
              words
            </p>

            {error && (
              <p
                role="alert"
                className="bg-red-50 text-red-700 rounded-lg p-3 mt-4 text-sm"
              >
                {error}
              </p>
            )}

            {/* Navigation Buttons */}
            <div className="flex flex-wrap justify-between gap-4 mt-7">

              <button
                type="button"
                onClick={previousQuestion}
                disabled={currentQuestion === 0}
                className="flex items-center gap-2 border border-terracotta text-terracotta px-5 py-3 rounded-xl disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                <ArrowLeft size={18} />
                Previous
              </button>

              {currentQuestion === questionCount - 1 ? (

                <button
                  type="button"
                  onClick={finishInterview}
                  className="flex items-center gap-2 bg-terracotta hover:bg-terracotta-dark text-white px-6 py-3 rounded-xl font-semibold cursor-pointer"
                >
                  Finish Interview
                  <Flag size={18} />
                </button>

              ) : (

                <button
                  type="button"
                  onClick={nextQuestion}
                  className="flex items-center gap-2 bg-terracotta hover:bg-terracotta-dark text-white px-6 py-3 rounded-xl font-semibold cursor-pointer"
                >
                  Next Question
                  <ArrowRight size={18} />
                </button>

              )}

            </div>

          </section>

          {/* Sidebar */}
          <aside className="space-y-6">

            <div className="bg-cream border border-[#E5D5C5] rounded-2xl p-6">

              <h2 className="text-xl font-bold mb-5">
                Question Navigator
              </h2>

              <div className="grid grid-cols-5 gap-3">

                {questions.map((_, index) => (

                  <button
                    key={index}
                    type="button"
                    aria-label={`Go to question ${index + 1}`}
                    aria-current={
                      currentQuestion === index
                        ? "step"
                        : undefined
                    }
                    onClick={() => {
                      setCurrentQuestion(index);
                      setError("");
                    }}
                    className={`rounded-lg py-3 font-semibold border cursor-pointer ${
                      currentQuestion === index
                        ? "bg-terracotta text-white border-terracotta"
                        : answers[index].trim()
                        ? "bg-green-100 text-green-700 border-green-200"
                        : "bg-white border-[#DCCABB]"
                    }`}
                  >
                    {index + 1}
                  </button>

                ))}

              </div>

              <p className="text-sm text-warm-muted mt-5">
                Answered: {answeredCount}/{questionCount}
              </p>

            </div>

            {/* Interview Tips */}
            <div className="bg-[#F1DFD2] rounded-2xl p-6">

              <h2 className="flex items-center gap-2 text-lg font-bold mb-5">
                <Lightbulb
                  size={23}
                  className="text-terracotta"
                />
                Interview Tips
              </h2>

              {[
                "Read the question carefully.",
                "Keep your answers clear and structured.",
                "Include relevant examples.",
                "Explain your thought process.",
                "Stay confident and focused.",
              ].map((tip) => (

                <div
                  key={tip}
                  className="flex items-start gap-2 mb-4"
                >

                  <CheckCircle2
                    size={17}
                    className="text-terracotta shrink-0 mt-1"
                  />

                  <p className="text-sm text-warm-muted">
                    {tip}
                  </p>

                </div>

              ))}

            </div>

            <Link
              to="/dashboard"
              onClick={(e) => {
                if (
                  !window.confirm(
                    "Exit the interview? Your current answers will be lost."
                  )
                ) {
                  e.preventDefault();
                }
              }}
              className="block text-center border border-terracotta text-terracotta rounded-xl py-3"
            >
              Exit Interview
            </Link>

          </aside>

        </div>

        <p className="text-center text-xs text-warm-muted mt-8">
          Demo mode — questions are predefined, and answers
          are not transmitted to any server.
        </p>

      </main>

    </div>
  );
}
