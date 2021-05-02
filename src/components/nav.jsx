import React from "react";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav>
      <div className="nav-wrapper">
        <Link to="/" className="brand-logo" styles={{fontFamily:"grand hotel"}} >
          Instagram
        </Link>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/signin">Signin</Link>
          </li>
          <li>
            <Link to="/signup">Signup</Link>
          </li>
          <li>
            <Link to="/createpost">Create Post</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Nav;
