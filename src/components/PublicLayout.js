import React from "react";
import { Container } from "react-bootstrap";

export const PublicLayout = ({ children }) => {
  return (
    <Container style={{ maxWidth: "500px" }} className="mx-auto">
      <h1 className="m-4 mb-6 text-center">Covid Slayer</h1>
      {children}
    </Container>
  );
};
