import React from "react";

import bannerImage from "../assets/homepage/satisfied_customers/dino2_cropped.jpg";
import { Container, Image } from "react-bootstrap";

function BannerSearchComponent() {
  return (
    <Container className="px-0">
      <Image
        src="https://idsb.tmgrup.com.tr/ly/uploads/images/2022/10/27/238116.jpg"
        className="mb-3  w-100 object-fit-cover"
        style={{ height: "100px" }}
      ></Image>
    </Container>
  );
}

export default BannerSearchComponent;
