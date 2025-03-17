import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <NavLink to="/" className="nav-link">
              To Do App
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/todolist" className="nav-link">
              Lists
            </NavLink>
          </li>
        </ul>
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <NavLink to="/login" className="nav-link">
              Login
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/register" className="nav-link">
              Register
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
}

export { Navbar };
