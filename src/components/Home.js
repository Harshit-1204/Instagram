import React, { useState, useEffect } from "react";

function Post(props) {
  return (
    <div className="home-post">
      <h5 className="name">{props.name}</h5>
      <img src={props.photo} alt="home-post-pic" />
      <h6 className="title">{props.title}</h6>
      <h6 className="body">{props.body}</h6>
      <input className="input" type="text" placeholder="Add comment" />
    </div>
  );
}

function Home() {
  const [posts, setPosts] = useState([]);

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
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="home-container">
      {posts.map((post, index) => (
        <Post
          key={index}
          title={post.title}
          body={post.body}
          photo={post.photo}
          name={post.postedBy.name}
        />
      ))}
    </div>
  );
}

export default Home;
