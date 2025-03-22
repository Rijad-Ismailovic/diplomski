import React from "react";

import backgroundImage from "../assets/homepage/2.jpg";
import SearchComponent from "./SearchComponent";


export default function HeaderComponent() {
  return (
    <header
      className="py-5 d-flex align-content-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container my-5">
        <div className="text-center text-white flex ">
          <h1
            className="display-4 fw-bolder"
            style={{
              textShadow: "0 0 10px rgba(0, 0, 0, 1)",
            }}
          >
            Global
          </h1>
        </div>
        <div className="mt-5">
          <div className="row d-flex justify-content-center align-items-center">
            <SearchComponent />
          </div>
        </div>
      </div>
    </header>
  );
}
