import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setError(null);

    try {
      const signUpResponse = await fetch("http://localhost:8002/api/v2/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: form.username,
          email: form.email,
          password: form.password,
        }),
      });

      const signUpResult = await signUpResponse.json();

      if (signUpResponse.ok) {
        setMessage("Sign-up successful! Sending verification email...");
        localStorage.setItem("email", form.email);

        const emailResponse = await fetch(
          "http://localhost:8002/api/v2/auth/send-verification-email",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: form.email }),
          }
        );

        const emailResult = await emailResponse.json();

        if (emailResponse.ok) {
          setMessage("Verification email sent! Please check your inbox.");
          navigate("/verify");
        } else {
          setMessage(emailResult.error || "Failed to send verification email.");
        }
      } else {
        setMessage(signUpResult.error || "Sign-up failed. Please try again.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-md shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">Sign Up</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            value={form.confirmPassword}
            onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition"
          >
            Sign Up
          </button>
        </form>
        {error && <p className="text-center text-red-500 mt-4">{error}</p>}
        {message && <p className="text-center text-green-500 mt-4">{message}</p>}
      </div>
    </div>
  );
};

export default SignUpPage;
