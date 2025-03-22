import React, { useEffect, useState } from "react";
import HeaderComponent from "../components/HeaderComponent";
import { useSearchParams } from "react-router-dom";
import NavbarComponent from "../components/NavbarComponent";
import TicketsComponent from "../components/TicketsComponent";

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
    <div>
      <NavbarComponent />
      <HeaderComponent />
      <TicketsComponent />
    </div>
  );
}

export default SearchResults;
