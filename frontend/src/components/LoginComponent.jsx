import React, { useState } from "react";
import { Card, Form, Button, Row, Col, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/UserService";
import toast from "react-hot-toast";

function LoginComponent() {
  const navigate = useNavigate();
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const credentials = {
      usernameOrEmail: usernameOrEmail,
      password: password,
    };
    login(credentials)
      .then((response) => {
        console.log(response);
        localStorage.setItem("jwt", response.data)
        navigate("/");
        toast.success("Succesfully logged in");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Invalid credentials");
      });
  }

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center min-vh-100"
    >
      <Row className="w-100 justify-content-center">
        <Col xs={10} sm={8} md={6} lg={3}>
          <Card className="p-4 shadow">
            <Card.Body>
              <h3 className="mb-4 text-center">Login</h3>

              <Form>
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Username or Email</Form.Label>
                  <Form.Control
                    type="text"
                    size="md"
                    placeholder="Enter username or email"
                    value={usernameOrEmail}
                    onChange={(e) => setUsernameOrEmail(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    size="md"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>

                <Form.Check
                  className="d-flex justify-content-start mb-3"
                  type="checkbox"
                  id="formRemember"
                  label="Remember password"
                />

                <Button
                  variant="primary"
                  size="md"
                  className="w-100 mb-3 mt-3"
                  type="submit"
                  onClick={handleSubmit}
                >
                  Login
                </Button>

                <Container className="text-center">
                  <Link to={"/register"}>Dont have an account? Sign in</Link>
                </Container>

                <hr className="my-4" />

                <Button
                  size="md"
                  className="w-100 mb-2"
                  style={{ backgroundColor: "#dd4b39", border: "none" }}
                  type="button"
                >
                  <i className="fab fa-google me-2"></i> Sign in with Google
                </Button>

                <Button
                  size="md"
                  className="w-100"
                  style={{ backgroundColor: "#3b5998", border: "none" }}
                  type="button"
                >
                  <i className="fab fa-facebook-f me-2"></i> Sign in with
                  Facebook
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginComponent;
