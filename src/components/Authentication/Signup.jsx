import React, { useState } from 'react';
import { Box, Button, TextField } from "@mui/material";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

function Signup() {

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false); // For loading state

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !username || !password || !confirmPassword) {
      toast.error("All fields are required!");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    setLoading(true); // Start loading
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update the user profile with the username
      await updateProfile(result.user, { displayName: username });

      toast.success(`Sign up successful! Welcome ${result.user.displayName}`);
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        toast.error("Email is already in use!");
      } else if (error.code === 'auth/invalid-email') {
        toast.error("Invalid email format!");
      } else if (error.code === 'auth/weak-password') {
        toast.error("Password is too weak!");
      } else {
        toast.error("Sign up failed. Please try again!");
      }
    } finally {
      setLoading(false); // Stop loading
    }
  };

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
          type="text"
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
        <TextField
          variant="outlined"
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
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
          style={{ backgroundColor: "#05b0fa", marginTop: "20px", borderRadius: "15px" }}
          type="submit"
          disabled={loading} // Disable button when loading
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </Button>
      </Box>
    </form>
  );
}

export default Signup;
