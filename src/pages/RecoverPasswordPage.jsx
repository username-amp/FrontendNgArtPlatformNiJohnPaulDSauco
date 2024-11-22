import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RecoverPasswordPage = () => {
  const [form, setForm] = useState({
    email: "",
    code: "",
    password: "",
  });
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleRecoverPassword = async (e) => {
    e.preventDefault();
    setMessage(null);

    try {
      const response = await fetch("http://localhost:8002/api/v2/auth/recover-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage("Password successfully updated. Redirecting to login...");
        setTimeout(() => navigate("/signin"), 2000);
      } else {
        setMessage(result.error || "Recovery failed. Try again.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-md shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">Recover Password</h1>
        <form onSubmit={handleRecoverPassword} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Enter recovery code"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            value={form.code}
            onChange={(e) => setForm({ ...form, code: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Enter new password"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition"
          >
            Recover Password
          </button>
        </form>
        {message && <p className="text-center mt-4">{message}</p>}
      </div>
    </div>
  );
};

export default RecoverPasswordPage;
