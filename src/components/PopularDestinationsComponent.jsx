import React from "react";

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
      <div
        className="position-relative overflow-hidden rounded"
        style={{ height: "200px" }}
      >
        <img
          src={city.image}
          className="w-100 h-100 object-fit-cover"
        />
        <p
          className="position-absolute top-0 start-0 text-white fw-bold fs-4 p-4"
          style={{
            textShadow: "0 0 10px rgba(0, 0, 0, 0.7)",
          }}
        >
          {city.title}
        </p>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h4 className="mb-3">Popular Destinations</h4>
      <div className="row mb-2 gx-2">
        <div className="col-6">{createCard(data[0])}</div>
        <div className="col-6">{createCard(data[1])}</div>
      </div>
      <div className="row gx-2">
        <div className="col-4">{createCard(data[2])}</div>
        <div className="col-4">{createCard(data[3])}</div>
        <div className="col-4">{createCard(data[4])}</div>
      </div>
    </div>
  );
}

export default PopularDestinationsComponent;
