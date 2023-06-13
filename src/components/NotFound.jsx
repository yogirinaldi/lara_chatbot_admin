import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  const redirectToHome = () => {
    navigate("/");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div>
        <h1>404 - Page Not Found</h1>
        <p>The requested page could not be found.</p>
        <button onClick={redirectToHome}>Go to Home</button>
      </div>
    </div>
  );
};

export default NotFound;
