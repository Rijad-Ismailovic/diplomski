import { useState } from "react";
import { Button, Modal, Row, Col } from "react-bootstrap";

function TicketModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const stops = [
    { name: "Sarajevo", time: "08:00 AM", type: "departure" },
    { name: "Ilidža", time: "08:20 AM" },
    { name: "Konjic", time: "09:30 AM" },
    { name: "Jablanica", time: "10:15 AM" },
    { name: "Mostar East", time: "11:10 AM" },
    { name: "Mostar", time: "11:15 AM", type: "arrival" },
  ];

  return (
    <>
      <Button variant="primary" size="sm" onClick={handleShow}>
        View
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            Sarajevo <span className="text-primary">&rarr;</span> Mostar
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="mb-2">
            <Col>
              <strong>Departure:</strong>
            </Col>
            <Col className="text-end">08:00 AM</Col>
          </Row>
          <Row className="mb-2">
            <Col>
              <strong>Arrival:</strong>
            </Col>
            <Col className="text-end">11:15 AM</Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <strong>Duration:</strong>
            </Col>
            <Col className="text-end">3h 15m</Col>
          </Row>

          <div className="mb-3 px-2">
            <h6 className="text-muted mb-2">Stops Along the Route</h6>
            {stops.map((stop, index) => (
              <Row key={index} className="align-items-center">
                <Col xs={1} className="d-flex flex-column align-items-center">
                  <div
                    className={
                      stop.type === "departure"
                        ? "bg-success"
                        : stop.type === "arrival"
                        ? "bg-danger"
                        : "bg-primary"
                    }
                    style={{
                      width: "10px",
                      height: "10px",
                      borderRadius: "50%",
                      zIndex: 1,
                    }}
                  ></div>
                  {index !== stops.length - 1 && (
                    <div
                      className="bg-secondary"
                      style={{ width: "2px", height: "25px" }}
                    ></div>
                  )}
                </Col>
                <Col xs={6}>
                  {stop.name}
                  {stop.type === "departure" && (
                    <span className="text-success ms-1">(Departure)</span>
                  )}
                  {stop.type === "arrival" && (
                    <span className="text-danger ms-1">(Arrival)</span>
                  )}
                </Col>
                <Col xs={5} className="text-end text-muted small">
                  {stop.time}
                </Col>
              </Row>
            ))}
          </div>

          <hr />

          <Row className="mb-2">
            <Col>
              <strong>Commodities:</strong>
            </Col>
            <Col className="text-end">Restoroom, A&C, Wi-Fi</Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <strong>Price:</strong>
            </Col>
            <Col className="text-end text-success fw-bold">€14.50</Col>
          </Row>

          <p className="text-muted small">
            Please arrive at the station at least 15 minutes before departure.
            Tickets are non-refundable.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={handleClose}>
            Buy
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default TicketModal;
