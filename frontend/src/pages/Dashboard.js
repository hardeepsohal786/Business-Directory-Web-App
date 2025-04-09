import { useEffect, useState } from 'react';
import API from '../api';
import ChartComponent from '../components/Chart';

const Dashboard = () => {
  const [businesses, setBusinesses] = useState([]);

  useEffect(() => {
    API.get('/businesses').then(res => setBusinesses(res.data));
  }, []);

  return (
    <div>
      <h1>Businesses</h1>
      {businesses.map(b => (
        <div key={b._id}>
          <h3>{b.name}</h3>
          <p>{b.description}</p>
          <ChartComponent data={[{ year: '2023', revenue: 300000 }, { year: '2024', revenue: 500000 }]} />
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
