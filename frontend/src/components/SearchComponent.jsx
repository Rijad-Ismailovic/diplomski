import React, { useEffect, useState } from "react";
import { Container, Form, Button, Row, Col, Dropdown } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getAllLocations } from "../services/LocationService";

function SearchComponent() {
  const navigator = useNavigate();
  const [searchParams] = useSearchParams();
  const [locations, setLocations] = useState([]);

  const [departureLocation, setDepartureLocation] = useState(
    searchParams.get("departure") || ""
  );
  const [arrivalLocation, setArrivalLocation] = useState(
    searchParams.get("arrival") || ""
  );
  const [departureDate, setDepartureDate] = useState(
    searchParams.get("departureDate") || ""
  );
  const [returnDate, setReturnDate] = useState(
    searchParams.get("returnDate") || ""
  );

  useEffect(() => {
    getAllLocations()
      .then((response) => {
        setLocations(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  function handleSearch(e) {
    e.preventDefault();

    const params = new URLSearchParams();

    if (departureLocation) params.append("departure", departureLocation);
    if (arrivalLocation) params.append("arrival", arrivalLocation);
    if (departureDate) params.append("departureDate", departureDate);
    if (returnDate) params.append("returnDate", returnDate);
    navigator(`/search?${params.toString()}`);
  }

  return (
    <Container className="bg-light shadow p-4 rounded">
      <Form onSubmit={handleSearch}>
        <Row className="g-3">
          <Col xs={12} sm={6} md={3}>
            <Form.Label>Departure location</Form.Label>
            <Dropdown
              onSelect={(selectedKey) => setDepartureLocation(selectedKey)}
            >
              <Dropdown.Toggle
                variant="outline-dark"
                className="w-100 text-start"
              >
                {departureLocation || "Select a city"}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item eventKey="">Select a city</Dropdown.Item>
                {locations.map((location) => (
                  <Dropdown.Item key={location.id} eventKey={location.name}>
                    {location.name}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Col>

          <Col xs={12} sm={6} md={3}>
            <Form.Label>Arrival location</Form.Label>
            <Dropdown
              onSelect={(selectedKey) => setArrivalLocation(selectedKey)}
            >
              <Dropdown.Toggle
                variant="outline-dark"
                className="w-100 text-start"
              >
                {arrivalLocation || "Select a city"}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item eventKey="">Select a city</Dropdown.Item>
                {locations.map((location) => (
                  <Dropdown.Item key={location.id} eventKey={location.name}>
                    {location.name}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Col>

          <Col xs={12} sm={6} md={2}>
            <Form.Label>Departure date</Form.Label>
            <Form.Control
              type="date"
              className="border border-dark bg-white text-dark"
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
            />
          </Col>

          <Col xs={12} sm={6} md={2}>
            <Form.Label>Return date</Form.Label>
            <Form.Control
              type="date"
              className="border border-dark bg-white text-dark"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
            />
          </Col>

          <Col xs={12} md={2} className="d-flex align-items-end">
            <Button variant="primary" type="submit" className="w-100">
              Search Tickets
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default SearchComponent;
