import { Link, Outlet} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faHouseUser, faHouseFlag, faChessRook, faChessBoard, faAddressBook} from "@fortawesome/free-solid-svg-icons"
import { faChessKnight} from "@fortawesome/free-regular-svg-icons"


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
            <Link to="/home" title="navbar home button" className="navbar-brand fw-bold text-black">
              &nbsp;<FontAwesomeIcon icon={faChessRook} /> <FontAwesomeIcon icon={faChessBoard} /> 
            </Link>
          </div>
          <div className="navbar-nav ms-auto text-dark">
            <Link to="/property" className="nav-item fw-bold nav-link text-dark">
            <FontAwesomeIcon icon={faHouse}  />&nbsp;Properties 
            </Link>
            <Link to="/seller" className="nav-item nav-link fw-bold text-black">
            <FontAwesomeIcon icon={faHouseFlag}  />&nbsp;Seller 
            </Link>
            <Link to="/buyer" className="nav-item nav-link fw-bold text-black">
            <FontAwesomeIcon icon={faHouseUser}  />&nbsp;Buyers 
            </Link>
            <Link to="/booking" className="nav-item nav-link fw-bold text-black">
            <FontAwesomeIcon icon={faAddressBook}  />&nbsp;Bookings 
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
