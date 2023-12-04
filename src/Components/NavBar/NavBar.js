import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faHouseUser, faHouseFlag, faT } from "@fortawesome/free-solid-svg-icons"

const NavBar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-dark" style={{ backgroundColor: '#8f8f8f' }}>
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
            <Link to="/property" className="navbar-brand text-white">
              &nbsp;<FontAwesomeIcon icon={faT}/>&nbsp;<FontAwesomeIcon icon={faT}/>
            </Link>
          </div>
          <div className="navbar-nav ms-auto">
            <Link to="/property" className="nav-item nav-link text-white">
              &nbsp;Properties <FontAwesomeIcon icon={faHouse} />
            </Link>
            <Link to="/seller" className="nav-item nav-link text-white">
              &nbsp;Seller <FontAwesomeIcon icon={faHouseFlag} />
            </Link>
            <Link to="/buyer" className="nav-item nav-link text-white">
              &nbsp;Buyers <FontAwesomeIcon icon={faHouseUser} />
            </Link>
          </div>
        </div>
      </nav>
      <div className="mt-5"></div>
    </>
  );
};

export default NavBar;
