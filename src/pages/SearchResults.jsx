import React, { useEffect, useState } from "react";
import HeaderComponent from "../components/HeaderComponent";
import { useSearchParams } from "react-router-dom";
import NavbarComponent from "../components/NavbarComponent";
import TicketsComponent from "../components/TicketsComponent";
import MapComponent from "../components/MapComponent"
import { Container } from "react-bootstrap";

function SearchResults() {
  const [searchParams] = useSearchParams();
  const [departureLocation, setDepartureLocation] = useState("");
  const [arrivalLocation, setArrivalLocation] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

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
      <Container className="col-5 py-5">
        {/* <MapComponent /> */}
        <TicketsComponent />
      </Container>
    </Container>
  );
}

export default SearchResults;
