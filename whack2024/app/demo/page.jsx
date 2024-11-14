'use client';
import { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import html2canvas from 'html2canvas';
import { Typography, Card, CardContent, Grid, Box, Tooltip as MuiTooltip, Button, Divider, IconButton } from '@mui/material';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';
import { Visibility, Pageview, TrendingUp, GroupAdd, CheckCircle, Percent, Home } from '@mui/icons-material';

// Styled Components for layout and theming
const PageContainer = styled(Box)`
    padding: 24px;
    background: linear-gradient(to bottom, #f9e4b7, #f4c29f); /* Soft desert gradient */
    background-image: url('/desertBackground.jpg'); /* Optional desert pattern image */
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;
    min-height: 100vh;
    font-family: 'Arial, sans-serif';
`;

const SectionTitle = styled(Typography)`
    font-size: 1.5rem;
    font-weight: bold;
    color: #b5651d; /* Warm brown color for desert theme */
    margin-bottom: 16px;
`;

const StyledCard = styled(Card)`
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
    margin-bottom: 24px;
    border-radius: 12px;
    padding: 16px;
    background-color: #fffaf0; /* Light, sandy color */
`;

const StatItem = styled(Box)`
    display: flex;
    align-items: center;
    margin: 8px 0;
    transition: transform 0.2s ease-in-out;
    &:hover {
        transform: translateY(-3px);
    }
`;

const StatIcon = styled(Box)`
    color: #b5651d; /* Desert brown color */
    margin-right: 12px;
    display: flex;
    align-items: center;
`;

const StatText = styled(Typography)`
    font-size: 1.25rem;
    font-weight: 500;
`;

const StatValue = styled(Typography)`
    font-size: 1.5rem;
    font-weight: bold;
    color: #8c4b1f; /* Darker desert color */
`;

const ChartContainer = styled.div`
    width: 100%;
    height: 300px;
`;

const Header = styled(Box)`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24px;
`;

const BackButton = styled(IconButton)`
    color: #b5651d; /* Desert color for the home button */
`;

const StyledButton = styled(Button)`
    background-color: #d9a66c !important; /* Warm sand color */
    color: #ffffff !important;
    &:hover {
        background-color: #c68a4f !important; /* Darker shade on hover */
    }
`;

export default function HomePage() {
    const [analyticsData, setAnalyticsData] = useState(null);
    const [selectedButton, setSelectedButton] = useState(null);

    const summaryRef = useRef(null);
    const sessionChartRef = useRef(null);
    const bounceRateChartRef = useRef(null);
    const interactionChartRef = useRef(null);
    const buttonClicksChartRef = useRef(null);

    useEffect(() => {
        async function fetchAnalyticsData() {
            try {
                const response = await fetch('/analyticsData.json');

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const contentType = response.headers.get('content-type');
                if (!contentType || !contentType.includes('application/json')) {
                    throw new Error('Expected JSON, but got something else');
                }

                const data = await response.json();

                const processedData = data.report.data.rows.map(row => ({
                    ...row,
                    lastMetric: row.metrics[row.metrics.length - 1]
                }));

                setAnalyticsData({
                    ...data,
                    report: {
                        ...data.report,
                        data: {
                            ...data.report.data,
                            rows: processedData
                        }
                    }
                });
            } catch (error) {
                console.error('Error fetching analytics data:', error);
            }
        }

        fetchAnalyticsData();
    }, []);

    const captureImage = async (element, name) => {
        if (!element) return;
        const canvas = await html2canvas(element);
        const imageData = canvas.toDataURL('image/jpeg');

        try {
            await fetch('/api/save-image', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ imageData, name })
            });
            alert(`Image saved as ${name}.jpeg in public directory.`);
        } catch (error) {
            console.error('Error saving image:', error);
        }
    };

    const clearImages = async () => {
        try {
            await fetch('/api/clear-image', { method: 'DELETE' });
            alert('All saved images have been cleared.');
        } catch (error) {
            console.error('Error clearing images:', error);
        }
    };

    const buttonClickData = analyticsData
        ? Object.values(
            analyticsData.report.data.rows
                .flatMap(row => row.metrics.slice(8, 11))
                .reduce((acc, button) => {
                    if (button) {
                        if (acc[button]) {
                            acc[button].value += 1;
                        } else {
                            acc[button] = { name: button, value: 1 };
                        }
                    }
                    return acc;
                }, {})
        ).sort((a, b) => b.value - a.value)
            .slice(0, 5)
        : [];

    const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#a4de6c'];

    const handlePieClick = (data, index) => {
        setSelectedButton(data);
    };

    return (
        <PageContainer>
            <Header>
                <Typography variant="h4" gutterBottom>Google Analytics Data</Typography>
                <BackButton onClick={() => window.location.href = '/'}>
                    <Home fontSize="large" />
                </BackButton>
            </Header>

            <StyledButton variant="contained" onClick={() => {
                captureImage(summaryRef.current, 'summary');
                captureImage(sessionChartRef.current, 'sessions_pageviews');
                captureImage(bounceRateChartRef.current, 'bounce_goal');
                captureImage(interactionChartRef.current, 'user_interaction');
                captureImage(buttonClicksChartRef.current, 'button_clicks');
            }}>
                Generate Graphs
            </StyledButton>

            <StyledButton variant="contained" color="secondary" onClick={clearImages} style={{ marginLeft: '10px' }}>
                Clear Images
            </StyledButton>

            {analyticsData ? (
                <>
                    {/* Summary Section */}
                    <StyledCard ref={summaryRef}>
                        <SectionTitle>Summary</SectionTitle>
                        <Divider />
                        <StatItem>
                            <StatIcon><Pageview fontSize="large" /></StatIcon>
                            <StatText>Total Sessions:</StatText>
                            <StatValue>{analyticsData.report.summary.totalSessions}</StatValue>
                        </StatItem>
                        <Divider />
                        <StatItem>
                            <StatIcon><Visibility fontSize="large" /></StatIcon>
                            <StatText>Total Pageviews:</StatText>
                            <StatValue>{analyticsData.report.summary.totalPageviews}</StatValue>
                        </StatItem>
                        <Divider />
                        <StatItem>
                            <StatIcon><TrendingUp fontSize="large" /></StatIcon>
                            <StatText>Total Bounces:</StatText>
                            <StatValue>{analyticsData.report.summary.totalBounces}</StatValue>
                        </StatItem>
                        <Divider />
                        <StatItem>
                            <StatIcon><Percent fontSize="large" /></StatIcon>
                            <StatText>Average Bounce Rate:</StatText>
                            <StatValue>{analyticsData.report.summary.averageBounceRate}%</StatValue>
                        </StatItem>
                        <Divider />
                        <StatItem>
                            <StatIcon><GroupAdd fontSize="large" /></StatIcon>
                            <StatText>Total New Users:</StatText>
                            <StatValue>{analyticsData.report.summary.totalNewUsers}</StatValue>
                        </StatItem>
                        <Divider />
                        <StatItem>
                            <StatIcon><CheckCircle fontSize="large" /></StatIcon>
                            <StatText>Total Goal Completions:</StatText>
                            <StatValue>{analyticsData.report.summary.totalGoalCompletions}</StatValue>
                        </StatItem>
                    </StyledCard>

                    <Grid container spacing={4}>
                        {/* Sessions and Pageviews Line Chart */}
                        <Grid item xs={12} md={6}>
                            <StyledCard ref={sessionChartRef}>
                                <CardContent>
                                    <SectionTitle>Sessions and Pageviews Over Time</SectionTitle>
                                    <ChartContainer>
                                        <ResponsiveContainer width="100%" height="100%">
                                            <LineChart data={analyticsData.report.data.rows}>
                                                <XAxis dataKey="dimensions[0]" />
                                                <YAxis />
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <Tooltip />
                                                <Legend />
                                                <Line type="monotone" dataKey="metrics[1]" stroke="#3f51b5" name="Sessions" />
                                                <Line type="monotone" dataKey="metrics[0]" stroke="#ff4081" name="Pageviews" />
                                            </LineChart>
                                        </ResponsiveContainer>
                                    </ChartContainer>
                                </CardContent>
                            </StyledCard>
                        </Grid>

                        {/* Bounce Rate and Goal Completions Bar Chart */}
                        <Grid item xs={12} md={6}>
                            <StyledCard ref={bounceRateChartRef}>
                                <CardContent>
                                    <SectionTitle>Bounce Rate and Goal Completions</SectionTitle>
                                    <ChartContainer>
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={analyticsData.report.data.rows}>
                                                <XAxis dataKey="dimensions[0]" />
                                                <YAxis />
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <Tooltip />
                                                <Legend />
                                                <Bar dataKey="metrics[3]" fill="#3f51b5" name="Bounce Rate" />
                                                <Bar dataKey="metrics[6]" fill="#ff4081" name="Goal Completions" />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </ChartContainer>
                                </CardContent>
                            </StyledCard>
                        </Grid>

                        {/* Daily User Interaction Line Chart */}
                        <Grid item xs={12} md={6}>
                            <StyledCard ref={interactionChartRef}>
                                <CardContent>
                                    <SectionTitle>Daily User Interaction</SectionTitle>
                                    <ChartContainer>
                                        <ResponsiveContainer width="100%" height="100%">
                                            <LineChart data={analyticsData.report.data.rows}>
                                                <XAxis dataKey="dimensions[0]" />
                                                <YAxis />
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <Tooltip />
                                                <Legend />
                                                <Line type="monotone" dataKey="lastMetric" stroke="#82ca9d" name="Daily User Interaction" />
                                            </LineChart>
                                        </ResponsiveContainer>
                                    </ChartContainer>
                                </CardContent>
                            </StyledCard>
                        </Grid>

                        {/* Pie Chart for Most Clicked Buttons */}
                        <Grid item xs={12} md={6}>
                            <StyledCard ref={buttonClicksChartRef}>
                                <CardContent>
                                    <SectionTitle>Most Clicked Buttons</SectionTitle>
                                    <ChartContainer>
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie
                                                    data={buttonClickData}
                                                    dataKey="value"
                                                    nameKey="name"
                                                    cx="50%"
                                                    cy="50%"
                                                    outerRadius={80}
                                                    fill="#82ca9d"
                                                    label
                                                    onClick={handlePieClick}
                                                >
                                                    {buttonClickData.map((_, index) => (
                                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                    ))}
                                                </Pie>
                                                <Tooltip />
                                                <Legend />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </ChartContainer>
                                    {selectedButton && (
                                        <MuiTooltip title="Click for more info">
                                            <Box mt={2}>
                                                <Typography variant="subtitle1">
                                                    {selectedButton.name}: {selectedButton.value} clicks
                                                </Typography>
                                            </Box>
                                        </MuiTooltip>
                                    )}
                                </CardContent>
                            </StyledCard>
                        </Grid>
                    </Grid>
                </>
            ) : (
                <Typography>Loading...</Typography>
            )}
        </PageContainer>
    );
}
