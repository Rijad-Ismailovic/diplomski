import React from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";

function ContacUsComponent() {
  return (
    <Container fluid className="text-center bg-dark">
      <h3 className="pt-4 text-white">Contact us</h3>
      <p className="text-white">
        For any questions about our services, please contatct us and we will get
        back to you.
      </p>
      <Form>
        <Row className="justify-content-center">
          <Col lg={8}>
            <Row>
              <Form.Group className="mb-3">
                <Form.Label>Your Message</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  placeholder="Ask us any of your questions"
                ></Form.Control>
              </Form.Group>
            </Row>
            <Row className="p t-0">
              <Col xl={5}>
                <Form.Group>
                  <Form.Control type="email" placeholder="name@example.com" />
                </Form.Group>
              </Col>
              <Col xl={5}>
                <Form.Group>
                  <Form.Control type="text" placeholder="FirstName LastName" />
                </Form.Group>
              </Col>
              <Col xl={2}>
                <Button className="w-100">Submit</Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default ContacUsComponent;
