import React, { useEffect, useState, useCallback } from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Select, Button } from 'antd';
import { useGetCryptosQuery } from '../services/cryptoApi';
import debounce from 'lodash.debounce';
import Loader from './Loader';
import { CryptoState } from '../CryptoContext';
import { FolderAddOutlined } from '@ant-design/icons';
import Input from '@mui/joy/Input';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { toast } from 'react-toastify';

const { Option } = Select;

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currency, setCurrency] = useState('usd');
  const [page, setPage] = useState(1);
  const [allCryptos, setAllCryptos] = useState([]);
  const { user, watchlist,setWatchlist } = CryptoState();







  const addToWatchlist = async (coin) => {
    const coinRef = doc(db, 'watchlist', user.uid);
    
    try {
      let updatedWatchlist;
  
      if (watchlist?.includes(coin.id)) {
       
        updatedWatchlist = watchlist.filter((id) => id !== coin.id);
        toast.success(`${coin.name} removed from watchlist`);
      } else {
      
        updatedWatchlist = watchlist ? [...watchlist, coin.id] : [coin.id];
        toast.success(`${coin.name} added to watchlist`);
      }
  
      await setDoc(coinRef, { coins: updatedWatchlist });
      
     
      setWatchlist(updatedWatchlist);
      
    } catch (error) {
      toast.error(`Failed to update watchlist for ${coin.name}: ${error.message}`);
    }
  };
  


  const currencySymbols = {
    usd: '$',
    eur: '€',
    gbp: '£',
    inr: '₹',
  };

  const { data: cryptosList, isFetching } = useGetCryptosQuery({
    vsCurrency: currency,
    count,
    page,
  });

  useEffect(() => {
    if (cryptosList?.length) {
      setCryptos((prev) => {
        const existingIds = new Set(prev.map((crypto) => crypto.id));
        const newCryptos = cryptosList.filter(
          (crypto) => !existingIds.has(crypto.id)
        );
        return [...prev, ...newCryptos];
      });
      setAllCryptos((prev) => {
        const existingIds = new Set(prev.map((crypto) => crypto.id));
        const newCryptos = cryptosList.filter(
          (crypto) => !existingIds.has(crypto.id)
        );
        return [...prev, ...newCryptos];
      });
    }
  }, [cryptosList, page]);

  const debouncedSearch = useCallback(
    debounce((value) => {
      setSearchTerm(value);
    }, 300),
    []
  );

  const handleSearchChange = (e) => {
    debouncedSearch(e.target.value);
  };

  const handleCurrencyChange = (value) => {
    setCurrency(value);
    setPage(1);
    setCryptos([]);
    setAllCryptos([]);
  };

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  const filteredCryptos = allCryptos.filter((currencyItem) =>
    currencyItem.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isFetching) return <Loader />;

  return (
    <>
      {!simplified && (
        <div className="search-crypto">
          <Input
            placeholder="Search Cryptocurrency"
            onChange={handleSearchChange}
            sx={{
              width: '100%',
              maxWidth: '500px',
              padding: '5px 16px',
            }}
          />
          <Select
            defaultValue="usd"
            style={{ width: 120, marginLeft: '10px' }}
            onChange={handleCurrencyChange}
          >
            <Option value="usd">USD</Option>
            <Option value="eur">EUR</Option>
            <Option value="gbp">GBP</Option>
            <Option value="inr">INR</Option>
          </Select>
        </div>
      )}
      <Row gutter={[12, 12]} className="crypto-card-container">
      {filteredCryptos.map((currencyItem) => {
  const inWatchlist = watchlist?.includes(currencyItem.id) || false; 
  return (
    <Col xs={24} sm={12} lg={6} className="crypto-card" key={currencyItem.id}>
      <Card
        className="coin-card-container"
        title={
          <div>
            <span className="coin-rank">{currencyItem.market_cap_rank}.</span>
            <span className="coin-name">{currencyItem.name}</span>
          </div>
        }
        extra={
          <img
            className="crypto-image"
            src={currencyItem.image}
            alt={currencyItem.name}
          />
        }
        hoverable
        onClick={() => window.location.href = `/crypto/${currencyItem.id}`}
      >
        <p>
          <span>Price  </span>
          <span style={{ color: 'blue' }}>
            {currencySymbols[currency]} {millify(currencyItem.current_price)}
          </span>
        </p>
        <p>
          <span>Market Cap </span>
          <span style={{ color: 'blue' }}>
            {currencySymbols[currency]} {millify(currencyItem.market_cap)}
          </span>
        </p>
        <p>
          <span>24h Change  </span>
          <span style={{ color: currencyItem.price_change_percentage_24h < 0 ? 'red' : 'green' }}>
            {currencyItem.price_change_percentage_24h}%
          </span>
        </p>
        {user && (
          <div style={{ padding: "20px" }}>
            <Button
              type="primary"
              style={{
                marginTop: '25px',
                width: '100%',
                backgroundColor: inWatchlist ? '#bf0f3b' : 'green',
              }}
              onClick={(e) => {
                e.stopPropagation();
                addToWatchlist(currencyItem);
              }}
            >
              <FolderAddOutlined />
              {inWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
            </Button>
          </div>
        )}
      </Card>
    </Col>
  );
})}


      </Row>
      {!simplified && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Button onClick={handleLoadMore} type="primary">
            Load More
          </Button>
        </div>
      )}
    </>
  );
};

export default Cryptocurrencies;
