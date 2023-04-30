import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, InputLabel, TextField, Typography, Button } from "@mui/material";
import "./index.css"
const labelStyle = { mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold",width:700 };

const AddBlog = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    content: "",
    image: "",
  });

  const handleChange = (event) => {
    setInputs((prevValue) => ({
      ...prevValue,
      [event.target.name]: event.target.value,
    }));
  };

  const sendRequest = async (type = "signin") => {
    const res = await axios
      .post("http://localhost:5000/posts", {
        title: inputs.title,
        content: inputs.content,
        imageUrl: inputs.image,
        user: localStorage.getItem("userId"),
      })
      .catch((err) => console.log(err));

    const data = await res.data;
    return data;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendRequest()
      .then((data) => console.log(data))
      .then(() => navigate("/myBlogs"));
  };

  return (
    <div className="container_addBlog" style={{height:"100vh",display:"flex",justifyContent:"center",background:"linear-gradient(110deg, rgb(206, 203, 114) 60%, #d0c989 60%)"}}>
      <form onSubmit={handleSubmit} className="form_add">
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
            Create your Blog
          </Typography>
          <InputLabel sx={labelStyle}>Title</InputLabel>
          <TextField
            name="title"
            onChange={handleChange}
            value={inputs.title}
            margin="normal"
            variant="outlined"
            sx={{width:800}}
            placeholder="Title of the Blog"
          />
          <InputLabel sx={labelStyle}>Content</InputLabel>
          
          <textarea 
            name="content"
            onChange={handleChange}
            value={inputs.content}
            style={{width:"800px",height:"200px",background: "transparent"}}
            placeholder="Write your Content"
            />
          
          <InputLabel sx={labelStyle}>ImageURL</InputLabel>
          <TextField
            name="image"
            onChange={handleChange}
            value={inputs.image}
            margin="normal"
            variant="outlined"
            sx={{width:800}}
            placeholder="Url of Image"
          />
          <Button
            sx={{ mt: 2, borderRadius: 4,width:800}}
            variant="contained"
            color="warning"
            type="submit"
            
            
          >
            Submit Blog
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default AddBlog;