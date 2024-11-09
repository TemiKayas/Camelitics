"use client";

import styled, { keyframes } from "styled-components";
import Image from "next/image";
import Mascot from "@/public/Camel.png";

// Define the animation using styled-components
const levitate = keyframes`
    0%, 100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-10px);
    }
`;

// Styled container with animation applied
const FloatingCamelContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    padding-top: 40%;
    transform: translate(-40%, -50%);
    animation: ${levitate} 3s infinite;
`;

export default function FloatingCamel() {
    return (
        <FloatingCamelContainer>
            <Image src={Mascot} alt="Levitating Camel" width={400} height={400} />
        </FloatingCamelContainer>
    );
}
