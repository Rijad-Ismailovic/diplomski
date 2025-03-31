import React from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";

function ContactUsComponent() {
  return (
    <Container fluid className="text-center bg-dark text-white py-5">
      <h3 className="mb-3">Contact Us</h3>
      <p className="mb-4">
        For any questions about our services, please contact us and we will get
        back to you as soon as possible.
      </p>
      <Form>
        <Row className="justify-content-center">
          <Col xs={12} md={10} lg={8}>
            {/* Message Textarea */}
            <Form.Group className="mb-4 text-start">
              <Form.Label>Your Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                placeholder="Ask us any of your questions"
                className="bg-light"
              />
            </Form.Group>

            {/* Email, Name, and Submit Button */}
            <Row className="g-3">
              <Col xs={12} sm={6} md={5}>
                <Form.Control
                  type="email"
                  placeholder="name@example.com"
                  className="bg-light"
                />
              </Col>
              <Col xs={12} sm={6} md={5}>
                <Form.Control
                  type="text"
                  placeholder="FirstName LastName"
                  className="bg-light"
                />
              </Col>
              <Col xs={12} md={2}>
                <Button variant="primary" type="submit" className="w-100">
                  Submit
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default ContactUsComponent;
