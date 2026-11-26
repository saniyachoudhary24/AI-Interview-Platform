
import { Link, useLocation } from "react-router-dom";
import {
  BrainCircuit,
  Trophy,
  Target,
  Clock,
  MessageSquare,
  CheckCircle2,
  TrendingUp,
  Lightbulb,
  ArrowRight,
  LayoutDashboard,
  RotateCcw,
} from "lucide-react";

const scores = [
  { title: "Technical Knowledge", score: 82 },
  { title: "Communication", score: 75 },
  { title: "Answer Relevance", score: 78 },
  { title: "Completeness", score: 69 },
];

const strengths = [
  "Demonstrates understanding of technical concepts.",
  "Provides relevant examples from projects.",
  "Communicates ideas in a structured manner.",
];

const improvements = [
  "Provide more detailed explanations.",
  "Include practical examples in technical answers.",
  "Improve the completeness of responses.",
  "Practice answering questions confidently.",
];

export default function Results() {
  const location = useLocation();
  const session = location.state;

  const overallScore = Math.round(
    scores.reduce((total, item) => total + item.score, 0) /
      scores.length
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

        {/* Page Heading */}
        <div className="text-center mb-8">

          <div className="bg-[#F1DFD2] text-terracotta rounded-2xl p-5 w-fit mx-auto mb-5">
            <Trophy size={48} />
          </div>

          <h1 className="text-4xl font-bold">
            Interview Results
          </h1>

          <p className="text-warm-muted mt-3">
            Review your performance and discover opportunities
            for improvement.
          </p>

        </div>

        {/* Demo Notice */}
        <div className="bg-[#F1DFD2] text-terracotta-dark rounded-xl p-4 mb-7 text-sm text-center">

          Demo mode — scores, strengths and feedback below
          are illustrative examples, not AI evaluations of
          your answers.

        </div>

        {/* Overall Score */}
        <section className="bg-terracotta text-white rounded-3xl p-8 md:p-12 mb-8">

          <div className="grid md:grid-cols-2 gap-8 items-center">

            <div>

              <p className="text-sm tracking-widest text-[#F8D9C7] mb-3">
                SAMPLE OVERALL PERFORMANCE
              </p>

              <h2 className="text-3xl font-bold">
                Keep Growing!
              </h2>

              <p className="text-[#FFF0E7] mt-4 leading-relaxed">
                Every practice interview brings you one step
                closer to your career goals. Review the example
                feedback below to understand how your future
                results will be presented.
              </p>

            </div>

            <div className="flex justify-center">

              <div
                className="w-44 h-44 rounded-full flex items-center justify-center"
                style={{
                  background: `conic-gradient(#FFFAF5 ${overallScore}%, #D58D73 0)`,
                }}
              >

                <div className="bg-terracotta w-36 h-36 rounded-full flex flex-col items-center justify-center">

                  <span className="text-5xl font-bold">
                    {overallScore}%
                  </span>

                  <span className="text-sm mt-2">
                    Sample Score
                  </span>

                </div>

              </div>

            </div>

          </div>

        </section>

        {/* Session Summary */}
        <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">

          {[
            {
              title: "Job Role",
              value: session?.role || "Not available",
              icon: Target,
            },
            {
              title: "Difficulty",
              value: session?.difficulty || "Not available",
              icon: TrendingUp,
            },
            {
              title: "Questions Answered",
              value: session
                ? `${session.answeredCount}/${session.questionCount}`
                : "Not available",
              icon: MessageSquare,
            },
            {
              title: "Time Taken",
              value: session?.formattedTime || "Not available",
              icon: Clock,
            },
          ].map(({ title, value, icon: Icon }) => (

            <div
              key={title}
              className="bg-cream border border-[#E5D5C5] rounded-2xl p-6"
            >

              <div className="bg-[#F1DFD2] text-terracotta p-3 rounded-xl w-fit mb-4">
                <Icon size={24} />
              </div>

              <p className="text-sm text-warm-muted">
                {title}
              </p>

              <p className="text-xl font-bold mt-2 break-words">
                {value}
              </p>

            </div>

          ))}

        </section>

        {/* Detailed Scores */}
        <section className="bg-cream border border-[#E5D5C5] rounded-3xl p-7 md:p-9 mb-8">

          <h2 className="flex items-center gap-3 text-2xl font-bold mb-3">

            <TrendingUp className="text-terracotta" />

            Detailed Performance

          </h2>

          <p className="text-sm text-warm-muted mb-8">
            Sample evaluation across four interview criteria.
          </p>

          {scores.map(({ title, score }) => (

            <div key={title} className="mb-7">

              <div className="flex justify-between mb-3">

                <span className="font-medium">
                  {title}
                </span>

                <span className="font-bold text-terracotta">
                  {score}%
                </span>

              </div>

              <div className="bg-[#EADDD0] h-3 rounded-full">

                <div
                  className="bg-terracotta h-3 rounded-full"
                  style={{ width: `${score}%` }}
                />

              </div>

            </div>

          ))}

        </section>

        {/* Feedback Cards */}
        <section className="grid lg:grid-cols-2 gap-7 mb-8">

          {/* Strengths */}
          <div className="bg-cream border border-[#E5D5C5] rounded-2xl p-7">

            <h2 className="flex items-center gap-3 text-xl font-bold mb-6">

              <CheckCircle2
                className="text-green-700"
                size={26}
              />

              Example Strengths

            </h2>

            {strengths.map((item) => (

              <div
                key={item}
                className="flex items-start gap-3 bg-green-50 text-green-800 rounded-xl p-4 mb-4"
              >

                <CheckCircle2
                  size={19}
                  className="shrink-0 mt-1"
                />

                <p className="text-sm leading-relaxed">
                  {item}
                </p>

              </div>

            ))}

          </div>

          {/* Improvements */}
          <div className="bg-cream border border-[#E5D5C5] rounded-2xl p-7">

            <h2 className="flex items-center gap-3 text-xl font-bold mb-6">

              <Lightbulb
                className="text-terracotta"
                size={26}
              />

              Example Areas for Improvement

            </h2>

            {improvements.map((item) => (

              <div
                key={item}
                className="flex items-start gap-3 bg-[#F1DFD2] text-terracotta-dark rounded-xl p-4 mb-4"
              >

                <ArrowRight
                  size={19}
                  className="shrink-0 mt-1"
                />

                <p className="text-sm leading-relaxed">
                  {item}
                </p>

              </div>

            ))}

          </div>

        </section>

        {/* Recommendation */}
        <section className="bg-[#F0E2D3] border border-[#E5D5C5] rounded-2xl p-7 mb-8">

          <h2 className="text-xl font-bold mb-3">
            Recommended Next Steps
          </h2>

          <p className="text-warm-muted leading-relaxed">
            Revise your technical fundamentals, practice
            explaining your projects and prepare structured
            answers with relevant examples before starting
            another interview.
          </p>

        </section>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4">

          <Link
            to="/dashboard"
            className="flex items-center gap-2 border border-terracotta text-terracotta px-7 py-4 rounded-xl font-semibold hover:bg-[#F1DFD2] transition"
          >

            <LayoutDashboard size={20} />

            Back to Dashboard

          </Link>

          <Link
            to="/interview-setup"
            className="flex items-center gap-2 bg-terracotta hover:bg-terracotta-dark text-white px-7 py-4 rounded-xl font-semibold transition"
          >

            <RotateCcw size={20} />

            Practice Again

          </Link>

        </div>

        <p className="text-center text-xs text-warm-muted mt-8">
          Actual AI-generated scores and personalized feedback
          will be available after backend integration.
        </p>

      </main>

    </div>
  );
}
