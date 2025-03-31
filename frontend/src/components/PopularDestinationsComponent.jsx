import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";

function PopularDestinationsComponent() {
  const data = [
    {
      title: "Belgrade",
      image:
        "https://idsb.tmgrup.com.tr/ly/uploads/images/2022/10/27/238116.jpg",
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
      <Container
        className="px-0 position-relative overflow-hidden rounded"
        style={{ height: "200px" }}
      >
        <Image src={city.image} className="w-100 h-100 object-fit-cover" />
        <p
          className="position-absolute top-0 start-0 text-white fw-bold fs-4 p-4"
          style={{
            textShadow: "0 0 10px rgba(0, 0, 0, 0.7)",
          }}
        >
          {city.title}
        </p>
      </Container>
    );
  }

  return (
    <Container>
      <h4 className="mb-3">Popular Destinations</h4>
      <Row className="mb-2 gx-2">
        <Col xs={6}>{createCard(data[0])}</Col>
        <Col xs={6}>{createCard(data[1])}</Col>
      </Row>
      <Row className="gx-2">
        <Col xs={4}>{createCard(data[2])}</Col>
        <Col xs={4}>{createCard(data[3])}</Col>
        <Col xs={4}>{createCard(data[4])}</Col>
      </Row>
    </Container>
  );
}

export default PopularDestinationsComponent;
