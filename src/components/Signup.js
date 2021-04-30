import React from "react"
import { Link } from "react-router-dom";


function Signup(){
    return (
        <div>
          <div className="card my-card ">
             <h2>Instagram</h2>  
            <input type="text" placeholder="Name" name="name"/>
            <input type="text" placeholder="Email" name="email"/>
            <input type="text" placeholder="Password" name="password"/>
            <button
              class="btn waves-effect waves-light #42a5f5 blue lighten-1"
              type="submit"
              name="action"
            >Sign In
            </button>
            <p>Already have account? <Link to="/signin"> Sign In</Link></p>
          </div>
        </div>
      );
}

export default Signup;