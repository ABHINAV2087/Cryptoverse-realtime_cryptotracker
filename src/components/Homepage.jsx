import React from 'react';
import millify from 'millify';
import { Typography, Row, Col, Statistic } from 'antd';
import { useGetCryptoStatsQuery } from '../services/cryptoApi';

import { Link } from 'react-router-dom';
const { Title } = Typography;

import Cryptocurrencies from './Cryptocurrencies';
import News from './News';
import Loader from './Loader';

function Homepage() {
  // Fetch global crypto stats
  const { data, isFetching } = useGetCryptoStatsQuery();

  // Access the stats from data object (data.data contains the response)
  const globalStats = data?.data || {};

  if (isFetching) return <Loader />;

  return (
    <>
      <div className='home-top'>
        <Title level={2} className="heading" >Global Crypto Stats</Title>
        <Row className='head-data-home' gutter={[16, 16]}>
          <Col xs={20} sm={12} lg={8}>
            <Statistic title="Total Cryptocurrencies" value={globalStats.active_cryptocurrencies} 
              valueStyle={{
                color: 'blue',
              }} 
            />
          </Col>
          <Col xs={24} sm={12} lg={8}>
            <Statistic title="Total Exchanges" value={millify(globalStats.markets)}
            valueStyle={{
                color: 'blue',
              }} 
               />
          </Col>
          <Col xs={24} sm={12} lg={8}>
            <Statistic title="Total Market Cap (USD)" value={millify(globalStats.total_market_cap.usd)} 
              valueStyle={{
                color: 'blue',
              }} 
            />
          </Col>
          <Col xs={24} sm={12} lg={8}>
            <Statistic title="Total 24h Volume (USD)" value={millify(globalStats.total_volume.usd)}
              valueStyle={{
                color: 'blue',
              }}
            />
          </Col>
          <Col xs={24} sm={12} lg={8}>
            <Statistic
              title="Market Cap Change (24h)"
              value={`${millify(globalStats.market_cap_change_percentage_24h_usd)}%`}
              valueStyle={{
                color: globalStats.market_cap_change_percentage_24h_usd < 0 ? 'red' : 'green',
              }}
            />
          </Col>

          <Col xs={24} sm={12} lg={8}>
            <Statistic
              title="Last Updated"
              value={new Date(globalStats.updated_at * 1000).toLocaleString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false, // Set to true for 12-hour format
              })}
              valueStyle={{
                color: 'green ',
              }} 
            />
          </Col>
        </Row>
      </div>
      <div className="home-heading-container">
        <Title  className="home-title">Top 10 Cryptos In The World</Title>
        <Title  className="show-more">
          <Link to="/cryptocurrencies">Show more</Link>
        </Title>
      </div>
      <Cryptocurrencies simplified={true} />
      <div className="home-heading-container">
        <Title  className="home-title">Latest Crypto News</Title>
        <Title className="show-more" ><Link to="/news">Show more</Link></Title>
      </div>
      <News simplified={true} />
    </>
  );
}

export default Homepage;
