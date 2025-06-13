import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [candidateStatus, setCandidateStatus] = useState("");
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const checkCandidate = async () => {
      if (!token) {
        setCandidateStatus("No token found. Please log in.");
        return;
      }

      try {
        const response = await fetch("/api/candidates/current", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setCandidateStatus(`Candidate found in Surpass: ${data.message}`);
        } else if (response.status === 404) {
          const data = await response.json();
          setCandidateStatus(
            `Candidate NOT found in Surpass. Reason: ${data.message}`
          );
        } else {
          const data = await response.json();
          setCandidateStatus(`Error checking Surpass: ${data.message}`);
        }
      } catch (err) {
        console.error("Error checking Surpass candidate:", err);
        setCandidateStatus("Network or server error. Check console logs.");
      }
    };

    checkCandidate();
  }, [token]);

  return (
    <div className="container">
      <h2>Scheduling Dashboard</h2>
      <p>{candidateStatus}</p>
      {token ? (
        <p>Your token is: {token}</p>
      ) : (
        <p>No token found. Please log in.</p>
      )}
    </div>
  );
};

export default Dashboard;
