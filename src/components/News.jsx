import React, { useState, useEffect, useCallback } from 'react';
import { Row, Col, Button } from 'antd';
import moment from 'moment';
import debounce from 'lodash.debounce'; // Import debounce for search functionality
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';

import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Divider from '@mui/joy/Divider';
import Typography from '@mui/joy/Typography';
import Input from '@mui/joy/Input'; // Import input from MUI

// Demo image if no thumbnail is available
const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';

function News({ simplified }) {
  const count = simplified ? 6 : 12; // Show fewer articles if simplified
  const [page, setPage] = useState(1); // Track current page
  const [newsArticles, setNewsArticles] = useState([]); // State to store all news articles
  const [searchTerm, setSearchTerm] = useState(''); // State for search term

  // Fetch crypto news based on current page
  const { data: cryptoNews, error, isFetching } = useGetCryptoNewsQuery({ count, page });

  // Update news articles when new data is fetched
  useEffect(() => {
    if (cryptoNews?.data) {
      setNewsArticles((prev) => [...prev, ...cryptoNews.data]);
    }
  }, [cryptoNews]);

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((value) => {
      setSearchTerm(value); // Set search term after debounce delay
    }, 300), // 300ms debounce delay
    []
  );

  // Handle search input changes
  const handleSearchChange = (e) => {
    debouncedSearch(e.target.value); // Call debounced function
  };

  // Filtered news articles based on search term
  const filteredNews = newsArticles.filter((news) =>
    news.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Limit the number of news articles when simplified is true
  const displayedNews = simplified ? filteredNews.slice(0, 6) : filteredNews;

  // Handle error state
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {/* Search Bar */}
      {!simplified && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '20px',
            minHeight: '100px', // Adjust height as necessary
          }}
        >
          <Input
            placeholder="Search news..."
            onChange={handleSearchChange}
            sx={{
              width: '30%',
              '&::before': {
                border: '1.5px solid var(--Input-focusedHighlight)',
                transform: 'scaleX(0)',
                transition: 'transform .15s cubic-bezier(0.1,0.9,0.2,1)',
              },
              '&:focus-within::before': {
                transform: 'scaleX(1)',
              },
            }}
          />
        </div>
      )}

      {/* News Cards */}
      <Row gutter={[24, 24]}>
        {displayedNews.map((news, i) => (
          <Col xs={24} sm={12} lg={8} key={i}>
            <a href={news.url} target="_blank" rel="noreferrer">
              <Card
                variant="outlined"
                sx={{
                  width: 350,
                  transition: '0.3s', // Smooth transition
                  '&:hover': {
                    transform: 'scale(0.99)', // Scale down on hover
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)', // Add shadow on hover
                  },
                }}
              >
                <CardOverflow>
                  <AspectRatio ratio="2">
                    <img
                      src={news.thumbnail || demoImage}
                      loading="lazy"
                      alt="news thumbnail"
                    />
                  </AspectRatio>
                </CardOverflow>
                <CardContent>
                  <Typography level="title-md">{news.title}</Typography>
                  <Typography level="body-sm">
                    {news.description.length > 100
                      ? `${news.description.substring(0, 100)}...`
                      : news.description}
                  </Typography>
                </CardContent>
                <CardOverflow variant="soft" sx={{ bgcolor: 'background.level1' }}>
                  <Divider inset="context" />
                  <CardContent orientation="horizontal">
                    <Typography
                      level="body-xs"
                      textColor="text.secondary"
                      sx={{ fontWeight: 'md' }}
                    >
                      {news.provider?.[0]?.name || 'Unknown author'}
                    </Typography>
                    <Divider orientation="vertical" />
                    <Typography
                      level="body-xs"
                      textColor="text.secondary"
                      sx={{ fontWeight: 'md' }}
                    >
                      Posted: {moment(news.createdAt).startOf('ss').fromNow()}
                    </Typography>
                  </CardContent>
                </CardOverflow>
              </Card>
            </a>
          </Col>
        ))}
      </Row>

      {/* Load More Button */}
      {!simplified && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Button onClick={() => setPage((prev) => prev + 1)} type="primary" loading={isFetching}>
            Load More
          </Button>
        </div>
      )}
    </div>
  );
}

export default News;
