import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";
import { useParams } from "react-router-dom";

function Userprofile() {
  const [userProfile, setUserProfile] = useState({});

  const { userId } = useParams();

  const { dispatch } = useContext(UserContext);
  const [showFollow, setShowFollow] = useState(true);
  useEffect(() => {
    fetch(`http://localhost:5000/user/${userId}`, {
      method: "get",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setUserProfile(result);
      })
      .catch((err) => console.log(err));
  }, [userId]);

  const followUser = () => {
    fetch("/follow", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        followId: userId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        dispatch({
          type: "UPDATE",
          payload: { following: data.following, followers: data.followers },
        });

        localStorage.setItem("user", JSON.stringify(data));
        setUserProfile((prev) => {
          return {
            ...prev,
            user: {
              ...prev.user,
              followers: [...prev.user.followers, data._id],
            },
          };
        });
        setShowFollow(false);
      });
  };
  const unFollowUser = () => {
    fetch("/unfollow", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        unfollowId: userId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        dispatch({
          type: "UPDATE",
          payload: { following: data.following, followers: data.followers },
        });

        localStorage.setItem("user", JSON.stringify(data));
        setUserProfile((prevState) => {
          const newFollower = prevState.user.followers.filter(
            (item) => item !== data._id
          );
          return {
            ...prevState,
            user: {
              ...prevState.user,
              followers: newFollower,
            },
          };
        });
        setShowFollow(true);
      });
  };

  return (
    <div>
      {userProfile.user ? (
        <div className="profile">
          <div className="box-1">
            <div className="profile-img">
              <img
                src="https://st.depositphotos.com/2101611/3925/v/600/depositphotos_39258143-stock-illustration-businessman-avatar-profile-picture.jpg"
                alt=""
              ></img>
            </div>
            <div className="profile-info">
              <h5>{userProfile ? userProfile.user.name : "loading.."}</h5>
              <div className="reach">
                <p>{userProfile.post.length} Posts </p>
                <p>{userProfile.user.followers.length} Followers</p>
                <p>{userProfile.user.following.length} Followers</p>
              </div>
              {showFollow ? (
                <button
                  style={{ width: "50%", margin: "0 auto"}}
                  className="waves-effect waves-light btn follow-btn"
                  onClick={() => followUser()}
                >
                  Follow <i className="fas fa-user user-icon" />
                </button>
              ) : (
                <button
                  style={{ width: "50%", margin: "0 auto" }}
                  className="waves-effect waves-light btn follow-btn"
                  onClick={() => {
                    unFollowUser();
                  }}
                >
                  Unfollow <i className="fas fa-user user-icon" />
                </button>
              )}
            </div>
          </div>
          <div className="post">
            {userProfile.post.map((item) => {
              return (
                <img
                  key={item._id}
                  className="post-img"
                  src={item.photo}
                  alt={item.title}
                ></img>
              );
            })}
          </div>
        </div>
      ) : (
        <h2>Loading....</h2>
      )}
    </div>
  );
}

export default Userprofile;
