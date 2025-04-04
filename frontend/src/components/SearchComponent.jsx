import React, { useState } from "react";
import { Container, Form, Button, Row, Col, Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function SearchComponent() {
  const bosnianCities = [
    "Sarajevo",
    "Banja Luka",
    "Tuzla",
    "Zenica",
    "Mostar",
    "Bihać",
    "Brčko",
    "Prijedor",
    "Doboj",
    "Bijeljina",
    "Trebinje",
    "Travnik",
    "Cazin",
    "Gradačac",
    "Goražde",
    "Zvornik",
  ];


  const navigator = useNavigate();

  const [departureLocation, setDepartureLocation] = useState("");
  const [arrivalLocation, setArrivalLocation] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  function handleSearch(e) {
    e.preventDefault();
    
    const params = new URLSearchParams()

    if (departureLocation) params.append("departure", departureLocation)
    if (arrivalLocation) params.append("arrival", arrivalLocation)
    if (departureDate) params.append("departureDate", departureDate)
    if (returnDate) params.append("returnDate", returnDate)
    navigator(
      `/search?${params.toString()}`
    );
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
                {bosnianCities.map((city) => (
                  <Dropdown.Item key={city} eventKey={city}>
                    {city}
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
                {bosnianCities.map((city) => (
                  <Dropdown.Item key={city} eventKey={city}>
                    {city}
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
              onChange={(e) => setDepartureDate(e.target.value)}
            />
          </Col>

          <Col xs={12} sm={6} md={2}>
            <Form.Label>Return date</Form.Label>
            <Form.Control
              type="date"
              className="border border-dark bg-white text-dark"
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
