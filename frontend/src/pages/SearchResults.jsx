import React, { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

import HeaderComponent from "../components/HeaderComponent";
import NavbarComponent from "../components/NavbarComponent";
import TicketsComponent from "../components/TicketsComponent";
import FilterComponent from "../components/FilterComponent";
import BannerSearchComponent from "../components/BannerSearchComponent";
import { getAllTrips, search } from "../services/TripService";

function SearchResults() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    const departure = searchParams.get("departure") || "";
    const arrival = searchParams.get("arrival") || "";
    const departureDate = searchParams.get("departureDate") || "";
    const returnDate = searchParams.get("returnDate") || "";
    const wifi = searchParams.get("wifi") || "";
    const restroom = searchParams.get("restroom") || "";
    const ac = searchParams.get("ac") || "";
    const outlet = searchParams.get("outlet") || "";
    const reclining = searchParams.get("reclining") || "";
    const maxPrice = searchParams.get("maxPrice") || "";
    const maxDuration = searchParams.get("maxDuration") || "";

    const hasQuery =
      departure ||
      arrival ||
      departureDate ||
      returnDate ||
      wifi ||
      restroom ||
      ac ||
      outlet ||
      reclining ||
      maxPrice ||
      maxDuration;

    if (hasQuery) {
      search(
        departure,
        arrival,
        departureDate,
        returnDate,
        wifi,
        restroom,
        ac,
        outlet,
        reclining,
        maxPrice,
        maxDuration
      )
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => console.error(error));
    } else {
      getAllTrips()
        .then((response) => setData(response.data))
        .catch((error) => console.error(error));
    }
  }, [location.search]);

  return (
    <Container fluid className="px-0">
      <NavbarComponent />
      <HeaderComponent />

      <Container
        className="py-2 px-3 px-sm-5"
        style={{
          maxWidth: "1000px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <Row className="mt-4 gx-4">
          <Col xs={12} lg={4} className="mb-4 mb-lg-0">
            <FilterComponent numOfProducts={data.length} />
          </Col>
          <Col xs={12} lg={8} className="px-0">
            <TicketsComponent data={data} />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default SearchResults;
