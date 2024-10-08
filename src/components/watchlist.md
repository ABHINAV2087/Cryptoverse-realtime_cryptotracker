<Row gutter={[12, 12]} className="crypto-card-container">
            {watchlistCoins.length > 0 ? (
                watchlistCoins.map((coin) => (
                    <Col xs={24} sm={12} lg={6} className="crypto-card" key={coin.id}>
                        <Card
                            className="coin-card-container"
                            title={
                                <div>
                                    <span className="coin-rank">{coin.market_cap_rank}.</span>
                                    <span className="coin-name">{coin.name}</span>
                                </div>
                            }
                            extra={<img className="crypto-image" src={coin.image} alt={coin.name} />}
                            hoverable
                            onClick={() => window.location.href = `/crypto/${coin.id}`}
                        >
                            <p>
                                <span>Price: </span>
                                <span style={{ color: 'blue' }}>
                                    ${millify(coin.current_price)}
                                </span>
                            </p>
                            <p>
                                <span>Market Cap: </span>
                                <span style={{ color: 'blue' }}>
                                    ${millify(coin.market_cap)}
                                </span>
                            </p>
                            <p>
                                <span>24h Change: </span>
                                <span style={{ color: coin.price_change_percentage_24h < 0 ? 'red' : 'green' }}>
                                    {coin.price_change_percentage_24h}%
                                </span>
                            </p>
                            <div style={{ padding: "20px" }}>
                                <Button
                                    type="primary"
                                    style={{
                                        marginTop: '25px',
                                        width: '100%',
                                        backgroundColor: 'red', // Remove color for removal button
                                    }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleRemoveFromWatchlist(coin);
                                    }}
                                >
                                    <FolderAddOutlined />
                                    Remove from Watchlist
                                </Button>
                            </div>
                        </Card>
                    </Col>
                ))
            ) : (
                <Col span={24} style={{ textAlign: 'center', display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <h2>No coins in your watchlist!</h2>
                </Col>
            )}
        </Row>