import { useState } from "react";
import HeaderComponent from "./components/HeaderComponent";
import NavbarComponent from "./components/NavbarComponent";
import PopularDestinationsComponent from "./components/PopularDestinationsComponent";
import FooterComponent from "./components/FooterComponent";
import Homepage from "./pages/Homepage";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import SearchResults from "./pages/SearchResults";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Homepage />
              <FooterComponent />
            </>
          }
        ></Route>

        <Route
          path="/search"
          element={
            <>
              <SearchResults />
              <FooterComponent />
            </>
          }
        ></Route>

        <Route path="/login" element={<LoginPage />} />

        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
