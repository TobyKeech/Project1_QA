import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Property from "./Components/Property/Property";
import Buyer from "./Components/Buyer/Buyer";
import Seller from "./Components/Seller/Seller";
import Booking from "./Components/Booking/Booking";
import './App.css';
import LandingPage from "./Components/LandingPage/LandingPage";

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<LandingPage/>}> 
              <Route path="property" element={<Property/>}></Route>
              <Route path="buyer" element={<Buyer/>}></Route>
              <Route path="seller" element={<Seller/>}></Route>
              <Route path="booking" element={<Booking/>}></Route>
              </Route>
          </Routes>
      </BrowserRouter>

   );
}
export default App;
