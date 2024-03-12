import React from "react";
//import { logout } from "../services/user-service";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Navbar: React.FC = () => {
  //const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    console.log("logout")
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand" style={{ color: 'blue' }}>
            TraveIL
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  to="/"
                  className={`nav-link ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                             </li>
              <li className="nav-item">
                <Link
                  to="/profile"
                  className={`nav-link ${
                    location.pathname === "/profile" ? "active" : ""
                  }`}
                >
                  Profile
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/myposts"
                  className={`nav-link ${
                    location.pathname === "/myposts" ? "active" : ""
                  }`}
                >
                  My Posts
                </Link>
              </li>
            </ul>
            <button
              className="btn btn-link"
              type="button"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;