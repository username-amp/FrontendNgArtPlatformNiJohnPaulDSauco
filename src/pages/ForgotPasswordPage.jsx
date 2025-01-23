import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const navigate = useNavigate(); // Initialize navigate function

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:8002/api/v2/auth/forgot-password-code",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const result = await response.json();
      if (response.ok) {
        setMessage("Check your email for password reset instructions.");
        // Navigate to /recover-password after successful request
        setTimeout(() => navigate("/recover-password"), 2000); // Redirect after 2 seconds
      } else {
        setMessage(result.error || "Request failed. Try again.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again later.", error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-md p-8 bg-white rounded-xl">
        {/* Logo */}
        <div className=" flex justify-center p-6">
          <img
            src="/src/assets/images/museo.png"
            alt="MUZEUM Logo"
            className="w-[80%] max-w-xs"
          />
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
          Forgot Your Password?
        </h1>

        {/* Forgot Password Form */}
        <form onSubmit={handleForgotPassword} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-4 border-2 border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 text-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-black text-white p-4 rounded-xl font-bold text-lg hover:bg-gray-800 transition-all duration-300"
          >
            Submit
          </button>
        </form>

        {/* Message Display */}
        {message && (
          <p className="text-center text-green-500 mt-4">{message}</p>
        )}

        {/* Additional Links */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            Remembered your password?{" "}
            <a href="/signin" className="text-blue-600 hover:underline">
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
