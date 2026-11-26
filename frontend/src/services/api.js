
import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "http://127.0.0.1:8000",

  timeout: 120000,

  headers: {
    Accept: "application/json",
  },
});

// Convert API errors into readable messages

export function getErrorMessage(error) {
  const detail = error.response?.data?.detail;

  if (typeof detail === "string") {
    return detail;
  }

  if (Array.isArray(detail)) {
    return detail
      .map((item) => item.msg)
      .join(", ");
  }

  if (error.code === "ECONNABORTED") {
    return "Request timed out. Please try again.";
  }

  if (!error.response) {
    return "Unable to connect to the server. Please try again later.";
  }

  return "Something went wrong. Please try again.";
}

export default api;
