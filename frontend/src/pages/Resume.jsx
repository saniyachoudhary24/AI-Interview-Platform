
import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  UploadCloud,
  FileText,
  Trash2,
  CheckCircle2,
  AlertCircle,
  BrainCircuit,
  ShieldCheck,
} from "lucide-react";

export default function Resume() {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const fileInput = useRef(null);

  function handleFileChange(e) {
    const selectedFile = e.target.files[0];

    if (!selectedFile) return;

    setError("");
    setMessage("");
    setFile(null);

    if (
      !selectedFile.name.toLowerCase().endsWith(".pdf") ||
      (selectedFile.type &&
        selectedFile.type !== "application/pdf")
    ) {
      setError("Please select a PDF file only.");
      e.target.value = "";
      return;
    }

    if (selectedFile.size === 0) {
      setError("The selected file is empty.");
      e.target.value = "";
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      setError("File size must be less than or equal to 5 MB.");
      e.target.value = "";
      return;
    }

    setFile(selectedFile);
  }

  function removeFile() {
    setFile(null);
    setError("");
    setMessage("");

    if (fileInput.current) {
      fileInput.current.value = "";
    }
  }

  function handleUpload() {
    if (!file) {
      setError("Please select your resume first.");
      return;
    }

    setError("");
    setMessage(
      "Resume selected and validated successfully. Actual upload will be available after backend integration."
    );
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

      <main className="max-w-4xl mx-auto px-6 py-10">

        <Link
          to="/dashboard"
          className="flex items-center gap-2 text-terracotta mb-8"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </Link>

        <h1 className="text-4xl font-bold">
          Upload Your Resume
        </h1>

        <p className="text-warm-muted mt-3 mb-8">
          Personalize your interview preparation by providing
          details about your skills, experience and projects.
        </p>

        {/* Upload Card */}
        <section className="bg-cream border border-[#E5D5C5] rounded-3xl p-6 md:p-10 shadow-sm">

          <h2 className="text-xl font-bold mb-6">
            Resume Document
          </h2>

          <input
            type="file"
            accept=".pdf,application/pdf"
            ref={fileInput}
            onChange={handleFileChange}
            className="hidden"
          />

          <div className="border-2 border-dashed border-[#DCCABB] hover:border-terracotta bg-[#FCF6EF] rounded-2xl p-8 text-center transition">

            <div className="bg-[#F1DFD2] text-terracotta p-5 rounded-2xl w-fit mx-auto mb-5">
              <UploadCloud size={42} />
            </div>

            <h3 className="text-xl font-semibold">
              Choose Your Resume
            </h3>

            <p className="text-warm-muted text-sm mt-3">
              Supported format: PDF
            </p>

            <p className="text-warm-muted text-sm mt-1">
              Maximum file size: 5 MB
            </p>

            <button
              type="button"
              onClick={() => fileInput.current.click()}
              className="bg-terracotta hover:bg-terracotta-dark text-white px-7 py-3 rounded-xl font-semibold mt-6 cursor-pointer transition"
            >
              {file ? "Replace File" : "Browse Files"}
            </button>

          </div>

          {/* Selected File */}
          {file && (
            <div className="flex items-center gap-4 bg-[#F1DFD2] rounded-xl p-4 mt-6">

              <div className="bg-cream text-terracotta p-3 rounded-xl">
                <FileText size={28} />
              </div>

              <div className="flex-1 min-w-0">

                <p className="font-semibold break-all">
                  {file.name}
                </p>

                <p className="text-sm text-warm-muted mt-1">
                  {(file.size / 1024).toFixed(2)} KB
                </p>

              </div>

              <button
                type="button"
                onClick={removeFile}
                aria-label="Remove resume"
                className="text-red-600 hover:bg-red-100 p-2 rounded-lg cursor-pointer"
              >
                <Trash2 size={22} />
              </button>

            </div>
          )}

          {/* Error Message */}
          {error && (
            <div
              role="alert"
              className="flex items-center gap-3 bg-red-50 text-red-700 border border-red-200 rounded-xl p-4 mt-5"
            >
              <AlertCircle size={22} className="shrink-0" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          {/* Status Message */}
          {message && (
            <div
              role="status"
              className="flex items-center gap-3 bg-green-50 text-green-700 border border-green-200 rounded-xl p-4 mt-5"
            >
              <CheckCircle2 size={24} className="shrink-0" />
              <p className="text-sm">{message}</p>
            </div>
          )}

          <button
            type="button"
            onClick={handleUpload}
            disabled={!file}
            className="w-full bg-terracotta hover:bg-terracotta-dark text-white rounded-xl py-4 font-semibold mt-7 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition"
          >
            Upload Resume
          </button>

        </section>

        {/* Information Card */}
        <section className="bg-cream border border-[#E5D5C5] rounded-2xl p-6 mt-7">

          <div className="flex items-center gap-3 mb-5">
            <ShieldCheck
              size={26}
              className="text-terracotta"
            />

            <h2 className="text-xl font-bold">
              Why Upload Your Resume?
            </h2>
          </div>

          {[
            "Receive questions based on your technical skills.",
            "Practice questions related to your academic projects.",
            "Prepare for your preferred job role.",
            "Get a more personalized interview experience.",
          ].map((item) => (
            <div
              key={item}
              className="flex items-center gap-3 mb-4 text-warm-muted"
            >
              <CheckCircle2
                size={19}
                className="text-terracotta shrink-0"
              />
              <p>{item}</p>
            </div>
          ))}

        </section>

        <p className="text-center text-xs text-warm-muted mt-6">
          Demo mode — your selected resume is not being
          transmitted to any server.
        </p>

      </main>
    </div>
  );
}
