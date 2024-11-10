"use client";

import styled, { keyframes } from "styled-components";
import Link from "next/link";
import Image from "next/image";
import CloudImage from "@/public/cloud.png"; // Make sure to replace this with the correct path to your cloud image

const moveAndGrow = keyframes`
    0%, 100% {
        transform: translateY(0) scale(1);
    }
    50% {
        transform: translateY(-10px) scale(1.05);
    }
`;

const CloudButton = styled(Image)`
    width: 200px;
    height: auto;
    cursor: pointer;
    margin: 0 25px; // Increase margin to add more padding between buttons
    transition: transform 0.3s ease-in-out;
    &:hover {
        transform: scale(1.1);
    }
`;

const CloudButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 2% auto; // Add margin to move the clouds down
    position: relative;
    animation: ${moveAndGrow} 3s infinite;
`;

const CloudButtonWrapper = styled.div`
    position: relative;
    display: inline-block;
    text-align: center;
`;

const CloudButtonText = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 1;
    transform: translate(-50%, -50%);
    color: white;
    font-size: 1.5rem;
    font-weight: bold;
    pointer-events: none; // Ensure the text does not interfere with button clicks
    color: black;
`;

export default function CloudButtonComponent() {
    return (
        <CloudButtonContainer>
            <CloudButtonWrapper>
                <Link href="/documentation" passHref>
                    <CloudButton src={CloudImage} alt="Cloud Button" width={300} height={300} />
                    <CloudButtonText>Documentation</CloudButtonText>
                </Link>
            </CloudButtonWrapper>
            <CloudButtonWrapper>
                <Link href="/demo" passHref> {/* Only change the Demo button's href */}
                    <CloudButton src={CloudImage} alt="Cloud Button" width={300} height={300} />
                    <CloudButtonText>Demo</CloudButtonText>
                </Link>
            </CloudButtonWrapper>
            <CloudButtonWrapper>
                <Link href="/about" passHref>
                    <CloudButton src={CloudImage} alt="Cloud Button" width={300} height={300} />
                    <CloudButtonText>About Us</CloudButtonText>
                </Link>
            </CloudButtonWrapper>
        </CloudButtonContainer>
    );
}
