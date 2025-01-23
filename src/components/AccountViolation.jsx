import { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import { jwtDecode } from "jwt-decode";

const AccountViolation = () => {
  const [violations, setViolations] = useState([]);
  const [violationCount, setViolationCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getUserIdFromToken = () => {
    const cookie = document.cookie
      .split(";")
      .find((cookie) => cookie.trim().startsWith("token="));

    if (cookie) {
      const token = cookie.split("=")[1];
      const decoded = jwtDecode(token);
      return decoded._id;
    }

    return null;
  };

  useEffect(() => {
    const fetchViolations = async () => {
      const userId = getUserIdFromToken();

      if (!userId) {
        setError("User not authenticated. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await axiosInstance.get(`/users/violations/${userId}`);
        setViolations(response.data.violations);
        setViolationCount(response.data.violationCount);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch violations. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchViolations();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Account Violations
      </h2>
      <p className="text-gray-600 mb-4">
        You have a total of{" "}
        <span className="font-semibold">{violationCount}</span> violations on
        your account.
      </p>
      {violations.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left p-4 border-b border-gray-300">#</th>
                <th className="text-left p-4 border-b border-gray-300">Date</th>
                <th className="text-left p-4 border-b border-gray-300">
                  Reason
                </th>
                <th className="text-left p-4 border-b border-gray-300">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {violations.map((violation, index) => (
                <tr key={violation._id}>
                  <td className="p-4 border-b border-gray-300">{index + 1}</td>
                  <td className="p-4 border-b border-gray-300">
                    {new Date(violation.date).toLocaleDateString()}
                  </td>
                  <td className="p-4 border-b border-gray-300">
                    {violation.reason}
                  </td>
                  <td className="p-4 border-b border-gray-300">
                    <span
                      className={`px-2 py-1 rounded text-sm ${
                        violation.status === "Resolved"
                          ? "bg-green-100 text-green-600"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {violation.status || "Under Review"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500 text-center">No violations found.</p>
      )}
    </div>
  );
};

export default AccountViolation;
