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
import {
  cancelTicket,
  getTicketsByUserUsername,
} from "../services/TicketService";
import toast from "react-hot-toast";

function ActiveTickets({ data, user, setTickets }) {
  const [departureFilter, setDepartureFilter] = useState("");
  const [arrivalFilter, setArrivalFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);

  // --- Filtering logic ---
  const filteredTickets = data.filter(
    (ticket) =>
      ticket.status === "active" &&
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

  const handleCancelTicket = () => {
    if (!selectedTicket) return;
    cancelTicket(selectedTicket)
      .then(() => {
        toast.success("Ticket cancelled successfully");
        setShowCancelModal(false);
        setSelectedTicket(null);

        // ✅ Refetch tickets for this user
        getTicketsByUserUsername(user.username).then((res) =>
          setTickets(res.data)
        );
      })
      .catch(() => {
        toast.error("Failed to cancel ticket");
      });
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
                  variant="danger"
                  size="sm"
                  onClick={() => {
                    setSelectedTicket(trip.id);
                    setShowCancelModal(true);
                  }}
                >
                  Cancel
                </Button>
              </div>
            </Col>
          </CardBody>
          <Card.Footer className="small text-muted d-flex justify-content-between">
            <span>Driver: {trip.fullName}</span>
            <span>
              {trip.hasWifi && "📶 WiFi "}
              {trip.hasAc && "❄️ AC "}
              {trip.hasRestroom && "🚻 "}
              {trip.hasOutlet && "🔌 "}
              {trip.hasReclining && "💺"}
            </span>
          </Card.Footer>
        </Card>
      </Container>
    );
  }

  return (
    <Container className="mt-3">
      {/* Header */}
      <h2 className="fw-bold mb-2 d-flex align-items-start">Active Tickets</h2>

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
        <p className="text-muted text-center">No active tickets found.</p>
      )}

      {/* Cancel Confirmation Modal */}
      <Modal
        show={showCancelModal}
        onHide={() => setShowCancelModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Cancel Ticket</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to cancel this ticket?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCancelModal(false)}>
            Close
          </Button>
          <Button variant="danger" onClick={handleCancelTicket}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default ActiveTickets;
