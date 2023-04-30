import React, { useEffect, useState } from "react";
import Header from "./Header.js";
import axios from "axios";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "./index.css";
import { Link, useNavigate } from "react-router-dom";

function UserBlogs() {

  const navigate = useNavigate();
  const [user, setUser] = useState();
  const id = localStorage.getItem("userId");

  const sendRequest = async () => {
    const res = await axios
      .get(`http://localhost:5000/posts`)
      .catch((err) => console.log(err));
    // console.log(res);
    const data = await res.data;
    
    return data;
  };
  useEffect(() => {
    sendRequest().then((data) => {
      setUser(data);
      console.log(data);
      
    });
  }, []);

  function handleDelete(id) {
    console.log(id);
    axios.delete(`http://localhost:5000/posts/${id}`)
  .then(response => {
    if (response.status === 200) {
      // Reload the page to show the updated list of blog posts
      window.alert("delete")
      window.location.reload()
    } else {
      throw new Error('Failed to delete blog post');
    }
  })
  .catch(error => {
    console.error(error);
    // Display an error message to the user
    alert('Failed to delete blog post');
  });
  }

  function handleEdit(id) {
    console.log(id);
    
       navigate(`/edit/${id}`)
    
  }

  return (
    <div className="containter_blog">
      <Header />
      <div className="sub_containter">
      <div className="create">
        <Card sx={{ width:345,height:400, }} onClick={()=>navigate("/blogs/add")}>
         <div className="div_center" style={{width:"100%",display:"flex" ,justifyContent:"center",marginTop:"50px"}} >
          <img style={{width:"160px", height:"160px"}} src="https://cdn-icons-png.flaticon.com/512/1250/1250544.png?w=740&t=st=1682836228~exp=1682836828~hmac=c54a55e16dc380401ce17a91e337a3168daded11688bd02e6dbe99dd60865b2d" alt=""></img>
        </div>
          
          <CardContent>
          <div style={{width:"100%",display:"flex" ,justifyContent:"center"}}>
            <Typography gutterBottom variant="h4" component="div">
              Create New Blog
            </Typography>
            </div>
          </CardContent>
        </Card>
        </div>
        {" "}
        {user &&
          user.data &&
          user.data.map((blog, index) => (
            <div className="card">
            <Card sx={{ width: 345, height: 400,background: "linear-gradient(110deg, #d0c989 60%, #d0c989 60%)" }}>
              <CardMedia
                sx={{ height: 140 }}
                image={blog.imageUrl}
                title="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {blog.title}
                </Typography>
              
                <p>{blog.content.slice(0,160)}
                <Link to={`/read/${blog.id}`} >...ReadMore</Link>
                </p>
                
                
              </CardContent>
              <CardActions>
                <Button size="small" onClick={()=>handleEdit(blog.id)}>
                  Edit
                </Button>
                <Button size="small" onClick={()=>{handleDelete(blog.id)}}>
                  Delete
                </Button>
                
              </CardActions>
            </Card>
            <div className="" style={{marginTop:"-40px" ,display:"flex",flexDirection:"column",alignItems:"end" }}>
                <p>Date: {blog.created_at.substring(0,10)}</p>
                <p>Time: {blog.created_at.substring(11,19)}</p>
                </div>
        </div>
            
          ))}
      </div>
    </div>
  );
}

export default UserBlogs;
