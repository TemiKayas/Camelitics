// app/page.js
import React from 'react';

async function fetchAnalyticsData() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/analytics`);
    if (!res.ok) throw new Error('Failed to fetch analytics data');
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching analytics data:', error);
    return null; // Return null if fetching fails
  }
}

export default async function HomePage() {
  const analyticsData = await fetchAnalyticsData();

  return (
      <div style={{ padding: '2rem' }}>
        <h1>Google Analytics Data</h1>
        {analyticsData ? (
            <pre>{JSON.stringify(analyticsData, null, 2)}</pre>
        ) : (
            <p>No data available. (This could be due to a lack of API data or a setup issue)</p>
        )}
      </div>
  );
}
