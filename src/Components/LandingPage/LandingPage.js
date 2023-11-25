import { Link, Outlet } from "react-router-dom";
import React from "react";
import "./LandingPage.css";

function LandingPage() {
//this is the home page of the application or the first page viewed upon loading

  return (
    <>
      <div className="container">
        <div className="header">Estate Agent</div>
          <nav className="row">
            <Link to="/property">&nbsp;Properties</Link>
            {/* links to the property page via inetraction with the browser router */}
            <Link to="/seller">&nbsp;Seller</Link>
             {/* links to the seller page via inetraction with the browser router */}
            <Link to="/buyer">&nbsp;Buyers</Link>
             {/* links to the buyers page via interaction with the browser router */}
          </nav>
     
      </div>

      <div className="container">
        <Outlet />
        {/* ^^show the default page upon rendering the web page for the frist time */}
      </div>
      
    </>
  );
}
export default LandingPage;