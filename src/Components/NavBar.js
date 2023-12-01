import { Link } from "react-router-dom";
const NavBar = () => {
  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-light bg-dark">
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav">
            <Link to="/property" class="navbar-brand text-white">
              &nbsp;Trusted Tenancy's
            </Link>
            <Link to="/property"  class="nav-item nav-link text-white">
                
              &nbsp;Properties
            </Link>
            {/* links to the property page via inetraction with the browser router */}
            <Link to="/seller" class="nav-item nav-link  text-white">
              &nbsp;Seller
            </Link>
            {/* links to the seller page via inetraction with the browser router */}
            <Link to="/buyer" class="nav-item nav-link  text-white">
              &nbsp;Buyers
            </Link>
            {/* links to the buyers page via interaction with the browser router */}
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
