import React from 'react';
import millify from 'millify';
import { Collapse, Row, Col, Typography, Avatar } from 'antd';
import HTMLReactParser from 'html-react-parser';
import { LinkOutlined } from '@ant-design/icons';
import { useGetCryptosExchangesQuery } from '../services/cryptoApi';
import Loader from './Loader';

const { Text } = Typography;
const { Panel } = Collapse;

const Exchanges = () => {
  const { data, isFetching } = useGetCryptosExchangesQuery();
  const exchangesList = data;
  console.log(exchangesList)
  if (isFetching) return <Loader />;

  return (
    <>
      <Row style={{padding:'10px 15px',backgroundColor:'grey',paddingBottom:'20px',borderRadius:'15px'}}>
        <Col span={6} style={{fontSize:'20px'}}>Exchanges</Col>
        <Col span={6}  style={{fontSize:'20px'}}>24h Trade Volume</Col>
        <Col span={6}  style={{fontSize:'20px'}}>Trust Score</Col>
        <Col span={6}  style={{fontSize:'20px'}}>Visit</Col>
      </Row>
      <Row>
        {exchangesList.map((exchange) => (
          <Col span={24}>
            <Collapse>
              <Panel
                key={exchange.id}
                showArrow={false}
                header={(
                  <Row key={exchange.id}>
                    <Col span={6}>
                      <Text><strong>{exchange.trust_score_rank}.</strong></Text>
                      <Avatar className="exchange-image" src={exchange.image} />
                      <Text><strong>{exchange.name}</strong></Text>
                    </Col>
                    <Col span={6}>${millify(exchange.trade_volume_24h_btc)}</Col>
                    <Col span={6}>{exchange.trust_score}</Col>
                    <Col span={6}>
                      <a href={exchange.url} target="_blank">
                      <LinkOutlined />
                      </a>
                    </Col>
                  </Row>
                )}
              >
                {HTMLReactParser(exchange.description || '')}
              </Panel>
            </Collapse>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Exchanges;