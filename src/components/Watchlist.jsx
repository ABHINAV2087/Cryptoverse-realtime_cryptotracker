import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Select } from 'antd';
import { useGetCryptosQuery } from '../services/cryptoApi';
import { CryptoState } from '../CryptoContext';
import { toast } from 'react-toastify';
import Loader from './Loader';
import millify from 'millify';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

const { Option } = Select;

const Watchlist = () => {
    const { user, watchlist, setWatchlist } = CryptoState();
    const [watchlistCoins, setWatchlistCoins] = useState([]);
    const [currency, setCurrency] = useState('usd');
    const { data: cryptosList, isFetching } = useGetCryptosQuery({ vsCurrency: currency, count: 100 });

    useEffect(() => {
        if (cryptosList) {
            const filteredCoins = cryptosList.filter(coin => watchlist.includes(coin.id));
            setWatchlistCoins(filteredCoins);
        }
    }, [cryptosList, watchlist]);

    const handleRemoveFromWatchlist = async (coin) => {
        const coinRef = doc(db, 'watchlist', user.uid);

        try {
            const updatedWatchlist = watchlist.filter((id) => id !== coin.id);
            await updateDoc(coinRef, { coins: updatedWatchlist });
            setWatchlist(updatedWatchlist);
            toast.success(`${coin.name} removed from watchlist`);
        } catch (error) {
            toast.error(`Failed to remove ${coin.name} from watchlist: ${error.message}`);
        }
    };

    const handleCurrencyChange = (value) => {
        setCurrency(value);
    };

    if (isFetching) return <Loader />;

    return (
        <div className="watchlist-container">
            <div className="currency-container">
                <label htmlFor="currency-select" className="currency-label">
                    Select Currency:
                </label>
                <Select
                    id="currency-select"
                    defaultValue="usd"
                    className="currency-select"
                    onChange={handleCurrencyChange}
                >
                    <Option value="usd">USD</Option>
                    <Option value="eur">EUR</Option>
                    <Option value="gbp">GBP</Option>
                    <Option value="inr">INR</Option>
                </Select>
            </div>

            {/* Watchlist Table Header */}
            <Row className="watchlist-header">
                <Col xs={6} sm={5} md={5} lg={5}>Coin</Col>
                <Col xs={6} sm={5} md={4} lg={4}>Current Price</Col>
                <Col xs={6} sm={5} md={4} lg={4}>24h High</Col>
                <Col xs={6} sm={5} md={4} lg={4}>24h Low</Col>
                
            </Row>

            {/* Watchlist Coins Display */}
            {watchlistCoins.length > 0 ? (
                watchlistCoins.map((coin) => (
                    <Row key={coin.id} className="watchlist-row">
                        <Col xs={6} sm={5} md={5} lg={5} className="coin-name">
                            <img src={coin.image} alt={coin.name} className="coin-img" />
                            {coin.name}
                        </Col>
                        <Col xs={6} sm={5} md={4} lg={4}>{millify(coin.current_price)}</Col>
                        <Col xs={6} sm={5} md={4} lg={4}>{coin.high_24h}</Col>
                        <Col xs={6} sm={5} md={4} lg={4}>{coin.low_24h}</Col>
                        <Col xs={12} sm={4} md={4} lg={4} className='remove-btn-container'>
                          
                            <Button
                                type="danger"
                                className="remove-btn"
                                onClick={() => handleRemoveFromWatchlist(coin)}
                            >
                                Remove
                            </Button>
                        </Col>
                    </Row>
                ))
            ) : (
                <Row className="no-coins-row">
                    <h2>No coins in your watchlist!</h2>
                </Row>
            )}
        </div>
    );
};

export default Watchlist;
