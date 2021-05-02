import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const signUpUser = () => {
    fetch("http://localhost:5000/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.error){
          alert(result.error)
        }else if( result.message){
          alert(result.message)
          history.push("/signin")
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className="card my-card ">
        <h2>Instagram</h2>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Email"
          name="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Password"
          name="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button
          onClick={signUpUser}
          className="btn my-btn waves-effect waves-light #42a5f5 blue lighten-1"
          type="submit"
        >
          Sign In
        </button>
        <p>
          Already have account? <Link to="/signin"> Sign In</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
