import React, { useState } from "react";
import {
  Container,
  Col,
  Row,
  Image,
  Card,
  CardBody,
  Form,
  Button,
  Modal,
} from "react-bootstrap";
import TicketModal from "./TicketModal";
import { reviewTicket } from "../services/TicketService";
import toast from "react-hot-toast";

function FinishedTickets({ data }) {
  const [departureFilter, setDepartureFilter] = useState("");
  const [arrivalFilter, setArrivalFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  // Review modal state
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);

  // --- Filtering logic ---
  const filteredTickets = data.filter(
    (ticket) =>
      ticket.status === "finished" &&
      (departureFilter
        ? ticket.departureLocation.name
            .toLowerCase()
            .includes(departureFilter.toLowerCase())
        : true) &&
      (arrivalFilter
        ? ticket.arrivalLocation.name
            .toLowerCase()
            .includes(arrivalFilter.toLowerCase())
        : true) &&
      (dateFilter ? ticket.departureDate === dateFilter : true)
  );

  const handleLeaveReview = async () => {
    if (!selectedTicket) return;
    try {
      await reviewTicket(selectedTicket.id, {
        rating,
        comment: reviewText,
      });
      toast.success("Review submitted successfully!");
      setShowReviewModal(false);
      setSelectedTicket(null);
      setReviewText("");
      setRating(0);
    } catch (error) {
      toast.error("Failed to submit review");
    }
  };

  function createCard(trip, index) {
    return (
      <Container key={index} className="mb-3 px-0 bg-light">
        <Card className="shadow-sm position-relative">
          <CardBody className="d-flex align-items-start gap-3 bg-light">
            {/* Thumbnail */}
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

            {/* Route + Date */}
            <Col className="flex-grow-1 d-flex flex-column justify-content-between">
              <Card.Title className="mb-2 fs-6">
                {trip.departureLocation.name}{" "}
                <span className="text-primary">&rarr;</span>{" "}
                {trip.arrivalLocation.name}
              </Card.Title>
              <Row className="px-0 small text-muted mt-2">
                <p className="mb-0">{trip.departureDate}</p>
                <p className="mb-0">
                  {trip.departureTime.substring(0, 5)} -{" "}
                  {trip.arrivalTime.substring(0, 5)}
                </p>
              </Row>
            </Col>

            {/* Price + Action */}
            <Col className="d-flex flex-column align-items-end mt-auto">
              <p className="mb-1 fw-bold">{trip.price} KM</p>
              <div className="d-flex gap-2">
                <TicketModal tripInfo={trip} />
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    setSelectedTicket(trip);
                    setShowReviewModal(true);
                  }}
                >
                  Leave a Review
                </Button>
              </div>
            </Col>
          </CardBody>
          <Card.Footer className="small text-muted d-flex justify-content-between">
            <span>Driver: {trip.fullName}</span>
            <span>
              {trip.distanceKm} km • {trip.durationMinutes} min
            </span>
          </Card.Footer>
        </Card>
      </Container>
    );
  }

  return (
    <Container className="mt-3">
      {/* Header */}
      <h2 className="fw-bold mb-2 d-flex align-items-start">
        Finished Tickets
      </h2>

      {/* Filters */}
      <Card className="mb-4 shadow-sm">
        <CardBody>
          <Row className="g-2">
            <Col xs={12} md={4}>
              <Form.Control
                type="text"
                placeholder="Filter by Departure"
                value={departureFilter}
                onChange={(e) => setDepartureFilter(e.target.value)}
              />
            </Col>
            <Col xs={12} md={4}>
              <Form.Control
                type="text"
                placeholder="Filter by Arrival"
                value={arrivalFilter}
                onChange={(e) => setArrivalFilter(e.target.value)}
              />
            </Col>
            <Col xs={12} md={3}>
              <Form.Control
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              />
            </Col>
            <Col xs={12} md={1}>
              <Button
                variant="secondary"
                className="w-100"
                onClick={() => {
                  setDepartureFilter("");
                  setArrivalFilter("");
                  setDateFilter("");
                }}
              >
                Reset
              </Button>
            </Col>
          </Row>
        </CardBody>
      </Card>

      {/* Tickets */}
      {filteredTickets.length > 0 ? (
        filteredTickets.map((ticket, index) => createCard(ticket, index))
      ) : (
        <p className="text-muted text-center">No finished tickets found.</p>
      )}

      {/* Review Modal */}
      <Modal
        show={showReviewModal}
        onHide={() => setShowReviewModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Leave a Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedTicket && (
            <>
              <p>
                {selectedTicket.departureLocation.name} →{" "}
                {selectedTicket.arrivalLocation.name} <br />
                {selectedTicket.departureDate} | Driver:{" "}
                {selectedTicket.fullName}
              </p>
              <Form.Group className="mb-3">
                <Form.Label>Your Review</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Rating</Form.Label>
                <div>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      style={{
                        cursor: "pointer",
                        fontSize: "1.5rem",
                        color: star <= rating ? "#ffc107" : "#e4e5e9",
                      }}
                      onClick={() => setRating(star)}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </Form.Group>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowReviewModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleLeaveReview}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default FinishedTickets;
