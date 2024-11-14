"use client"
import React from 'react';
import { Container, Typography, Box, Card, CardContent, Avatar, useMediaQuery, Button } from '@mui/material';
import { brown, amber } from '@mui/material/colors';
import { useTheme } from '@mui/material/styles';
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import Link from 'next/link';

import Temi from "@/public/temi.jpg";
import Evan from "@/public/evan.jpg";
import Jordan from "@/public/jordan.jpg";
import David from "@/public/david.jpg";

const developers = [
    {
        name: "Evan Jaquez",
        role: "Front-End Developer",
        description: "Crafts intuitive and engaging user interfaces, bringing a strong eye for design and branding.",
        avatar: Evan
    },
    {
        name: "Artemios Kayas",
        role: "Adobe Express Specialist",
        description: "Specializes in Adobe Express integrations, and building extensions using Javascript and React, creating efficient workflows to enhance design productivity.",
        avatar: Temi
    },
    {
        name: "Jordan Lin",
        role: "Backend Developer",
        description: "Builds robust, scalable server-side applications and manages data flow to support front-end features.",
        avatar: Jordan
    },
    {
        name: "David Kim",
        role: "Requirements Engineer",
        description: "Ensures comprehensive project documentation and clear requirements, bridging the gap between vision and execution.",
        avatar: David
    },
];

const AboutUs = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Container maxWidth="xl" sx={{ mt: 4, mb: 8, color: brown[900] }}>
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
                Our mission at Camelitics is to revolutionize the way businesses harness data through cutting-edge analytics and intuitive visualizations.
                We blend technical prowess with innovative design to create tools that transform complex data into actionable insights,
                empowering our clients to make informed decisions and drive success.
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'nowrap',
                    gap: 4,
                    justifyContent: 'center',
                    overflow: 'auto',
                }}
            >
                {developers.map((dev, index) => (
                    <Card key={index} sx={{ width: 250, bgcolor: amber[50], color: brown[800], mb: 2 }}>
                        <CardContent>
                            <Avatar src={dev.avatar.src} sx={{ width: 66, height: 66, mb: 2, bgcolor: amber[300] }} />
                            <Typography variant="h5" sx={{ color: brown[900], fontWeight: 'bold', textAlign: 'center' }}>{dev.name}</Typography>
                            <Typography variant="subtitle1" sx={{ color: amber[600], textAlign: 'center' }}>{dev.role}</Typography>
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