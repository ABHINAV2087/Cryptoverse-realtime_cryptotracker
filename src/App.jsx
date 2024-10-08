import react from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Layout, Typography, Space } from 'antd';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'
import { Navbar, Homepage, CryptoDetails, Cryptocurrencies, News, Exchanges } from './components';
import Watchlist from './components/Watchlist';

const titleStyle = {
  color: 'white',
  textAlign: 'center',
  fontSize: '18px', // Default font size
  '@media (max-width: 768px)': { // For tablets and smaller
    fontSize: '14px',
  },
  '@media (max-width: 480px)': { // For mobile devices
    fontSize: '12px',
  },
};

function App() {


  return (
    <div className='app'>
      <div className="navbar">
        <Navbar />
      </div>
      <div className="main">
        <Layout>
          <div className='routes'>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/exchanges" element={<Exchanges />} />
              <Route path="/cryptocurrencies" element={<Cryptocurrencies />} />
              <Route path="/crypto/:id" element={<CryptoDetails />} />
              <Route path="/watchlist" element={<Watchlist />} />
            </Routes>
          </div>
        </Layout>
        <div className="footer">
          <Space style={{ display: "flex", gap: "20px" }}>
            <Link to="/">Home</Link>
            <Link to="/exchanges">Exchanges</Link>
            <Link to="/news">News</Link>
            
          </Space>
          <h1
            
            style={{
              color: 'white',
              textAlign: 'center',
              fontSize: '1.2rem', // Default font size
            }}
            className="footer-text"
          >
            Made with ❤️ by <b><i>ABHINAV TIROLE</i></b><br />
            Copyright © 2024
            </h1>

        </div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>

    </div>
  )
}

export default App
