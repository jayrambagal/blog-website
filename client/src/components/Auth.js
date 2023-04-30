import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import "./index.css"
import { useDispatch } from "react-redux";
import { authActions } from "../store";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isSignup, setIsSignup] = useState(false);
  const [res,setRes] = useState("")
  const handleChange = (event) => {
    setInputs((prevValue) => ({
      ...prevValue,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSignUp = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('https://blogapp-auth.onrender.com/signup', { 
        name:inputs.name, 
        email:inputs.email, 
        password:inputs.password });
      console.log(response);
      
      setRes(response.status)
      
    
      window.alert("signUp Successfully")
      navigate("/myBlogs")
    } catch (error) {
      if(res === 422){
        window.alert("user already exsist")
      }else{
        window.alert("something went wrong")
      }
      console.log(error);
      // handle error response
    }
  };

  function handleSignin(e) {
    e.preventDefault();
    axios.post('https://blogapp-auth.onrender.com/signin', {
        email: inputs.email,
        password: inputs.password
      })
      .then((response) => {
        // store any user data or authentication tokens in local storage or state
        // navigate the user to the dashboard or private page
        navigate("/myBlogs")
      })
      .catch((error) => {
        console.log(error);
        window.alert("please provide valid crediantials")
      });
  }



  return (
    <div className="Auth_container">
      <form onSubmit={ isSignup? handleSignUp : handleSignin } className="form_auth">
        <Box
          maxWidth={400}
          display="flex"
          flexDirection={"column"}
          alignItems="center"
          justifyContent={"center"}
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          margin="auto"
          marginTop={5}
          borderRadius={10}
          
        >
          <Typography variant="h3" padding={3} textAlign="center">
            {isSignup ? "Sign Up" : "Sign In"}
          </Typography>
          {isSignup && (
            <TextField
              name="name"
              onChange={handleChange}
              placeholder="Username"
              value={inputs.name}
              margin="normal"
              required
              
            />
          )}
          <TextField
            name="email"
            onChange={handleChange}
            type={"email"}
            value={inputs.email}
            placeholder="Email"
            margin="normal"
            required
          />
          <TextField
            name="password"
            onChange={handleChange}
            type={"password"}
            value={inputs.password}
            placeholder="Password"
            margin="normal"
            required
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ borderRadius: 3, marginTop: 3 }}
            color="warning"
          >
            {isSignup ? "Create Account" : "Sign In"}
          </Button>
          <Button
            onClick={() => setIsSignup(!isSignup)}
            variant="contained"
            sx={{ borderRadius: 3, marginTop: 2 }}
            color="warning"
          >
            {isSignup ? "have an Account? Sign In" : "New User? Register Now"}
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Auth;