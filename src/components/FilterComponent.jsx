import React from "react";
import { Container, Form } from "react-bootstrap";

function FilterComponent() {
  return (
    <Container className="bg-dark text-white">
          <Form>
              <Form.Label className="mb-0">Price</Form.Label>
              <Form.Range/> 
      </Form>
    </Container>
  );
}

export default FilterComponent;
