import React from "react";
import HeaderComponent from "../components/HeaderComponent";
import SearchComponent from "../components/SearchComponent";
import PopularDestinationsComponent from "../components/PopularDestinationsComponent";
import ExploreCountry from "../components/ExploreCountry";
import NavbarComponent from "../components/NavbarComponent";
import { Container } from "react-bootstrap";

function Homepage() {
  return (
    <Container fluid className="px-0">
      <NavbarComponent />
      <HeaderComponent />

      <Container style={{ paddingLeft: "175px", paddingRight: "175px" }}> 
        <PopularDestinationsComponent />
        <ExploreCountry />
      </Container>
    </Container>
  );
}

export default Homepage;
