import React, { useEffect, useState } from "react";
import { Navbar, Container, Nav, Form, Button } from "react-bootstrap";
import { getUser } from "../services/UserService";
import { useNavigate } from "react-router-dom";

function decodeJwt(token) {
  try {
    const base64Url = token.split(".")[1]; // payload part
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (err) {
    console.error("Invalid JWT:", err);
    return null;
  }
}

function NavbarComponent() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) return;

    getUser(token)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        setUser(null);
      });
  }, []);

  const handleClick = () => {
    const token = localStorage.getItem("jwt");

    if (token) {
      const decoded = decodeJwt(token);
      if (decoded && decoded.sub && user?.fullName) {
        navigate(`/profile?username=${decoded.sub}`);
        return;
      }
    }

    // fallback
    localStorage.clear();
    navigate("/login");
  };

  return (
    <Navbar expand="lg" className="navbar-light bg-dark">
      <Container className="px-4 px-lg-5">
        <Navbar.Brand href="/" className="text-white">
          Global
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto mb-2 mb-lg-0 ms-lg-4">
            <Nav.Link href="/" className="text-white" active>
              Home
            </Nav.Link>
            <Nav.Link href="#!" className="text-white">
              About
            </Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Button variant="outline-light" type="button" onClick={handleClick}>
              {user?.fullName ?? "Log in"}
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
