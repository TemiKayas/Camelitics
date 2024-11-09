// pages/api/analytics.js
import { google } from 'googleapis';
import path from 'path';

export default async function handler(req, res) {
    if (process.env.USE_MOCK_DATA === 'true') {
        // Return mock data for testing
        return res.status(200).json({
            rows: [
                { date: '2024-01-01', sessions: 123 },
                { date: '2024-01-02', sessions: 456 },
            ],
        });
    }

    const auth = new google.auth.GoogleAuth({
        keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
        scopes: ['https://www.googleapis.com/auth/analytics.readonly'],
    });

    try {
        const analyticsData = google.analyticsdata({ version: 'v1beta', auth });
        const response = await analyticsData.properties.runReport({
            property: `properties/${process.env.GA_PROPERTY_ID}`,
            requestBody: {
                dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }],
                metrics: [{ name: 'sessions' }],
                dimensions: [{ name: 'date' }],
            },
        });
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error fetching analytics data:', error);
        res.status(500).json({ error: 'Failed to retrieve Google Analytics data' });
    }
}
