import React, { useState } from "react";

const ChangePasswordPage = () => {
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const [message, setMessage] = useState(null);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    
    try {
      const { oldPassword, newPassword } = form;
  
      console.log('Request to change password...');
  
      const response = await fetch('http://localhost:8002/api/v2/auth/change-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ oldPassword, newPassword }),
        credentials: 'include',
      });
  
      const result = await response.json();
      
   
      console.log('Password change response received.');
      
      if (response.ok) {
        setMessage('Password changed successfully');
      } else {
        setMessage(result.message || 'Failed to change password');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred. Please try again later.');
    }
  };
  
  
  
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-md shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">Change Password</h1>
        <form onSubmit={handleChangePassword} className="space-y-4">
          <input
            type="password"
            placeholder="Enter current password"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            value={form.oldPassword}
            onChange={(e) => setForm({ ...form, oldPassword: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Enter new password"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            value={form.newPassword}
            onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition"
          >
            Change Password
          </button>
        </form>
        {message && <p className="text-center mt-4">{message}</p>}
      </div>
    </div>
  );
};

export default ChangePasswordPage;
