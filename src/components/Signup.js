import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useState ,useEffect } from "react";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image,setImage] = useState("")
  const [url,setUrl] = useState(undefined)
  const history = useHistory();

  useEffect(() => {
    if(url){
      uploadFields()
    }
    
  }, [url])

  const uploadPic = ()=>{
    const data = new FormData()
    data.append("file",image)
    data.append("upload_preset", "instagram")
    data.append("cloud_name","harshit-cloud")

    fetch("https://api.cloudinary.com/v1_1/harshit-cloud/image/upload",{
      method:"post",
      body:data
    })
    .then(res=>res.json())
    .then(result=>setUrl(result.url))
    .catch(err=>console.log(err))
  }
  const uploadFields = ()=>{
    fetch("http://localhost:5000/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        pic:url
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.error) {
          alert(result.error);
        } else if (result.message) {
          alert(result.message);
          history.push("/signin");
        }
      })
      .catch((err) => console.log(err));
  }
  const signUpUser = () => {
    if(image){
      uploadPic()
    }else{
      uploadFields()
    }
    
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
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <div className="file-field input-field">
          <div className="btn">
            <span>Upload Pic</span>
            <input type="file" onChange={(e) => setImage(e.target.files[0])} />
          </div>
          <div className="file-path-wrapper">
            <input className="file-path validate" type="text" />
          </div>
        </div>
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
