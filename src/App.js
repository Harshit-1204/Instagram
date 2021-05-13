import React ,{useEffect, createContext ,useReducer ,useContext} from "react"
import {BrowserRouter as Router ,Route ,useHistory , Switch} from "react-router-dom"
import Nav from "./components/nav";
import "./App.css"
import Profile from "./components/Profile";
import Signup from "./components/Signup";
import Home from "./components/Home";
import Signin from "./components/Signin"
import Userprofile from "./components/Userpofile"
import Createpost from "./components/Createpost";
import {reducer,initialState} from "./reducers/userReducers"

export const UserContext = createContext()

const Routing =()=>{

  const history = useHistory()
  const {dispatch} = useContext(UserContext) 
  
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    
    if(user){
      dispatch({type:"USER",payload:user})
    } else {
      history.push("/signin")
    }
    
  }
  ,[dispatch,history])


  return <Switch>
    <Route path="/" exact component={Home} />
      <Route path="/profile" exact component={Profile}/>
      <Route path="/signin" component={Signin} />
      <Route path="/signup" component={Signup} />
      <Route path="/createpost" component={Createpost} />
      <Route path="/profile/:userId" component={Userprofile} />
  </Switch>
}

function App() {
  const [state,dispatch] = useReducer(reducer,initialState)

  return <div>
    <UserContext.Provider value={{state,dispatch}}>
      <Router>
        <Nav />
        <Routing /> 
      </Router>
    </UserContext.Provider>
    


  </div>
}

export default App;
