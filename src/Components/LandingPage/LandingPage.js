import React from "react";
import "./LandingPage.css";
import { link, output } from "react-router-dom";
<link
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
  rel="stylesheet"
  integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
  crossorigin="anonymous"
></link>;

function LandingPage() {
  return (
    <>
      <div className="container">
        <div className="header">
          <div className="row">
            <Link>Properties</Link>
            <Link>Seller</Link>
            <Link>Buyers</Link>
          </div>
        </div>
      </div>

      <div className="container">
        <OutLet />
      </div>
    </>
  );
}
export default LandingPage;