'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { IconButton, Button } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { useRouter } from 'next/navigation';

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #f8e5c3; /* Sand color for the background */
    min-height: 100vh;
    padding: 20px;
`;

const SlideContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px auto;
    width: 80%;
    max-width: 800px;
    height: 500px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
    border-radius: 12px;
    overflow: hidden;
    background-color: #f5d7a2; /* Light sandy color */
    background-image: url('/desertBackground.jpg'); /* Add desert background image */
    background-size: cover;
    background-position: center;
`;

const SlideImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 12px;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 10px;
    background-color: rgba(245, 215, 162, 0.9); /* Light sandy overlay */
    border-top: 1px solid #d2a679; /* Slightly darker sandy border */
`;

const StyledButton = styled(Button)`
    background-color: #d2a679 !important; /* Desert brown color */
    color: #ffffff !important;
    &:hover {
        background-color: #b57a48 !important; /* Darker desert color on hover */
    }
`;

const Documentation = () => {
    const router = useRouter();
    const [currentSlide, setCurrentSlide] = useState(0);

    // Array of slide images (update with paths to your actual images)
    const slides = ['Camelitics_page-0001.jpg', 'Camelitics_page-0002.jpg', 'Camelitics_page-0003.jpg', 'Camelitics_page-0004.jpg', 'Camelitics_page-0005.jpg', 'Camelitics_page-0006.jpg', 'Camelitics_page-0007.jpg', 'Camelitics_page-0008.jpg', 'Camelitics_page-0009.jpg', 'Camelitics_page-0010.jpg', 'Camelitics_page-0011.jpg'];

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

    return (
        <PageContainer>
            {/* Back Home Button and Title */}
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                <IconButton onClick={() => router.push('/')} aria-label="Go back to home">
                    <HomeIcon fontSize="large" color="primary" />
                </IconButton>
                <h1 style={{ marginLeft: '10px', color: '#d2a679' }}>Documentation</h1>
            </div>

            {/* Slideshow Container */}
            <SlideContainer>
                <SlideImage src={slides[currentSlide]} alt={`Slide ${currentSlide + 1}`} />

                {/* Navigation Buttons */}
                <ButtonContainer>
                    <StyledButton onClick={prevSlide} variant="contained">
                        Previous
                    </StyledButton>
                    <StyledButton onClick={nextSlide} variant="contained">
                        Next
                    </StyledButton>
                </ButtonContainer>
            </SlideContainer>
        </PageContainer>
    );
};

export default Documentation;
