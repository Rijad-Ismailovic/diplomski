import React from "react";
import { Card, Form, Button, Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function RegisterComponent() {
  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center min-vh-100"
    >
      <Row className="w-100 justify-content-center">
        <Col xs={10} sm={8} md={6} lg={3}>
          <Card className="p-4 shadow">
            <Card.Body>
              <h3 className="mb-4 text-center">Register</h3>

              <Form>
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    size="md"
                    placeholder="Enter full name"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    size="md"
                    placeholder="Enter email"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    size="md"
                    placeholder="Password"
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
                >
                  Register
                </Button>

                <Container className="text-center">
                  <Link to={"/login"} className="w-100 text-center">
                    Already have an account? Log in
                  </Link>
                </Container>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default RegisterComponent;
