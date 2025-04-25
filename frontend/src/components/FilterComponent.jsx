import React, { useState } from "react";
import { Container, Form, Row, Col } from "react-bootstrap";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";

function FilterComponent({numOfProducts}) {
  const [price, setPrice] = useState(100);
  const [duration, setDuration] = useState(24);
  const [features, setFeatures] = useState({
    wifi: false,
    restroom: false,
    ac: false,
    outlet: false,
    reclining: false,
  });
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFeatures((prev) => ({ ...prev, [name]: checked }));

    const newParams = new URLSearchParams(searchParams.toString());
    if (checked) {
      newParams.set(name, checked.toString());
    } else {
      newParams.delete(name);
    }

    navigate(`/search?${newParams.toString()}`);
  };

  return (
    <Container className="bg-light p-3 rounded shadow-sm border">
      <Row>
        <Col lg={7}>
          <h5 className="mb-3">Filter Results</h5>
        </Col>
        <Col lg={5}>
          <p className="text-muted">{numOfProducts} results</p>
        </Col>
      </Row>

      <Form.Group className="mb-4">
        <Form.Label>Max Price: {price} KM</Form.Label>
        <Form.Range
          min={0}
          max={100}
          value={price}
          onChange={(e) => {
            setPrice(e.target.value);
            const newParams = new URLSearchParams(searchParams.toString());
            newParams.set("maxPrice", e.target.value);
            navigate(`/search?${newParams.toString()}`);
          }}
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
          onChange={(e) => {
            setDuration(e.target.value);
            const newParams = new URLSearchParams(searchParams.toString());
            newParams.set("maxDuration", e.target.value);
            navigate(`/search?${newParams.toString()}`);
          }}
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
          name="outlet"
          checked={features.outlet}
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
