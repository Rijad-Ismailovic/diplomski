import { Card, Form, Button, Row, Col, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../services/UserService";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import PasswordStrengthBar from "react-password-strength-bar";
import { validateRegistrationForm } from "../utils/validation";
import {
  CitySelect,
  CountrySelect,
  StateSelect,
  LanguageSelect,
  RegionSelect,
  PhonecodeSelect,
} from "react-country-state-city";

function RegisterComponent() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [formErrors, setFormErrors] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    const payload = {
      fullName: fullName,
      email: email,
      username: username,
      password: password,
    };
    const { isValid, errors } = validateRegistrationForm(
      fullName,
      email,
      username,
      password
    );
    setFormErrors(errors);
    if (isValid) {
      register(payload)
        .then((response) => {
          navigate("/login");
          toast.success("Succesfully registered");
        })
        .catch((error) => {
          toast.error(error.response.data);
        });
    }
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
              <h3 className="mb-4 text-center">Register</h3>

              <Form>
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    size="md"
                    placeholder="Enter Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                  {formErrors.fullName && (
                    <Form.Text className="text-danger">
                      {formErrors.fullName}
                    </Form.Text>
                  )}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    size="md"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {formErrors.email && (
                    <Form.Text className="text-danger">
                      {formErrors.email}
                    </Form.Text>
                  )}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    size="md"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  {formErrors.username && (
                    <Form.Text className="text-danger">
                      {formErrors.username}
                    </Form.Text>
                  )}
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
                  {formErrors.password && (
                    <Form.Text className="text-danger">
                      {formErrors.password}
                    </Form.Text>
                  )}
                  <PasswordStrengthBar password={password} />
                </Form.Group>

                <Button
                  variant="primary"
                  size="md"
                  className="w-100 mb-3 mt-3"
                  type="submit"
                  onClick={handleSubmit}
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
