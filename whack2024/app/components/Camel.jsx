"use client";

import styled, { keyframes } from "styled-components";
import Image from "next/image";
import Mascot from "@/public/Camel.png";
import {Typography} from "@mui/material";

const levitate = keyframes`
    0%, 100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-10px);
    }
`;

const glow = keyframes`
    0%, 100% {
        filter: drop-shadow(0 0 5px rgba(255, 255, 0, 0.3)) drop-shadow(0 0 10px rgba(255, 255, 0, 0.3));
    }
    50% {
        filter: drop-shadow(0 0 10px rgba(255, 255, 0, 0.5)) drop-shadow(0 0 15px rgba(255, 255, 0, 0.5));
    }
`;

const scale = keyframes`
    0%, 100% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.1);
    }
`;

const FloatingCamelContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: auto;
    margin-top: 90px;
`;

const StyledSlogan = styled(Typography)`
    margin: 0;
    padding: 0;
    color: #ff8600;
`
const GlowingImage = styled(Image)`
    animation: ${glow} 2s infinite, ${levitate} 3s infinite, ${scale} 8s infinite;
    will-change: transform, filter;
`;

export default function Camel() {
    return (
        <>
        <FloatingCamelContainer>
            <StyledSlogan variant="caption">Hop on the Magic Carpet</StyledSlogan>
            <GlowingImage src={Mascot} alt="Levitating Camel" width={400} height={400} />

        </FloatingCamelContainer>
        <StyledSlogan variant="h4">We Have You On Our Backs</StyledSlogan>
        </>
    );
}