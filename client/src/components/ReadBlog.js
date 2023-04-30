import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Box, InputLabel, TextField, Typography, Button } from "@mui/material";
import "./index.css"
const labelStyle = { mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold",width:700 };

const ReadBlog = (props) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("")
  const location = useLocation();
  const currentUrl = location.pathname;
 
  const id = currentUrl.substr(-16);
  console.log(id);

  const navigate = useNavigate()
 
  useEffect(() => {
    console.log(id);
    axios
      .get(`http://localhost:5000/posts/${id}`)
      .then((response) => {
        console.log(response.data);
        setTitle(response.data.title);
        setContent(response.data.content);
        setImage(response.data.imageUrl)
      })
      .catch((error) => {
        console.log(error);
      });
    
  }, []);



  return (
    <div  className="container_addBlog" style={{height:"100vh",display:"flex",justifyContent:"center",background:"linear-gradient(110deg, rgb(206, 203, 114) 60%, #d0c989 60%)"}}>
    
  <form  className="form_add">
        <Box
          border={2}
          borderColor="secondary.main"
          borderRadius={10}
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          margin={"auto"}
          marginTop={5}
          display="flex"
          flexDirection={"column"}
          width={"100%"}
        >

        <Typography
        fontWeight={"bold"}
        padding={3}
        color="gray"
        variant="h3"
        textAlign={"center"}
      >
        {title}
      </Typography>
        
        <img style={{width:"550px",height:"300px",marginLeft:"200px"}} src={image} alt="" />
         
         
          <p style={{width:"900px", marginTop:"50px", marginLeft:"60px"}}>{content}</p>
          
        
        </Box>
      </form>
    </div>
  );
};

export default ReadBlog;