import React from "react";

export function LoadingPage() {
  return (
    <div className="vh-100 vw-100 d-flex justify-content-center align-items-center">
      <div className="spinner-border text-primary" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}
