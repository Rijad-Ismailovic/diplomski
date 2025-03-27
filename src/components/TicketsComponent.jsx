import React from "react";
import {
  Container,
  Col,
  Row,
  Image,
  Card,
  Button,
  CardBody,
  Stack,
} from "react-bootstrap";
import { Link } from "react-router-dom";

function TicketsComponent() {
  const data = [
    {
      title: "Mostar",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/d/d7/Mostar_Old_Town_Panorama_2007.jpg",
    },
    {
      title: "Mostar",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/d/d7/Mostar_Old_Town_Panorama_2007.jpg",
    },
  ];

  function createCard(ticket, index) {
    return (
      <Container key={index} className="mb-3 px-0 bg-light">
        <Card className="shadow-sm position-relative">
          <CardBody className="d-flex align-items-start gap-3 bg-light">
            <Col
              xs={2}
              style={{ width: "80px", height: "80px" }}
              className="px-0 rounded overflow-hidden"
            >
              <Image
                src={ticket.image}
                fluid
                className="w-100 h-100 object-fit-cover"
                style={{ filter: "blur(0.3px)" }}
              />
            </Col>

            <Col className="flex-grow-1 d-flex flex-column justify-content-between">
              <Card.Title className="mb-2 fs-6">
                Sarajevo <span className="text-primary">&rarr;</span>{" "}
                {ticket.title}
              </Card.Title>
              <Row className="px-0 small text-muted mt-2">
                <p className="mb-0">2hr 30min</p>
                <p className="mb-0">10:00 - 12:30</p>
              </Row>
            </Col>

            <Col className="d-flex flex-column align-items-end mt-auto">
              <p className="mb-1 fw-bold">35 KM</p>
              <Button variant="primary" size="sm" href="/buy/mostar">
                View
              </Button>
            </Col>
          </CardBody>
        </Card>
      </Container>
    );
  }

  return (
    <Container>
      {data.map((ticket, index) => createCard(ticket, index))}
    </Container>
  );
}

export default TicketsComponent;
