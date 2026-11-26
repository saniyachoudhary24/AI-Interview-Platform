
import { useState } from "react";
import {
  BrainCircuit,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setMessage("Form validated. Backend connection is pending.");
  }

  return (
    <div className="min-h-screen bg-beige text-coffee flex items-center justify-center px-6 py-12">

      <div className="w-full max-w-md">

        <Link
          to="/"
          className="flex items-center gap-2 text-terracotta mb-6"
        >
          <ArrowLeft size={18} />
          Back to Home
        </Link>

        <div className="bg-cream border border-[#E5D5C5] rounded-3xl shadow-xl p-8">

          <div className="flex justify-center mb-5">
            <div className="bg-terracotta text-white p-4 rounded-2xl">
              <BrainCircuit size={36} />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-center">
            Welcome Back!
          </h1>

          <p className="text-warm-muted text-center mt-3 mb-8">
            Login to continue your interview preparation.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <label htmlFor="email" className="block font-medium mb-2">
                Email Address
              </label>

              <div className="relative">
                <Mail
                  size={20}
                  className="absolute left-4 top-4 text-warm-muted"
                />

                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  className="w-full bg-white border border-[#DCCABB] rounded-xl py-4 pl-12 pr-4 outline-none focus:border-terracotta"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block font-medium mb-2">
                Password
              </label>

              <div className="relative">
                <Lock
                  size={20}
                  className="absolute left-4 top-4 text-warm-muted"
                />

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="w-full bg-white border border-[#DCCABB] rounded-xl py-4 pl-12 pr-12 outline-none focus:border-terracotta"
                />

                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-4 text-warm-muted cursor-pointer"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-terracotta hover:bg-terracotta-dark text-white rounded-xl py-4 font-semibold flex items-center justify-center gap-2 transition cursor-pointer"
            >
              Login
              <ArrowRight size={20} />
            </button>

            {message && (
              <p role="status" className="text-sm text-terracotta text-center bg-[#F1DFD2] p-3 rounded-lg">
                {message}
              </p>
            )}

          </form>

          <p className="text-center text-sm text-warm-muted mt-6">
  New to InterviewAI?{" "}
  <Link
    to="/register"
    className="text-terracotta font-semibold hover:underline"
  >
    Create an Account
  </Link>
</p>

        </div>

      </div>

    </div>
  );
}
