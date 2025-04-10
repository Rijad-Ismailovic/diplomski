import React from "react";
import { Container, Image } from "react-bootstrap";

function BannerSearchComponent() {
  return (
    <Container fluid className="px-0 mb-3">
      <Image
        // src="https://idsb.tmgrup.com.tr/ly/uploads/images/2022/10/27/238116.jpg"
        src="/images/locations/sarajevo.jpg" //https://drive.google.com/uc?export=view&id=FILE_ID
        className="w-100 object-fit-cover"
        style={{
          height: "100px",
          objectFit: "cover",
        }}
        alt="Banner"
      />
    </Container>
  );
}

export default BannerSearchComponent;
