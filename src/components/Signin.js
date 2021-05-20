import React,{useState , useContext} from "react";
import {Link , useHistory} from "react-router-dom"
import {UserContext} from "../App"
function Signin() {
  
  const {dispatch} = useContext(UserContext)
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  
  
  const history = useHistory()

  const userSignIn = ()=>{

    fetch("http://localhost:5000/signin",{
      method:"post",
      headers:{
        "Content-Type" : "application/json"
      },
      body : JSON.stringify({
        email,
        password
      })
    })
    .then(res=>res.json())
    .then(result=>{
      if(result.error){
        alert(result.error)
      }else {
        
        localStorage.setItem("jwt",result.token)
        localStorage.setItem("user",JSON.stringify(result.user))
        dispatch({type:"USER" , payload: result.user})
        

        
        history.push("/")
      }
    })
    .catch(err=>console.log(err))
  }
  
  return (
    <div>
      <div className="card my-card ">
         <h2>Instagram</h2> 
        <input type="text" placeholder="Email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <input type="password" placeholder="Password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
        <button
          className="btn my-btn waves-effect waves-light #42a5f5 blue lighten-1"
          type="submit"
          name="action"
          onClick={userSignIn}
        >Sign In
        </button>
        <p>Don't have account? <Link to="/signup"> Sign Up</Link></p>
      </div>
    </div>
  );
}

export default Signin;
