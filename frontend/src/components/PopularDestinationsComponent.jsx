import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function PopularDestinationsComponent() {
  const navigate = useNavigate();

  const data = [
    {
      title: "Belgrade",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9tGPDxnYhMp9U2GjEJkY2Lbs4dVaPQ2_-eQ&s",
    },
    {
      title: "Paris",
      image:
        "https://a.storyblok.com/f/239725/4096x2731/c3337fde3a/01_fr_par_hero_eiffeltower.png/m/3840x2560",
    },
    {
      title: "Počitelj",
      image: "https://bosniatravel.ba/wp-content/uploads/2018/08/pocitelj1.jpg",
    },
    {
      title: "Barcelona",
      image:
        "https://thetourguy.com/wp-content/uploads/2019/05/TTTS-Sagrada-Familia-feature-1440-675-1.jpg",
    },
    {
      title: "London",
      image:
        "https://images.prismic.io/bounce/Z070ipbqstJ97_Db_is-london-safe.jpg?auto=format%2Ccompress&ar=1%3A1&fit=crop",
    },
    {
      title: "Bucharest",
      image:
        "https://www.worldatlas.com/r/w1200/upload/83/dc/bc/untitled-design-359.jpg",
    },
  ];

  function createCard(city) {
    return (
      <div
        role="button"
        tabIndex={0}
        key={city.title}
        className="position-relative overflow-hidden rounded cursor-pointer"
        style={{ height: "200px" }} // 👈 restore fixed height
        onClick={() =>
          navigate(`/search?arrival=${encodeURIComponent(city.title)}`)
        }
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            navigate(`/search?arrival=${encodeURIComponent(city.title)}`);
          }
        }}
      >
        <Image src={city.image} className="w-100 h-100 object-fit-cover" />
        <p
          className="position-absolute top-0 start-0 text-white fw-bold fs-5 p-3"
          style={{ textShadow: "0 0 10px rgba(0,0,0,0.7)" }}
        >
          {city.title}
        </p>
      </div>
    );
  }

  return (
    <Container>
      <h4 className="mb-3">Popular Destinations</h4>

      {/* First row (2 cards) */}
      <Row className="mb-3 gx-2">
        <Col xs={12} md={6}>
          {createCard(data[0])}
        </Col>
        <Col xs={12} md={6}>
          {createCard(data[1])}
        </Col>
      </Row>

      {/* Second row (3 cards) */}
      <Row className="gx-2">
        <Col xs={12} sm={6} md={4}>
          {createCard(data[2])}
        </Col>
        <Col xs={12} sm={6} md={4}>
          {createCard(data[3])}
        </Col>
        <Col xs={12} sm={6} md={4}>
          {createCard(data[4])}
        </Col>
      </Row>
    </Container>
  );
}

export default PopularDestinationsComponent;
