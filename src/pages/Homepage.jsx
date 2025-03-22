import React from "react";
import HeaderComponent from "../components/HeaderComponent";
import SearchComponent from "../components/SearchComponent";
import PopularDestinationsComponent from "../components/PopularDestinationsComponent";
import ExploreCountry from "../components/ExploreCountry";
import NavbarComponent from "../components/NavbarComponent";

function Homepage() {
  return (
    <div>
      <NavbarComponent />
      <HeaderComponent />
      <div style={{ paddingLeft: "200px", paddingRight: "200px" }}>
        <PopularDestinationsComponent />
        <ExploreCountry />
      </div>
    </div>
  );
}

export default Homepage;
