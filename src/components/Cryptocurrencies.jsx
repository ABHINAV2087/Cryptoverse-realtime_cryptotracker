import React, { useEffect, useState, useCallback } from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Select, Button } from 'antd';
import { useGetCryptosQuery } from '../services/cryptoApi';
import debounce from 'lodash.debounce'; // Import debounce from lodash
import Loader from './Loader';

const { Option } = Select;

import Input from '@mui/joy/Input';

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100; // 10 for homepage, more for full list
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currency, setCurrency] = useState('usd');
  const [page, setPage] = useState(1); // Pagination state
  const [allCryptos, setAllCryptos] = useState([]); // State for all cryptocurrencies

  // Mapping of currency symbols
  const currencySymbols = {
    usd: '$',
    eur: '€',
    gbp: '£',
    inr: '₹',
  };

  // Fetch cryptos based on selected currency and page
  const { data: cryptosList, isFetching } = useGetCryptosQuery({
    vsCurrency: currency,
    count,
    page,
  });

  // This useEffect should set cryptos only when new data comes in, avoiding duplicates
  useEffect(() => {
    if (cryptosList?.length) {
      setCryptos((prev) => {
        const existingIds = new Set(prev.map((crypto) => crypto.id)); // Get IDs of already loaded cryptos
        const newCryptos = cryptosList.filter((crypto) => !existingIds.has(crypto.id)); // Filter out duplicates
        return [...prev, ...newCryptos]; // Append only new cryptos
      });
      setAllCryptos((prev) => {
        const existingIds = new Set(prev.map((crypto) => crypto.id));
        const newCryptos = cryptosList.filter((crypto) => !existingIds.has(crypto.id));
        return [...prev, ...newCryptos];
      });
    }
  }, [cryptosList, page]);

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((value) => {
      setSearchTerm(value);
    }, 300), // Adjust delay as needed (e.g., 300ms)
    []
  );

  const handleSearchChange = (e) => {
    debouncedSearch(e.target.value); // Call the debounced function
  };

  // Handle currency change
  const handleCurrencyChange = (value) => {
    setCurrency(value);
    setPage(1); // Reset page when currency changes
    setCryptos([]); // Clear the current cryptos list
    setAllCryptos([]); // Clear all cryptocurrencies
  };

  // Handle Load More (Pagination)
  const handleLoadMore = () => {
    setPage((prev) => prev + 1); // Increment the page number to load more cryptos
  };

  // Filter based on search term
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
              width: '100%', // You can change this to any specific width like '300px', '50%', etc.
              maxWidth: '500px', // Optional: Set a maximum width
              padding: '5px 16px',
              '&::before': {
                border: '1.5px solid var(--Input-focusedHighlight)',
                transform: 'scaleX(0)',
                left: '2.5px',
                right: '2.5px',
                bottom: 0,
                top: 'unset',
                transition: 'transform .15s cubic-bezier(0.1,0.9,0.2,1)',
                borderRadius: 0,
                borderBottomLeftRadius: '64px 20px',
                borderBottomRightRadius: '64px 20px',
              },
              '&:focus-within::before': {
                transform: 'scaleX(1)',
              },
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

      {/* Display crypto cards */}
      <Row gutter={[12, 12]} className="crypto-card-container">
        {filteredCryptos.map((currencyItem) => (
          <Col
            xs={24}
            sm={12}
            lg={6}
            className="crypto-card"
            key={currencyItem.id}
          >
            <Link to={`/crypto/${currencyItem.id}`}>
              <Card
                className='coin-card-container'
                title={
                  <div>
                    <span className='coin-rank'>{currencyItem.market_cap_rank}.</span>
                    <span className='coin-name'>{currencyItem.name}</span>
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
              >
                <p>
                  <span>Price  </span>
                  <span style={{ color: "blue" }}>{currencySymbols[currency]} {millify(currencyItem.current_price)}</span>
                </p>
                <p>
                  <span>Market Cap </span>
                  <span style={{ color: "blue" }}>{currencySymbols[currency]} {millify(currencyItem.market_cap)}</span>
                </p>
                <p>
                  <span>24h Change  </span>
                  <span style={{ color: currencyItem.price_change_percentage_24h < 0 ? 'red' : 'green' }}>
                    {currencyItem.price_change_percentage_24h}%
                  </span>
                </p>
              </Card>

            </Link>
          </Col>
        ))}
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
