import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { FaHome, FaUser, FaSearch, FaList, FaMap } from "react-icons/fa"; // Import icons from react-icons
import './BarLine.css'

const Navbar: React.FC = () => {
  const location = useLocation();
  const [user, setUser] = useState<{ name: string, img: string, email:string } | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser !== null) { // Check if storedUser is not null
      setUser(JSON.parse(storedUser));
      console.log("Retrieved user data:", JSON.parse(storedUser)); // Log retrieved user data

    }
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light navbar-custom">
        <div className="Travel">
          <Link to="/" className="navbar-brand title" style={{ color: 'blue' }}>
            Welcome To TraveIL
          </Link>
          <div className="username">
            {user && <p>Hello, {user.name}, {user.img}</p>}
            </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0"> 
              <li className="nav-item">
                <Link to="/" className={`nav-link ${location.pathname === "/" ? "active" : ""}`} >
                  <FaHome /> Home {/* Add home icon */}
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/profile" className={`nav-link ${location.pathname === "/profile" ? "active" : ""}`}>
                  <FaUser /> Profile {/* Add profile icon */}
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/myposts" className={`nav-link ${location.pathname === "/myposts" ? "active" : ""}`}>
                <FaList /> My Posts {/* Add list icon */}
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/map" className={`nav-link ${location.pathname === "/map" ? "active" : ""}`}>
                <FaMap /> Maps {/* Add list icon */}
                </Link>
              </li>
            </ul>
            <div className="navbar-nav me-auto mb-2 mb-lg-0"> {/* Search bar */}
              <form className="d-flex">
                <input className="form-control me-2 search" type="search" placeholder="Search" aria-label="Search" />
                <button className="btn btn-outline-success" type="submit"><FaSearch /></button> 
              </form>
            </div>
            <Link to="/login" className="logout-link">
              Logout
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
