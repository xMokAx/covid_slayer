import React from "react";

export const Avatar = ({ name = "Covid", health }) => {
  return (
    <div
      style={{ width: 125, height: 125 }}
      className={`mx-auto d-flex flex-column justify-content-center align-items-center border ${
        name === "Covid" ? "border-danger" : "border-primary"
      } rounded-circle`}
    >
      <p className="font-weight-bolder">{name}</p>
      <p>{health}</p>
    </div>
  );
};
