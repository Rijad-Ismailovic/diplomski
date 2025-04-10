import React from "react";

import { Container, Col, Row, Image, Card, CardBody } from "react-bootstrap";
import TicketModal from "./TicketModal";

function TicketsComponent({ data }) {
  function createCard(trip, index) {
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
                src={trip.arrivalLocation.imagePath}
                fluid
                className="w-100 h-100 object-fit-cover"
                style={{ filter: "blur(0.3px)" }}
              />
            </Col>

            <Col className="flex-grow-1 d-flex flex-column justify-content-between">
              <Card.Title className="mb-2 fs-6">
                {trip.departureLocation.name}{" "}
                <span className="text-primary">&rarr;</span>{" "}
                {trip.arrivalLocation.name}
              </Card.Title>
              <Row className="px-0 small text-muted mt-2">
                {/* <p className="mb-0">{mapToHHMM(trip.durationMinutes)}</p> */}
                <p className="mb-0">{trip.departureDate}</p>
                <p className="mb-0">
                  {trip.departureTime.substring(0, 5)} -{" "}
                  {trip.arrivalTime.substring(0, 5)}
                </p>
              </Row>
            </Col>

            <Col className="d-flex flex-column align-items-end mt-auto">
              <p className="mb-1 fw-bold">{trip.price} KM</p>
              <TicketModal tripInfo={trip} />
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
