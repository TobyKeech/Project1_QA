import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Property from "./Components/Property/Property";
import Buyer from "./Components/Buyer/Buyer";
import Seller from "./Components/Seller/Seller";
import NavBar from "./Components/NavBar/NavBar";
import Footer from "./Components/Footer/Footer";

function App() {
  return (
      <BrowserRouter>
      <NavBar/>
          <Routes>
              <Route path="property" element={<Property/>}></Route>
              <Route path="buyer" element={<Buyer/>}></Route>
              <Route path="seller" element={<Seller/>}></Route>
          </Routes>
          <Footer />
      </BrowserRouter>

   );
}
export default App;
