import React, { useState } from "react";
import { Container, Form, Row, Col } from "react-bootstrap";

function FilterComponent() {
  const [price, setPrice] = useState(150);
  const [duration, setDuration] = useState(3);
  const [features, setFeatures] = useState({
    wifi: false,
    restroom: false,
    ac: false,
    power: false,
    reclining: false,
  });

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFeatures((prev) => ({ ...prev, [name]: checked }));
  };

  return (
    <Container className="bg-light p-3 rounded shadow-sm border">
      <h5 className="mb-3">Filter Results</h5>

      <Form.Group className="mb-4">
        <Form.Label>Max Price: {price} KM</Form.Label>
        <Form.Range
          min={0}
          max={300} 
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <Row className="px-1">
          <Col className="text-start">0 KM</Col>
          <Col className="text-end">100 KM</Col>
        </Row>
      </Form.Group>

      <Form.Group className="mb-4">
        <Form.Label>Max Duration: {duration} hrs</Form.Label>
        <Form.Range
          min={1}
          max={24}
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
        <Row className="px-1">
          <Col className="text-start">1 hr</Col>
          <Col className="text-end">24 hrs</Col>
        </Row>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Check
          type="checkbox"
          label="WiFi"
          name="wifi"
          checked={features.wifi}
          onChange={handleCheckboxChange}
        />
        <Form.Check
          type="checkbox"
          label="Restroom"
          name="restroom"
          checked={features.restroom}
          onChange={handleCheckboxChange}
        />
        <Form.Check
          type="checkbox"
          label="Air Conditioning"
          name="ac"
          checked={features.ac}
          onChange={handleCheckboxChange}
        />
        <Form.Check
          type="checkbox"
          label="Power Outlets"
          name="power"
          checked={features.power}
          onChange={handleCheckboxChange}
        />
        <Form.Check
          type="checkbox"
          label="Reclining Seats"
          name="reclining"
          checked={features.reclining}
          onChange={handleCheckboxChange}
        />
      </Form.Group>
    </Container>
  );
}

export default FilterComponent;
