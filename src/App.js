import React, { useState, useEffect } from 'react';
import Header from './header';
import AboutMarket from './aboutMarket';
import Catalog from './catalog';
import Vendors from './vendors';
import Reviews from './review';
import Offer from './specialOffer';
import Footer from './footer';
import './App.css';

function App() {

  return (
    <>
      <Header />
        
      <AboutMarket />

      <Catalog />

      <Vendors />

      <Reviews />

      <Offer itemId={5} />

      <Footer />
    
    </>
  );
}

export default App;