import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [role, setRole] = useState('');
  const [loaded, setLoaded] = useState(false);
  const session_role = sessionStorage.getItem('role');
  useEffect(() => {
    setRole(session_role);
    setLoaded(true);
  }, [session_role]);

  const loadPage = () => {
    if (loaded) {
      if (role === 'citizen') {
        return (
          <nav
            className="navbar navbar-expand-lg navbar-light"
            style={{ backgroundColor: '#e3f2fd' }}
          >
            <Link to="/" className="navbar-brand">
              Home
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="nav navbar-nav navbar-left">
                <li className="nav-item">
                  <Link to="/crimeregistration" className="nav-link">
                    Register Crime
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/crimeawareness" className="nav-link">
                    Crime Awareness
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/tracking" className="nav-link">
                    Track Complaints
                  </Link>
                </li>
              </ul>
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to="/logout" className="nav-link">
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        );
      }
      if (role === 'policeman') {
        return (
          <nav
            className="navbar navbar-expand-lg navbar-light "
            style={{ backgroundColor: '#e3f2fd' }}
          >
            <Link to="/" className="navbar-brand">
              Home
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link to="/newreports" className="nav-link">
                    New Reports
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/myinvestigations" className="nav-link">
                    My Investigations
                  </Link>{' '}
                </li>
                <li className="nav-item">
                  <Link to="/tracking" className="nav-link">
                    Track Complaints
                  </Link>
                </li>
              </ul>
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to="/logout" className="nav-link">
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        );
      }
      if (role === 'admin') {
        return (
          <nav
            className="navbar navbar-expand-lg navbar-light"
            style={{ backgroundColor: '#e3f2fd' }}
          >
            <Link to="/" className="navbar-brand">
              Home
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link to="/addpoliceman" className="nav-link">
                    Add Policeman
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/managepolicemen" className="nav-link">
                    Manage Policemen
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/tracking" className="nav-link">
                    Track Complaints
                  </Link>
                </li>
              </ul>
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to="/logout" className="nav-link">
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        );
      }
    } else return;
  };
  return <>{loadPage()}</>;
};

export default Navbar;
