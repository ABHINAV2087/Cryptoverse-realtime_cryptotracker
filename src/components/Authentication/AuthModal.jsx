import React, { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { Button } from 'antd';
import { LoginOutlined } from '@ant-design/icons';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Login from './Login';
import Signup from './Signup';
import GoogleButton from "react-google-button";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";
import { toast } from 'react-toastify';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    maxWidth: 600,
    bgcolor: 'black',
    border: '2px solid #000',
    borderRadius: "15px",
    boxShadow: 24,
    p: 4,
};

const googleProvider = new GoogleAuthProvider(); // Define the googleProvider

export default function AuthModal() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const signInWithGoogle = () => {
        signInWithPopup(auth, googleProvider)
            .then((res) => {
                toast.success(`Login successful! Welcome back ${res.user.email}`);
               
            })
            .catch((error) => {
                toast.error(error.message);
            });
    };

    return (
        <div>
            <Button onClick={handleOpen} type="primary" style={{ width: "80%", margin: '20px', padding: "20px" }}>
                <LoginOutlined />
                Login
            </Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{ timeout: 500 }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <TabContext value={value}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider', color: "white" }} style={{ display: "flex", justifyContent: "center" }}>
                                <TabList onChange={handleChange} aria-label="lab API tabs example" style={{ backgroundColor: "white", borderRadius: "10px", display: "flex", justifyContent: "center", padding: "0px 40px" }}>
                                    <Tab label="Login" value="1" />
                                    <Tab label="Sign Up" value="2" />
                                </TabList>
                            </Box>
                            <TabPanel value="1">
                                <Login />
                            </TabPanel>
                            <TabPanel value="2">
                                <Signup />
                            </TabPanel>
                            <Box style={{
                                padding: 4,
                                paddingTop: 0,
                                display: "flex",
                                flexDirection: "column",
                                textAlign: "center",
                                gap: 20,
                                fontSize: 20,
                                color: "white"
                            }}>
                                <span>OR</span>
                                <GoogleButton
                                    style={{ width: "100%", outline: "none" }}
                                    onClick={signInWithGoogle}
                                />
                            </Box>
                        </TabContext>
                    </Box>
                </Fade>

            </Modal>
        </div>
    );
}
