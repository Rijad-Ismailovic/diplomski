import { useEffect, useState } from "react";
import { Button, Modal, Row, Col } from "react-bootstrap";
import { mapToHHMM } from "../utils/timeUtils";
import { getStopsByTripId } from "../services/StopServices";

function TicketModal({ tripInfo }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let comodities = [];
  if (tripInfo.hasWifi) comodities.push("Wi-Fi");
  if (tripInfo.hasRestroom) comodities.push("Restroom");
  if (tripInfo.hasAc) comodities.push("A&C");
  if (tripInfo.hasOutlet) comodities.push("Power Outlet");
  if (tripInfo.hasReclining) comodities.push("Reclining Seats");
  const comoditiesText = comodities.join(", ");

  const [stops, setStops] = useState([]);

  useEffect(() => {
    getStopsByTripId(tripInfo.id)
      .then((response) => {
        setStops(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <Button variant="primary" size="sm" onClick={handleShow}>
        View
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {tripInfo.departureLocation.name}{" "}
            <span className="text-primary">&rarr;</span>{" "}
            {tripInfo.arrivalLocation.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="mb-2">
            <Col>
              <strong>Departure:</strong>
            </Col>
            <Col className="text-end">
              {tripInfo.departureTime.substr(0, 5)}
            </Col>
          </Row>
          <Row className="mb-2">
            <Col>
              <strong>Arrival:</strong>
            </Col>
            <Col className="text-end">{tripInfo.arrivalTime.substr(0, 5)}</Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <strong>Duration:</strong>
            </Col>
            <Col className="text-end">
              {mapToHHMM(tripInfo.durationMinutes)}
            </Col>
          </Row>

          <div className="mb-3 px-2">
            <h6 className="text-muted mb-2">Stops Along the Route</h6>
            {stops.map((stop, index) => (
              <Row key={index} className="align-items-center">
                <Col xs={1} className="d-flex flex-column align-items-center">
                  <div
                    className={
                      stop.type === "DEPARTURE"
                        ? "bg-success"
                        : stop.type === "ARRIVAL"
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
                  {stop.locationId.name}
                  {stop.type === "departure" && (
                    <span className="text-success ms-1">(Departure)</span>
                  )}
                  {stop.type === "arrival" && (
                    <span className="text-danger ms-1">(Arrival)</span>
                  )}
                </Col>
                <Col xs={5} className="text-end text-muted small">
                  {stop.time.substr(0, 5)}
                </Col>
              </Row>
            ))}
          </div>

          <hr />

          <Row className="mb-2">
            <Col>
              <strong>Commodities:</strong>
            </Col>
            <Col className="text-end">{comoditiesText}</Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <strong>Price:</strong>
            </Col>
            <Col className="text-end text-success fw-bold">
              {tripInfo.price} KM
            </Col>
          </Row>

          {tripInfo.notes && (
            <p className="text-muted small">{tripInfo.notes}</p>
          )}
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
