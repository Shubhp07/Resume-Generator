import React from "react";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user-related data from localStorage
    localStorage.removeItem("userType");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("authToken"); // if stored

    // Redirect to homepage or login page
    navigate("/");
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>
      <button
        onClick={handleLogout}
        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default UserDashboard;
