import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { UserContext } from "../App";

function Home() {
  const [posts, setPosts] = useState([]);
  const { state } = useContext(UserContext);

  useEffect(() => {
    fetch("http://localhost:5000/allpost", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setPosts(result);
        console.log(result);
      })
      .catch((err) => console.log(err));
  }, [posts]);

  const likePost = (id) => {
    fetch("/like", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        //console.log(result)
        const newPosts = posts.map((post) => {
          if (post._id === result._id) {
            return result;
          } else {
            return post;
          }
        });
        setPosts(newPosts);
      })
      .catch((err) => console.log(err));
  };
  const unLikePost = (id) => {
    fetch("/unlike", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        //console.log(result)
        const newPosts = posts.map((post) => {
          if (post._id === result._id) {
            return result;
          } else {
            return post;
          }
        });
        setPosts(newPosts);
      })
      .catch((err) => console.log(err));
  };

  const commentPost = (text, postId) => {
    fetch("/comment", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId,
        text,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        //console.log(result);
        const newpost = posts.map((post) => {
          if (post._id === result._id) {
            return result;
          } else {
            return post;
          }
        });
        setPosts(newpost);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deletePost = (postId) => {
    fetch(`/delete/${postId}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        //console.log(result)

        // const newPosts = posts.map((post)=>{
        //   if(post._id !== result.post._id){
        //     return post
        //   }
        // })

        const newPosts = posts.filter((post) => {
          return post.id !== result.post._id;
        });

        setPosts(newPosts);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="home-container">
      {posts.map((post) => (
        <div className="home-post" key={post._id}>
          <div className="post-container">
            <h5 className="name" style={{ color: "black" }}>
              <Link
                to={
                  state._id !== post.postedBy._id
                    ? "/profile/" + post.postedBy._id
                    : "/profile"
                }
                style={{ textDecoration: "none" }}
              >
                {post.postedBy.name}
              </Link>
              {state._id === post.postedBy._id && (
                <i
                  className="small material-icons delete"
                  onClick={() => deletePost(post._id)}
                >
                  delete
                </i>
              )}
            </h5>
          </div>

          <img src={post.photo} alt="home-post-pic" />
          <div className="post-container">
            {post.like.includes(state._id) ? (
              <p className="like-para">
                <i
                  className="fas fa-heart"
                  onClick={() => unLikePost(post._id)}
                />{" "}
                {post.like.length} likes
              </p>
            ) : (
              <p className="like-para">
                <i
                  className="far fa-heart"
                  onClick={() => likePost(post._id)}
                />{" "}
                {post.like.length} likes
              </p>
            )}

            <h6 className="title">{post.title}</h6>
            <h6 className="body">{post.body}</h6>
            {post.comments.map((record) => {
              return (
                <h6 key={record._id}>
                  <span style={{ fontWeight: "500" }}>
                    {record.postedBy.name}
                  </span>{" "}
                  {record.text}
                </h6>
              );
            })}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                console.log(e.target[0].value);
                commentPost(e.target[0].value, post._id);
              }}
            >
              <input className="input " type="text" placeholder="Add comment" />
            </form>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;
