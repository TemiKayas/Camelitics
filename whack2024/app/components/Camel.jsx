"use client";

import styled, { keyframes } from "styled-components";
import Image from "next/image";
import Mascot from "@/public/Camel.png";

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
        box-shadow: 0 0 5px rgba(255, 255, 0, 0.5), 0 0 10px rgba(255, 255, 0, 0.3), 0 0 15px rgba(255, 255, 0, 0.2);
    }
    50% {
        box-shadow: 0 0 10px rgba(255, 255, 0, 0.7), 0 0 15px rgba(255, 255, 0, 0.5), 0 0 20px rgba(255, 255, 0, 0.3);
    }
`;

const FloatingCamelContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    padding-top: 20%;
    transform: translate(-50%, -50%);
    animation: ${levitate} 3s infinite;
`;

const GlowingImage = styled(Image)`
    animation: ${glow} 2s infinite;
`;

export default function Camel() {
    return (
        <FloatingCamelContainer>
            <GlowingImage src={Mascot} alt="Levitating Camel" width={400} height={400} />
        </FloatingCamelContainer>
    );
}