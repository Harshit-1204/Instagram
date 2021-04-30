import React from "react"
import {BrowserRouter as Router ,Route} from "react-router-dom"
import Nav from "./components/nav";
import "./App.css"
import Profile from "./components/Profile";
import Signup from "./components/Signup";
import Home from "./components/Home";
import Signin from "./components/Signin"

function App() {
  return <div>
    
    <Router>
      <Nav />
      <Route path="/" exact component={Home} />
      <Route path="/profile" component={Profile}/>
      <Route path="/signin" component={Signin} />
      <Route path="/signup" component={Signup} />
      
    </Router>


  </div>
}

export default App;
