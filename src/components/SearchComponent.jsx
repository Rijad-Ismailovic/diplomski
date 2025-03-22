import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchComponent() {
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

  const navigator = useNavigate();

  const [departureLocation, setDepartureLocation] = useState("");
  const [arrivalLocation, setArrivalLocation] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  function handleSearch(e) {
    e.preventDefault();
    console.log(departureLocation, arrivalLocation, departureDate, returnDate);
    navigator(`/results?departure=${departureLocation}&arival=${arrivalLocation}&date=${departureDate}`)
  }

  return (
    <div className="col-9 bg-white shadow p-3 pt-2 rounded">
      <form>
        <div className="row">
          <div className="col-3">
            <label className="form-label">Departure location</label>
            <select
              className="form-select"
              value={departureLocation}
              onChange={(e) => setDepartureLocation(e.target.value)}
            >
              <option value={""} onChange={""}>
                Select a city
              </option>{" "}
              {europeanCities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
          <div className="col-3">
            <label className="form-label">Departure location</label>
            <select
              className="form-select"
              value={arrivalLocation}
              onChange={(e) => setArrivalLocation(e.target.value)}
            >
              <option value={""} onChange={""}>
                Select a city
              </option>{" "}
              {europeanCities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
          <div className="col-2">
            <label className="form-label">Departure date</label>
            <input
              type="date"
              className="form-control shadow-none"
              onChange={(e) => setDepartureDate(e.target.value)}
            />
          </div>
          <div className="col-2 ">
            <label className="form-label">Return date</label>
            <input
              type="date"
              className="form-control shadow-none"
              onChange={(e) => setReturnDate(e.target.value)}
            />
          </div>
          <div className="col-2 d-flex flex-column">
            <button
              className="btn btn-primary mt-auto"
              onClick={(e) => handleSearch(e)}
            >
              Search Tickets
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SearchComponent;
