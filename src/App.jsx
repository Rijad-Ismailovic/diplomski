import { useState } from 'react'
import HeaderComponent from './components/HeaderComponent'
import NavbarComponent from './components/NavbarComponent';
import PopularDestinationsComponent from './components/PopularDestinationsComponent';

function App() {
  return (
    <>
      <NavbarComponent />
      <HeaderComponent />
      <PopularDestinationsComponent />  
    </>
  );
}

export default App
