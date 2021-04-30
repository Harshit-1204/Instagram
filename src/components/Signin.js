import React from "react";
import {Link} from "react-router-dom"

function Signin() {
  return (
    <div>
      <div className="card my-card ">
         <h2>Instagram</h2> 
        <input type="text" placeholder="Email" />
        <input type="text" placeholder="Password" />
        <button
          class="btn waves-effect waves-light #42a5f5 blue lighten-1"
          type="submit"
          name="action"
        >Sign In
        </button>
        <p>Don't have account? <Link to="/signup"> Sign Up</Link></p>
      </div>
    </div>
  );
}

export default Signin;
