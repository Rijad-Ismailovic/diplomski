import React, { useState } from "react";
import {
  Container,
  Form,
  Button,
  Row,
  Col,
  Dropdown,
  DropdownMenu,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function SearchComponent() {
  const europeanCities = [
    "London",
    "Berlin",
    "Madrid",
    "Rome",
    "Paris",
    "Vienna",
    "Amsterdam",
    "Brussels",
    "Lisbon",
    "Stockholm",
    "Oslo",
    "Copenhagen",
    "Helsinki",
    "Dublin",
    "Warsaw",
    "Prague",
    "Budapest",
    "Bucharest",
    "Athens",
    "Belgrade",
    "Zagreb",
    "Ljubljana",
    "Bratislava",
    "Sofia",
    "Tallinn",
    "Riga",
    "Vilnius",
    "Luxembourg",
    "Reykjavik",
    "Sarajevo",
    "Skopje",
    "Podgorica",
    "Tirana",
    "Valletta",
    "Chisinau",
    "Monaco",
    "San Marino",
    "Andorra la Vella",
    "Vatican City",
    "Hamburg",
    "Munich",
    "Cologne",
    "Frankfurt",
    "Stuttgart",
    "Dusseldorf",
    "Barcelona",
    "Valencia",
    "Seville",
    "Milan",
    "Naples",
    "Turin",
    "Lyon",
    "Marseille",
    "Bordeaux",
    "Nice",
    "Rotterdam",
    "The Hague",
    "Antwerp",
    "Ghent",
    "Geneva",
    "Zurich",
    "Basel",
    "Krakow",
    "Gdansk",
    "Wroclaw",
    "Lodz",
    "Poznan",
    "Cluj-Napoca",
    "Timisoara",
    "Constanta",
    "Thessaloniki",
    "Patras",
    "Birmingham",
    "Manchester",
    "Glasgow",
    "Edinburgh",
    "Leeds",
    "Sheffield",
    "Liverpool",
    "Brno",
    "Ostrava",
    "Kosice",
    "Debrecen",
    "Graz",
    "Salzburg",
    "Innsbruck",
    "Malmo",
    "Gothenburg",
    "Uppsala",
    "Aarhus",
    "Odense",
    "Bergen",
    "Trondheim",
    "Tampere",
    "Turku",
    "Kaunas",
    "Tartu",
    "Split",
    "Dubrovnik",
    "Kotor",
    "Mostar",
    "Novi Sad",
    "Lviv",
    "Odessa",
    "Dnipro",
    "Kharkiv",
    "Istanbul",
    "Izmir",
    "Ankara",
  ];

  const navigator = useNavigate();

  const [departureLocation, setDepartureLocation] = useState("");
  const [arrivalLocation, setArrivalLocation] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  function handleSearch(e) {
    e.preventDefault();
    console.log(departureLocation, arrivalLocation, departureDate, returnDate);
    navigator(
      `/results?departure=${departureLocation}&arival=${arrivalLocation}&date=${departureDate}`
    );
  }

  return (
    <Container className="bg-white shadow p-3 pt-2 rounded">
      <Form>
        <Row>
          <Col xs={3} className="flex flex-row ">
            <Form.Label>Departure location</Form.Label>
            <Dropdown
              onSelect={(selectedKey) => setDepartureLocation(selectedKey)}
            >
              <Dropdown.Toggle variant="outline-dark" className="w-100">
                {departureLocation || "Select a city"}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {europeanCities.map((city) => (
                  <Dropdown.Item key={city} eventKey={city}>
                    {city}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col xs={3}>
            <Form.Label>Departure location</Form.Label>
            <Dropdown
              onSelect={(selectedKey) => setArrivalLocation(selectedKey)}
            >
              <Dropdown.Toggle variant="outline-dark" className="w-100">
                {arrivalLocation || "Select a city"}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {europeanCities.map((city) => (
                  <Dropdown.Item key={city} eventKey={city}>
                    {city}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col xs={2}>
            <Form.Label>Departure date</Form.Label>
            <Form.Control
              type="date"
              className="border border-dark bg-white text-dark"
              onChange={(e) => setDepartureDate(e.target.value)}
            />
          </Col>
          <Col xs={2}>
            <Form.Label>Arrival date</Form.Label>{" "}
            <Form.Control
              type="date"
              className="border border-dark bg-white text-dark"
              onChange={(e) => setReturnDate(e.target.value)}
            />
          </Col>
          <Col xs={2} className="d-flex flex-column">
            <Button
              variant="primary"
              className="mt-auto"
              onClick={(e) => handleSearch(e)}
            >
              Search Tickets
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default SearchComponent;
