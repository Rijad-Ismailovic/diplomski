import React from "react";
import HeaderComponent from "../components/HeaderComponent";
import PopularDestinationsComponent from "../components/PopularDestinationsComponent";
import ExploreCountry from "../components/ExploreCountryComponent";
import NavbarComponent from "../components/NavbarComponent";
import { Container } from "react-bootstrap";
import ContacUsComponent from "../components/ContacUsComponent";

function Homepage() {
  return (
    <Container fluid className="px-0">
      <NavbarComponent />
      <HeaderComponent />

      <Container className="py-5" style={{ paddingLeft: "175px", paddingRight: "175px" }}> 
        <PopularDestinationsComponent />
        <ExploreCountry />
      </Container>
      <ContacUsComponent />
    </Container>
  );
}

export default Homepage;
