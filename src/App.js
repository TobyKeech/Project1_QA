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

  );
}
export default App;
