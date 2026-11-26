
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  BrainCircuit,
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
} from "lucide-react";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    target_role: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const inputStyle =
    "w-full bg-white border border-[#DCCABB] rounded-xl px-4 py-3 outline-none focus:border-terracotta";

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    setError("");
    setMessage("");
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!form.name.trim() || !form.target_role.trim()) {
      setError("Please complete all required fields.");
      return;
    }

    if (form.password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setMessage(
      "Form validated successfully. Account creation will be available after backend integration."
    );
  }

  return (
    <div className="min-h-screen bg-beige text-coffee flex items-center justify-center px-6 py-12">

      <div className="w-full max-w-lg">

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
            Create Your Account
          </h1>

          <p className="text-warm-muted text-center mt-3 mb-8">
            Start your journey towards interview success.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Full Name */}
            <div>
              <label htmlFor="name" className="block font-medium mb-2">
                Full Name
              </label>

              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your full name"
                value={form.name}
                onChange={handleChange}
                autoComplete="name"
                required
                className={inputStyle}
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block font-medium mb-2">
                Email Address
              </label>

              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
                required
                className={inputStyle}
              />
            </div>

            {/* Target Job Role */}
            <div>
              <label htmlFor="target_role" className="block font-medium mb-2">
                Target Job Role
              </label>

              <input
                id="target_role"
                name="target_role"
                type="text"
                placeholder="e.g. Software Developer"
                value={form.target_role}
                onChange={handleChange}
                required
                className={inputStyle}
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block font-medium mb-2">
                Password
              </label>

              <div className="relative">

                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  value={form.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                  required
                  className={`${inputStyle} pr-12`}
                />

                <button
                  type="button"
                  aria-label={showPassword ? "Hide passwords" : "Show passwords"}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3.5 text-warm-muted cursor-pointer"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>

              </div>

              <p className="text-xs text-warm-muted mt-2">
                Use at least 8 characters.
              </p>
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block font-medium mb-2">
                Confirm Password
              </label>

              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showPassword ? "text" : "password"}
                placeholder="Re-enter your password"
                value={form.confirmPassword}
                onChange={handleChange}
                autoComplete="new-password"
                required
                className={inputStyle}
              />
            </div>

            {error && (
              <p role="alert" className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg text-sm">
                {error}
              </p>
            )}

            {message && (
              <p role="status" className="bg-[#F1DFD2] text-terracotta-dark p-3 rounded-lg text-sm">
                {message}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-terracotta hover:bg-terracotta-dark text-white rounded-xl py-4 font-semibold flex items-center justify-center gap-2 transition cursor-pointer"
            >
              Create Account
              <ArrowRight size={20} />
            </button>

          </form>

          <p className="text-center text-sm text-warm-muted mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-terracotta font-semibold hover:underline"
            >
              Login
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}
