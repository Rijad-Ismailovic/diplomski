import { useState } from "react";
import HeaderComponent from "./components/HeaderComponent";
import NavbarComponent from "./components/NavbarComponent";
import PopularDestinationsComponent from "./components/PopularDestinationsComponent";
import FooterComponent from "./components/FooterComponent";
import Homepage from "./pages/Homepage";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import SearchResults from "./pages/SearchResults";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/results" element={<SearchResults />}></Route>
        <Route path="/details/:id" element={<Homepage />} />
      </Routes>
      <FooterComponent />
    </BrowserRouter>
  );
}

export default App;
