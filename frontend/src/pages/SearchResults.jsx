import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

import HeaderComponent from "../components/HeaderComponent";
import NavbarComponent from "../components/NavbarComponent";
import TicketsComponent from "../components/TicketsComponent";
import FilterComponent from "../components/FilterComponent";
import BannerSearchComponent from "../components/BannerSearchComponent";

function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = {
    departure: searchParams.get("departure") || "",
    arrival: searchParams.get("arrival") || "",
    departureDate: searchParams.get("departureDate") || "",
    returnDate: searchParams.get("returnDate") || "",
  };

  return (
    <Container fluid className="px-0">
      <NavbarComponent />
      <HeaderComponent />

      <Container
        className="py-5 px-3 px-sm-5"
        style={{
          maxWidth: "1000px", 
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <BannerSearchComponent />

        <Row className="mt-4 gx-4">
          <Col xs={12} lg={4} className="mb-4 mb-lg-0">
            <FilterComponent />
          </Col>
          <Col xs={12} lg={8} className="px-0">
            <TicketsComponent query={query} />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default SearchResults;
