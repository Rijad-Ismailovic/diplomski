import React from "react";

import backgroundImage from "../assets/homepage/2.jpg";


export default function HeaderComponent() {
  const europeanCities = [
    "London",
    "Berlin",
    "Madrid",
    "Rome",
    "Paris",
    "Vienna",
    "Amsterdam",
    "Brussels",
    "Lisbon",
    "Stockholm",
    "Oslo",
    "Copenhagen",
    "Helsinki",
    "Dublin",
    "Warsaw",
    "Prague",
    "Budapest",
    "Bucharest",
    "Athens",
    "Belgrade",
    "Zagreb",
    "Ljubljana",
    "Bratislava",
    "Sofia",
    "Tallinn",
    "Riga",
    "Vilnius",
    "Luxembourg",
    "Reykjavik",
    "Sarajevo",
    "Skopje",
    "Podgorica",
    "Tirana",
    "Valletta",
    "Chisinau",
    "Monaco",
    "San Marino",
    "Andorra la Vella",
    "Vatican City",
    "Hamburg",
    "Munich",
    "Cologne",
    "Frankfurt",
    "Stuttgart",
    "Dusseldorf",
    "Barcelona",
    "Valencia",
    "Seville",
    "Milan",
    "Naples",
    "Turin",
    "Lyon",
    "Marseille",
    "Bordeaux",
    "Nice",
    "Rotterdam",
    "The Hague",
    "Antwerp",
    "Ghent",
    "Geneva",
    "Zurich",
    "Basel",
    "Krakow",
    "Gdansk",
    "Wroclaw",
    "Lodz",
    "Poznan",
    "Cluj-Napoca",
    "Timisoara",
    "Constanta",
    "Thessaloniki",
    "Patras",
    "Birmingham",
    "Manchester",
    "Glasgow",
    "Edinburgh",
    "Leeds",
    "Sheffield",
    "Liverpool",
    "Brno",
    "Ostrava",
    "Kosice",
    "Debrecen",
    "Graz",
    "Salzburg",
    "Innsbruck",
    "Malmo",
    "Gothenburg",
    "Uppsala",
    "Aarhus",
    "Odense",
    "Bergen",
    "Trondheim",
    "Tampere",
    "Turku",
    "Kaunas",
    "Tartu",
    "Split",
    "Dubrovnik",
    "Kotor",
    "Mostar",
    "Novi Sad",
    "Lviv",
    "Odessa",
    "Dnipro",
    "Kharkiv",
    "Istanbul",
    "Izmir",
    "Ankara",
  ];
  return (
    <header
      className="py-5 d-flex align-content-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* <header class="py-5 bg-image-full" style="background-image: url('https://source.unsplash.com/wfh8dDlNFOk/1600x900')"> */}
      <div className="container my-5">
        <div className="text-center text-white flex ">
          <h1 className="display-4 fw-bolder">Global</h1>
          {/* <p className="lead fw-normal text-white text-bold mb-0">
            Drive in luxury
          </p> */}
        </div>
        <div className="mt-5">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-9 bg-white shadow p-3 pt-2 rounded">
              {/* <h4>Search for Tickets</h4> */}
              <form>
                <div className="row">
                  <div className="col-3">
                    <label className="form-label">Departure location</label>
                    <select className="form-select" value={""} onChange={""}>
                      <option value="">Select a city</option>{" "}
                      {europeanCities.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-3">
                    <label className="form-label">Departure date</label>
                    <input type="date" className="form-control shadow-none" />
                  </div>
                  <div className="col-3 ">
                    <label className="form-label">Return date</label>
                    <input type="date" className="form-control shadow-none" />
                  </div>
                  <div className="col-3 d-flex flex-column">
                    <button className="btn btn-primary mt-auto">
                      Search Tickets
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
