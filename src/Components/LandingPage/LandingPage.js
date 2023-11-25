import { Link, Outlet } from "react-router-dom";
import React from "react";
import "./LandingPage.css";

function LandingPage() {
  return (
    <>
      <div className="container">
        <div className="header">Estate Agent</div>
          <nav className="row">
            <Link to="/property">&nbsp;Properties</Link>
            <Link to="/seller">&nbsp;Seller</Link>
            <Link to="/buyer">&nbsp;Buyers</Link>
          </nav>
     
      </div>

      <div className="container">
        <Outlet />
      </div>
    </>
  );
}
export default LandingPage;