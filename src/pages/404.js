import React from "react";

const NotFoundPage = () => (
  <div style={{ padding: "2rem 4rem", fontSize: "1.5rem" }}>
    <h1
      style={{
        fontWeight: "bold",
        fontSize: "2rem",
      }}
    >
      <span
        style={{
          color: "darkred",
          fontSize: "4rem",
        }}
      >
        404
      </span>
      <br />
      Page not found
    </h1>
    <p>
      The page you are looking for could not be found. Please check your URL and
      try again.
    </p>
    <p>
      <b>
        <a onClick={() => window.history.back()}>Go Back</a>
      </b>
    </p>
    <p>
      <b>
        <a href='/'>Go Home</a>
      </b>
    </p>
  </div>
);

export default NotFoundPage;
