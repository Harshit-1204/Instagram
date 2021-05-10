import React, { useEffect, useState ,useContext} from "react";
import {UserContext} from "../App"
function Profile() {
    const [myPosts, setMyPosts] = useState([]);
    const {state } = useContext(UserContext)
  useEffect(() => {
    fetch("http://localhost:5000/mypost", {
      method: "get",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setMyPosts(result);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="profile">
      <div className="box-1">
        <div className="profile-img">
          <img
            src="https://st.depositphotos.com/2101611/3925/v/600/depositphotos_39258143-stock-illustration-businessman-avatar-profile-picture.jpg"
            alt=""
          ></img>
        </div>
        <div className="profile-info">
          <h5>{state ? state.name : "loading.."}</h5>
          <div className="reach">
            <p>{myPosts.length} post</p>
            <p>{state?state.followers.length:"0"} followers</p>
            <p>{state?state.following.length:"0"} following</p>
          </div>
        </div>
      </div>
      <div className="post">

          {myPosts.map(post=>{
              return <img
              key={post._id}
              className="post-img"
              src={post.photo}
              alt={post.tiele}
            ></img>
          })}
        
        
      </div>
    </div>
  );
}

export default Profile;
