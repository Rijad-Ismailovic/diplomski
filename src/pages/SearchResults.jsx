import React, { useEffect, useState } from "react";
import HeaderComponent from "../components/HeaderComponent";
import { useSearchParams } from "react-router-dom";
import NavbarComponent from "../components/NavbarComponent";
import TicketsComponent from "../components/TicketsComponent";
import MapComponent from "../components/MapComponent";
import { Container, Row, Col, Image } from "react-bootstrap";
import FilterComponent from "../components/FilterComponent";

import bannerImage from "../assets/homepage/satisfied_customers/idris_cropped.jpg"
import BannerSearchComponent from "../components/BannerSearchComponent";

function SearchResults() {
  const [searchParams] = useSearchParams();
  const [departureLocation, setDepartureLocation] = useState("");
  const [arrivalLocation, setArrivalLocation] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate  ] = useState("");

  useEffect(() => {
    setDepartureLocation(searchParams.get("departure") || "");
    setArrivalLocation(searchParams.get("arrival") || "");
    setDepartureDate(searchParams.get("date") || "");
    setReturnDate(searchParams.get("rdate") || "");
    console.log(departureLocation);
    console.log(arrivalLocation);
    console.log(departureDate);
    console.log(returnDate);
  }, [searchParams]);
  return (
    <Container fluid className="px-0">
      <NavbarComponent />
      <HeaderComponent />
      <Container
        className="col-7 py-5"
        style={{ marginLeft: "300px", marginRight: "300px" }}
      >
        {/* <MapComponent /> */}
        <BannerSearchComponent />
        <Row>
          <Col lg={4}>
            <FilterComponent />
          </Col>
          <Col lg={8} className="px-0">
            <TicketsComponent />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default SearchResults;
