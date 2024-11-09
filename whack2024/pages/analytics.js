// pages/analytics.js
import { useEffect, useState } from 'react';

export default function Analytics() {
    const [analyticsData, setAnalyticsData] = useState(null);

    useEffect(() => {
        async function fetchAnalyticsData() {
            try {
                const response = await fetch('/api/analytics');
                const data = await response.json();
                setAnalyticsData(data);
            } catch (error) {
                console.error('Error fetching analytics data:', error);
            }
        }
        fetchAnalyticsData();
    }, []);

    return (
        <div>
            <h1>Google Analytics Data</h1>
            {analyticsData ? (
                <pre>{JSON.stringify(analyticsData, null, 2)}</pre>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}
