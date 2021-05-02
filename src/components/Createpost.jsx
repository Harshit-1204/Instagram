import React,{useState, useEffect} from "react";

function Createpost() {

    const [title, setTitle] = useState("")
      const [body, setBody] = useState("")
      const [image, setImage] = useState("")
      const [url , setUrl] = useState("")


    useEffect(()=>{if(url){
      fetch("http://localhost:5000/createpost",{
      method:"post",
      headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer "+localStorage.getItem("jwt")
      },
      body:JSON.stringify({
        title,
        body,
        pic:url
      })
    })
    .then(res=>res.json())
    .then(result=>console.log(result))
    .catch(err=>console.log(err))
    }},[url,body,title])

  const postImage=()=>{
    
    
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

  
  return (
    <div className="card my-card">
        <h2>Instagram</h2>  
        <input type="text" placeholder="Title" name="title" value={title} onChange={(e)=>setTitle(e.target.value)} />
        <input type="text" placeholder="Body" name="body" value={body} onChange={(e)=>setBody(e.target.value)}/>

      <div className="file-field input-field">
        <div className="btn">
          <span>File</span>
          <input type="file" onChange={(e)=>setImage(e.target.files[0])}/>
        </div>
        <div className="file-path-wrapper">
          <input className="file-path validate" type="text"  />
        </div>
      </div>
      <button className="btn my-btn" type="submit" onClick={postImage}>Upload</button>
    </div>
  );
}

export default Createpost;
