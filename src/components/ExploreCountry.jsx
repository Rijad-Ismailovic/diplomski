import React from "react";
import { Container, Image as RBImage} from "react-bootstrap";

function ExploreCountry() {
  const currentCountry = "Bosnia and Hercegovina";
  const data = [
    {
      title: "Počitelj",
      image: "https://bosniatravel.ba/wp-content/uploads/2018/08/pocitelj1.jpg",
    },

    {
      title: "Kušlat",
      image:
        "https://muftijstvotz.ba/new/wp-content/uploads/2023/01/KuslatdzamijaZvornik_1_WEB.jpg",
    },
    {
      title: "Tešanj",
      image:
        "https://stari-grad.ba/wp-content/uploads/2019/04/gradina540x540_03.jpg",
    },
    {
      title: "Vranduk",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/e/ed/Vranduk%2C_nadvori_hradu.jpg",
    },
    {
      title: "Blidinje",
      image:
        "https://putnikofer.hr/wp-content/uploads/2024/03/park-prirode-blidinje-hajducka-vrata.jpg",
    },
    {
      title: "Vrelo Bune",
      image: "https://bosniatravel.ba/wp-content/uploads/2018/08/buna1.jpg",
    },
    {
      title: "Vodopad Kravice",
      image: "https://kravica.ba/wp-content/uploads/Kravica-15.jpg",
    },
    {
      title: "Kastel",
      image: "https://banjaluka.city/v2/images/explore/kastel-fortress-08.jpg",
    },
    {
      title: "Fortica",
      image:
        "https://static.hercegovina.info/img/repository/2024/06/image_1024x1024/fortica.jpg",
    },
    {
      title: "Mostar",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/d/d7/Mostar_Old_Town_Panorama_2007.jpg",
    },
  ];

  function createCard(location, index) {
    return (
      <Container
        className="px-0 overflow-hidden text-center flex-shrink-0 "
        style={{ width: "150px" }}
        key={index}
      >
        <Container className="px-0" style={{ height: "150px" }}>
          <RBImage
            className="w-100 h-100 object-fit-cover rounded border"
            src={location.image}
            style={{
              filter: "blur(0.3px)",
            }}
          />
        </Container>
        <Container className="px-0 mt-1">
          <p className="mb-0 fw-bold">{location.title}</p>
          <p className="text-muted fw-light small">10km away from Sarajevo</p>
        </Container>
      </Container>
    );
  }

  return (
    <Container className="py-2">
      <h4 className="mb-3">Explore {currentCountry}</h4>
      <Container
        className="px-0 d-flex justify-content-start gap-3 flex-nowrap overflow-scroll"
        style={{
          WebkitOverflowScrolling: "touch",
          scrollBehavior: "smooth",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {data.map((location, index) => createCard(location, index))}
      </Container>
    </Container>
  );
}

export default ExploreCountry;
