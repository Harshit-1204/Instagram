import React from "react";

function Createpost() {
  return (
    <div className="card my-card">
        <h2>Instagram</h2>  
        <input type="text" placeholder="Title" name="title" />
        <input type="text" placeholder="Body" name="body" />

      <div className="file-field input-field">
        <div className="btn">
          <span>File</span>
          <input type="file" />
        </div>
        <div className="file-path-wrapper">
          <input className="file-path validate" type="text" />
        </div>
      </div>
      <button className="btn my-btn">Upload</button>
    </div>
  );
}

export default Createpost;
