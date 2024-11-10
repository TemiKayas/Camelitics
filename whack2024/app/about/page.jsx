"use client"
import React from 'react';
import { Container, Typography, Box, Card, CardContent, Avatar, useMediaQuery, Button } from '@mui/material';
import { brown, amber } from '@mui/material/colors';
import { useTheme } from '@mui/material/styles';
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import Link from 'next/link';

const developers = [
    {
        name: "Evan Jaquez",
        role: "Front-End Developer",
        description: "Crafts intuitive and engaging user interfaces, bringing a strong eye for design and seamless functionality.",
        avatar: "/images/evan.jpg"
    },
    {
        name: "Artemios Kayas",
        role: "Head Hancho",
        description: "Specializes in Adobe Express integrations, and building extensions using Javascript and React, creating efficient workflows to enhance design productivity.",
        avatar: "/images/artemios.jpg"
    },
    {
        name: "Jordan Lin",
        role: "Backend Developer",
        description: "Builds robust, scalable server-side applications and manages data flow to support front-end features.",
        avatar: "/images/jordan.jpg"
    },
    {
        name: "David Kim",
        role: "Documentation and Requirements Engineer",
        description: "Ensures comprehensive project documentation and clear requirements, bridging the gap between vision and execution.",
        avatar: "/images/david.jpg"
    },
];

const AboutUs = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 8, color: brown[900] }}>
            <Header />
            <Typography variant="h3" sx={{ pt: 1, color: amber[700], textAlign: 'center', mb: 2 }}>
                About Us
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
                <Link href="/" passHref>
                    <Button variant="contained" sx={{ bgcolor: amber[700], color: 'white' }}>
                        Home
                    </Button>
                </Link>
            </Box>
            <Typography variant="h5" sx={{ mb: 4, color: brown[700], textAlign: 'center' }}>
                Our mission is to empower creative expression through innovative and accessible digital solutions. We combine technical expertise and creativity to build tools that make digital content creation easier and more enjoyable for everyone.
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 4,
                    justifyContent: 'center',
                    flexDirection: isSmallScreen ? 'column' : 'row',
                }}
            >
                {developers.map((dev, index) => (
                    <Card key={index} sx={{ width: 250, bgcolor: amber[50], color: brown[800], mb: 2 }}>
                        <CardContent>
                            <Avatar src={dev.avatar} sx={{ width: 64, height: 64, mb: 2, bgcolor: amber[300] }} />
                            <Typography variant="h6" sx={{ color: brown[900], fontWeight: 'bold', textAlign: 'center' }}>{dev.name}</Typography>
                            <Typography variant="subtitle1" sx={{ color: brown[600], textAlign: 'center' }}>{dev.role}</Typography>
                            <Typography variant="body2" sx={{ mt: 1, color: brown[700], textAlign: 'center' }}>{dev.description}</Typography>
                        </CardContent>
                    </Card>
                ))}
            </Box>
            <Footer />
        </Container>
    );
};

export default AboutUs;
