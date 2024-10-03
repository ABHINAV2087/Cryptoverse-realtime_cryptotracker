import react from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Layout, Typography, Space } from 'antd';

import './App.css'
import { Navbar, Homepage, CryptoDetails, Cryptocurrencies, News, Exchanges } from './components';

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
              <Route path="/news" element={<News />} />
            </Routes>
          </div>
        </Layout>
        <div className="footer">
          <Space style={{display:"flex",gap:"20px"}}>
            <Link to="/">Home</Link>
            <Link to="/exchanges">Exchanges</Link>
            <Link to="/news">News</Link>
          </Space>
          <Typography.Title level={5  } style={{ color: 'white', textAlign: 'center' }}>Made with ❤️ by <b><i>ABHINAV TIROLE</i></b><br />Copyright © 2024
          </Typography.Title>
        </div>
      </div>
    </div>
  )
}

export default App
