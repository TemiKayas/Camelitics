"use client";
import { Typography, Box } from "@mui/material";
import styled from "styled-components";
import PFP from "@/public/pfp.png";
import Texture from "@/public/Sand.png"; // Ensure this is the correct path to your texture image
import Image from "next/image";

const StyledHeader = styled(Box)`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 20px;
    background-image: url(${Texture.src}); /* Use the src property of the imported image */
    background-size: cover;
    background-repeat: no-repeat;
    color: black;
    text-align: center;
    margin-bottom: 0;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Optional: Add a shadow for depth */
    z-index: 1; /* Lower z-index to move it to the back */
    position: relative; /* Ensure z-index works */
`;

const Logo = styled(Image)`
    width: 100px; /* Adjust the size as needed */
    height: auto; /* Adjust the size as needed */
    margin-left: 10px;
    padding: 0;
    border: 2px solid black;
    border-radius: 50%;
    background-color: #dfd6b7;
    object-position: center; /* Centers the image within the area */
`;

export default function Header() {
    return (
        <Box>
            <StyledHeader>
                <Typography variant="h2">
                    Camelitics Corp
                </Typography>
                <Logo src={PFP} alt="Logo" />
            </StyledHeader>
        </Box>
    );
}