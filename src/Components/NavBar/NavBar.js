import { Link, Outlet} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faHouseUser, faHouseFlag, faT, faChessRook} from "@fortawesome/free-solid-svg-icons"

const NavBar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-dark bg-body-tertiary">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav mr-auto">
            <Link to="/property" className="navbar-brand text-black">
              &nbsp;<FontAwesomeIcon icon={faChessRook}  /> Rook Residences
            </Link>
          </div>
          <div className="navbar-nav ms-auto text-dark">
            <Link to="/property" className="nav-item nav-link text-dark">
            <FontAwesomeIcon icon={faHouse}  />&nbsp;Properties 
            </Link>
            <Link to="/seller" className="nav-item nav-link text-black">
            <FontAwesomeIcon icon={faHouseFlag}  />&nbsp;Seller 
            </Link>
            <Link to="/buyer" className="nav-item nav-link text-black">
            <FontAwesomeIcon icon={faHouseUser}  />&nbsp;Buyers 
            </Link>
          </div>
        </div>
      </nav>
      <div className="container">
                <Outlet/>
            </div>
      <div className="mt-5"></div>
    </>
  );
};

export default NavBar;
