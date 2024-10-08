import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Spin, Typography, Select } from 'antd';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);



const { Title: AntTitle } = Typography;
import { useGetCryptoHistoryQuery } from '../services/cryptoApi';
import { useParams } from 'react-router-dom';

function LineChart({ id, vsCurrency }) {
  const timeOptions = ['3h', '24h', '7d', '30d', '3m', '1y'];
  const [timeperiod, setTimeperiod] = useState('7d');
  const [historicData, setHistoricData] = useState([]);
  const [flag, setFlag] = useState(false); 

  const timePeriodMapping = {
    '3h': '3h',
    '24h': '24h',
    '7d': '7d',
    '30d': '30d',
    '1y': '365d',
    '3m': '90d',
  };

  const selectedTimePeriod = timePeriodMapping[timeperiod];
  const { data, isFetching } = useGetCryptoHistoryQuery({ coinId: id, vsCurrency, timeperiod: selectedTimePeriod });

  useEffect(() => {
    if (data) {
      console.log('API Data:', data); 
      setHistoricData(data.prices);
      setFlag(true); 
    }
  }, [data]);

  return (
    <div>
      <Select
        defaultValue="7d"
        className="select-timeperiod"
        placeholder="Select Time Period"
        onChange={(value) => setTimeperiod(value)}>
        {timeOptions.map((option) => <Select.Option key={option}>{option}</Select.Option>)}
      </Select>

     
      {!historicData.length || flag === false ? (
        <Spin size="large" tip="Loading..." style={{ display: 'block', margin: '20px auto' }} /> // Use Spin for loading
      ) : (
        <Line
          key={timeperiod}
          data={{
            labels: historicData.map((coin) => {
              let date = new Date(coin[0]);
              let time =
                date.getHours() > 12
                  ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                  : `${date.getHours()}:${date.getMinutes()} AM`;
              return selectedTimePeriod === '3h' || selectedTimePeriod === '24h' ? time : date.toLocaleDateString();
            }),
            datasets: [
              {
                data: historicData.map((coin) => coin[1]),
                label: `Price (Past ${timeperiod}) in ${vsCurrency}`,
                borderColor: "#6FE1E1",
              },
            ],
          }}
          options={{
            elements: {
              point: {
                radius: 1,
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default LineChart;
