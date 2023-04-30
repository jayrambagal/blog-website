import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Box, InputLabel, TextField, Typography, Button } from "@mui/material";
import "./index.css"
const labelStyle = { mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold",width:700 };

const EditBlog = (props) => {
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
      .get(`https://blogapp-auth.onrender.com/posts/${id}`)
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


  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };
  const handleImageChange = (event) => {
    setImage(event.target.value);
  };

  const handleUpdate = () => {
    const updatedBlog = {
      title: title,
      content: content,
      imageUrl:image,
    };

    axios
      .put(`https://blogapp-auth.onrender.com/posts/${id}`, updatedBlog)
      .then((response) => {
        console.log(response);
        navigate("/myBlogs")
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
            Edit your Blog
          </Typography>
          <InputLabel sx={labelStyle}>Title</InputLabel>
          <TextField
            name="title"
            value={title} 
            onChange={handleTitleChange}
            margin="normal"
            variant="outlined"
            sx={{width:800}}
            placeholder="Title of the Blog"
          />
          <InputLabel sx={labelStyle}>Content</InputLabel>
          
          <textarea 
            name="content"
            value={content} 
            onChange={handleContentChange}
            style={{width:"800px",height:"200px",background: "transparent"}}
            placeholder="Write your Content"
            />
          
          <InputLabel sx={labelStyle}>ImageURL</InputLabel>
          <TextField
            name="image"
            value={image} onChange={handleImageChange}
            margin="normal"
            variant="outlined"
            sx={{width:800}}
            placeholder="Url of Image"
          />
          <Button
            sx={{ mt: 2, borderRadius: 4,width:800}}
            variant="contained"
            color="warning"
            onClick={handleUpdate}
            
          >
            Update Blog
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default EditBlog;