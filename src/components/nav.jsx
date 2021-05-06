import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../App"
function Nav() {
  const history = useHistory()
  const { state, dispatch } = useContext(UserContext)
  const renderLIst = () => {
    
    if (state) {
      return [
        <li key="1">
          <Link to="/profile">Profile</Link>
        </li>,
        <li key="2">
          <Link to="/createpost">Create Post</Link>
        </li>,
        <button key="3" className="btn  #42a5f5 blue lighten-1" onClick={
          () => {
            localStorage.clear()
            dispatch({ type: "LOGOUT" })
            return history.push("/signin")
          }
        }>
          LogOut
        </button>

      ]
    } else {
      return [
        <li key="3">
          <Link to="/signin">Signin</Link>
        </li>,
        <li key="4">
          <Link to="/signup">Signup</Link>
        </li>

      ]

    }
  }

  return (
    <nav>
      <div className="nav-wrapper">
        <Link to={state ? "/" : "signin"} className="brand-logo" styles={{ fontFamily: "grand hotel" }} >
          Instagram
        </Link>
        <ul id="nav-mobile" className="right hide-on-med-and-down">

          {renderLIst()}
        </ul>
      </div>
    </nav>
  );
}

export default Nav;
