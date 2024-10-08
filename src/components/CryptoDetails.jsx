import React, { useState } from 'react';
import HTMLReactParser from 'html-react-parser';
import { useParams } from 'react-router-dom';
import millify from 'millify';
import { Col, Row, Typography, Select } from 'antd';
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined, ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import Loader from './Loader';
import { useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } from '../services/cryptoApi';
import LineChart from './LineChart';

const { Title, Text } = Typography;
const { Option } = Select;

function CryptoDetails() {
  const { id } = useParams();
  const [selectedCurrency, setSelectedCurrency] = useState('usd'); 
  const { data, isFetching } = useGetCryptoDetailsQuery(id);

  // List of available currencies
  const currencyOptions = ['usd', 'eur', 'gbp', 'jpy', 'inr', 'aud', 'cad', 'cny'];
  const currencySymbols = {
    usd: '$', eur: '€', gbp: '£', jpy: '¥', inr: '₹', aud: 'A$', cad: 'C$', cny: '¥',
  };

  const handleCurrencyChange = (value) => setSelectedCurrency(value);

  if (isFetching) {
    return (
      <div style={{ textAlign: 'center', paddingTop: '50px' }}>
        <Spin size="large" tip="Loading..." />
      </div>
    );
  }

  // Style configurations for conditional coloring
  const getStyle = (statTitle) => {
    if (statTitle === 'Positive Sentiment') return { color: 'green' };
    if (statTitle === 'Negative Sentiment') return { color: 'red' };
    return { color: 'blue' };
  };

  // Statistics data
  const stats = [
    { title: 'Price to Currency', value: `${currencySymbols[selectedCurrency]}  ${millify(data?.market_data?.current_price?.[selectedCurrency])}`, icon: <DollarCircleOutlined /> },
    { title: 'Rank', value: data?.market_cap_rank, icon: <NumberOutlined /> },
    { title: '24h Volume', value: `${currencySymbols[selectedCurrency]}  ${millify(data?.market_data?.total_volume?.[selectedCurrency])}`, icon: <ThunderboltOutlined /> },
    { title: 'All-time-high', value: `${currencySymbols[selectedCurrency]}  ${millify(data?.market_data?.ath?.[selectedCurrency])}`, icon: <TrophyOutlined /> },
    { title: 'Negative Sentiment', value: `${data?.sentiment_votes_down_percentage}%`, icon: <ArrowDownOutlined /> },
    { title: 'Positive Sentiment', value: `${data?.sentiment_votes_up_percentage}%`, icon: <ArrowUpOutlined /> },
  ];

  const genericStats = [
    { title: 'Market Cap', value: `${currencySymbols[selectedCurrency]}  ${millify(data?.market_data?.market_cap?.[selectedCurrency])}`, icon: <FundOutlined /> },
    { title: 'Market Cap FDV ratio', value: data?.market_data.market_cap_fdv_ratio, icon: <MoneyCollectOutlined /> },
    { title: 'Circulating Supply', value: `${millify(data?.market_data?.circulating_supply)}`, icon: <ExclamationCircleOutlined /> },
    { title: 'Total Supply', value: `${millify(data?.market_data?.total_supply)}`, icon: <ExclamationCircleOutlined /> },
  ];
  if (isFetching) return <Loader />;
  return (
    <Col className="coin-detail-container">
      
      <Col className="coin-heading-container det" style={{ display: "flex", flexDirection: "row", justifyContent: 'space-around', alignContent: 'end' }}>
        <div>
          <Title level={2} className="coin-name" style={{ letterSpacing: "1px" }}>
            <img src={data.image.small} alt={`${data?.name} logo`} /> {data?.name} ({data?.symbol})
          </Title>
        </div>
        <div>
          <Select defaultValue="usd" className="select-currency" onChange={handleCurrencyChange}>
            {currencyOptions.map((currency) => (
              <Option key={currency} value={currency}>
                {currency.toUpperCase()}
              </Option>
            ))}
          </Select>
        </div>
      </Col>

      
      <Col className="stats-container">
        
        <Col className="coin-value-statistics">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">{data?.name} Value Statistics</Title>
            <p style={{ marginBottom: "25px",color: "grey" }}>An overview showing the statistics of {data?.name}, such as the base and quote currency, the rank, and trading volume.</p>
          </Col>
          {stats.map(({ icon, title, value }) => (
            <Col className="coin-stats" key={title}>
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats" style={getStyle(title)}>{value}</Text>
            </Col>
          ))}
        </Col>

   
        <Col className="other-stats-info">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">Other Stats Info</Title>
            <p style={{ marginBottom: "25px", color: "grey" }}>An overview showing additional statistics of {data?.name}, including market cap, supply, and more.</p>
          </Col>
          {genericStats.map(({ icon, title, value }) => (
            <Col className="coin-stats" key={title}>
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats" style={{ color: 'blue' }}>{value}</Text>
            </Col>
          ))}
        </Col>
      </Col>
      <LineChart id={id} vsCurrency={selectedCurrency} />
      
 
      <Col className="coin-desc-link">
        <Row className="coin-desc">
          <Title level={3} className="coin-details-heading">What is {data?.name}?</Title>
          {HTMLReactParser(data?.description?.en || '')}
        </Row>
        <Col className="coin-links">
          <Title level={3} className="coin-details-heading">{data?.name} Links</Title>
          <Row className="coin-link">
            <Title level={5} className="link-name">Website</Title>
            <a href={data.links.homepage[0]} target="_blank" rel="noreferrer">{data.links.homepage[0]}</a>
          </Row>
          <Row className="coin-link">
            <Title level={5} className="link-name">Github</Title>
            <a href={data.links.repos_url.github[0]} target="_blank" rel="noreferrer">https://github.com/{data.name}</a>
          </Row>
        </Col>
      </Col>
    </Col>
  );
}

export default CryptoDetails;
