import React, { useState, useEffect } from 'react';
import { Button, Menu, Typography, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined, MoneyCollectOutlined, BulbOutlined, FundOutlined, MenuOutlined, LogoutOutlined, UserOutlined , UnorderedListOutlined} from '@ant-design/icons';

import icon from '../assets/logo.png';
import AuthModal from './Authentication/AuthModal';
import { CryptoState } from '../CryptoContext';

import { auth } from '../firebase'; // Adjust the path if necessary
import { signOut } from 'firebase/auth'; // Import signOut function

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(window.innerWidth);

  const { user } = CryptoState(); // Ensure user is correctly destructured

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Update activeMenu based on screen size
    setActiveMenu(screenSize > 1200);
  }, [screenSize]);

  const handleLogout = async () => {
    try {
      await signOut(auth); // Call Firebase signOut method
      console.log("User logged out successfully");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="nav-container">
      <div className="logo-container">
        <Avatar src={icon} size="large" />
        <Typography.Title level={2} className="logo">
          <Link to="/">Cryptoverse</Link>
        </Typography.Title>
        <Button className="menu-control-container" onClick={() => setActiveMenu((prev) => !prev)}>
          <MenuOutlined />
        </Button>
      </div>
      {activeMenu && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <Menu className='nav-links' theme="dark" style={{ fontSize: '18px' }}>
            {user ? (
              <>
                <div
                  style={{
                    display: "flex",
                    height: "fitContent",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "12px",
                    fontSize: "20px",
                    backdropFilter: "blur(10px)", // Blur effect
                    backgroundColor: "rgba(255, 255, 255, 0.1)", // Semi-transparent white
                    borderRadius: "10px", // Rounded corners
                    padding: "10px 20px", // Padding for spacing
                    border: "1px solid rgba(255, 255, 255, 0.3)", // Light border
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)", // Subtle shadow
                    alignItems:"center",
                    margin:"1px 15px"
                  }}
                >
                  <UserOutlined style={{ fontSize: "24px" }} />
                  <Typography.Text
                    style={{
                      color: 'orange',
                      fontSize: "17px",
                      paddingBottom:"7px",
                      borderBottom: "1px solid grey", 
                      padding:"2px 7px",
                      textAlign:"center",
                      textTransform:"capitalize"

                    }}
                  >
                    Hello <br/>{user.displayName || user.email} {/* Display username or email */}
                  </Typography.Text>
                </div>

                <Button
                  key="logout"
                  onClick={handleLogout}
                  type="primary"
                  style={{ width: "80%", margin: '20px', padding: "20px" }}
                >
                  <LogoutOutlined />
                  Logout
                </Button>
              </>
            ) : (
              <div><AuthModal /></div>
            )}
            <Menu.Item icon={<HomeOutlined />}>
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item icon={<FundOutlined />}>
              <Link to="/cryptocurrencies">Cryptocurrencies</Link>
            </Menu.Item>
            <Menu.Item icon={<MoneyCollectOutlined />}>
              <Link to="/exchanges">Exchanges</Link>
            </Menu.Item>
            <Menu.Item icon={<BulbOutlined />}>
              <Link to="/news">News</Link>
            </Menu.Item>
            { user ? 
              <Menu.Item icon={<UnorderedListOutlined />}>
              <Link to="/watchlist">WatchList</Link>
            </Menu.Item> :
            " " }
          </Menu>
        </div>
      )}
    </div>
  );
};

export default Navbar;
