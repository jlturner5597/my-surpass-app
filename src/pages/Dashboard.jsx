import React from "react";

const Dashboard = () => {
  const token = localStorage.getItem("authToken");
  return (
    <div className="container">
      <h2>Scheduling Dashboard</h2>
      {token ? (
        <div className="token-box">
          <strong>Your token:</strong> {token}
        </div>
      ) : (
        <p>No token found. Please log in.</p>
      )}
    </div>
  );
};

export default Dashboard;
