import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export const PrivateLayout = ({ children, setUser }) => {
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };
  return (
    <>
      <Navbar bg="light" expand="sm">
        <Navbar.Brand as={NavLink} activeClassName="text-dark" to="/">
          Covid Slayer
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={NavLink} exact activeClassName="text-dark" to="/">
              Dashboard
            </Nav.Link>
            <Nav.Link as={NavLink} exact activeClassName="text-dark" to="/game">
              Game
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link onClick={logout} href="#" role="button">
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <main className="p-4 container-fluid">{children}</main>
    </>
  );
};
