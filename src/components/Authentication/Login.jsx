import React, { useState } from 'react';
import { Box, Button, TextField } from "@mui/material";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from 'firebase/auth';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    if (!email || !password) {
      toast.error("All fields are required!");
      return;
    }

    try {
      
      const result = await signInWithEmailAndPassword(auth, email, password);

      
      toast.success(`Login successful! Welcome back ${result.user.email}`);
    } catch (error) {
      
      if (error.code === 'auth/wrong-password') {
        toast.error("Incorrect password!");
      } else if (error.code === 'auth/user-not-found') {
        toast.error("User not found! Please check your email.");
      } else if (error.code === 'auth/invalid-email') {
        toast.error("Invalid email format!");
      } else {
        toast.error("Login failed. Please try again.");
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Box
        p={3}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <TextField
          variant="outlined"
          type="email"
          label="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          InputProps={{
            style: { color: 'white' },
          }}
          InputLabelProps={{
            style: { color: '#9af5c8' },
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "white",
              },
              "&:hover fieldset": {
                borderColor: "white",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#05b0fa",
              },
            },
          }}
        />
        <TextField
          variant="outlined"
          label="Enter Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          InputProps={{
            style: { color: 'white' },
          }}
          InputLabelProps={{
            style: { color: '#9af5c8' },
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "white",
              },
              "&:hover fieldset": {
                borderColor: "white",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#05b0fa",
              },
            },
          }}
        />
        <Button
          variant="contained"
          size="large"
          style={{ backgroundColor: "#05b0fa", marginTop: "40px", borderRadius: "15px" }}
          type="submit"
        >
          Login
        </Button>
      </Box>
    </form>
  );
}

export default Login;
