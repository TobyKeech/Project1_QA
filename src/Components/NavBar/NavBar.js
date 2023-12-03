import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-light bg-dark">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link to="/property" className="navbar-brand text-white">
              &nbsp;Trusted Tenancy's
            </Link>
            <Link to="/property" className="nav-item nav-link text-white">
              &nbsp;Properties
            </Link>
            <Link to="/seller" className="nav-item nav-link  text-white">
              &nbsp;Seller
            </Link>
            <Link to="/buyer" className="nav-item nav-link  text-white">
              &nbsp;Buyers
            </Link>
          </div>
        </div>
      </nav>
      <div className="mt-5">
      </div>
    </>
  );
};

export default NavBar;
