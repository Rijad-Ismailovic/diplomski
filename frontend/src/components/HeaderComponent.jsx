import React, { useEffect } from "react";

import backgroundImage from "../assets/homepage/2.jpg";
import SearchComponent from "./SearchComponent";
import { Container, Row, Col } from "react-bootstrap";
import { useLocation } from "react-router";


export default function HeaderComponent() {
  let location = useLocation();
  console.log(location.pathname)

  return (
    <header
      className="py-5 d-flex align-content-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Container className={location.pathname !== "/search" ? "my-5" : ""}>
        <Container className="mx-0 text-center text-white flex ">
          {location.pathname != "/search" && (
            <h1
              className="display-4 fw-bolder"
              style={{
                textShadow: "0 0 10px rgba(0, 0, 0, 1)",
              }}
            >
              Global
            </h1>
          )}
        </Container> 
        <Container className={location.pathname !== "/search" ? "mx-0 mt-5" : "mx-0"}>
          <Row className="d-flex justify-content-center align-items-center">
            <Col xs={9}>
              <SearchComponent />
            </Col>
          </Row>
        </Container>
      </Container>
    </header>
  );
}
