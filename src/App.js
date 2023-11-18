import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


import './App.css';

import LandingPage from "./Components/LandingPage/LandingPage";

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<LandingPage/>}> {/*This is the root path*/} 
              </Route>
          </Routes>
      </BrowserRouter>

    <>
    <div className="container">
      <div className="header">
        <div className="row">
          {/* <Link>Properties</Link>
          <Link>Seller</Link>
          <Link>Buyers</Link> */}
        </div>
      </div>
    </div>

    <div className="container">
      {/* <OutLet /> */}
    </div>
  </>
   
   )
}
export default App;
