"use client"

import { Box, Typography, Link, Stack } from "@mui/material";
import GitHubIcon from '@mui/icons-material/GitHub';
import PFP from "@/public/pfp.png";
import styled from "styled-components";
import Image from "next/image";

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

const FooterContainer = styled(Box)`
    display: flex;
    flex-direction: row;
    justify-content: center; /* Move content to the right */
    align-items: center;
    padding: 2% 1%;
    background-color: #ab790c;
`;

const InfoContainer = styled(Stack)`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-right: 1%;
`;

export default function Footer() {
    return (
        <FooterContainer>
            <InfoContainer>
                <Typography variant="body1" color="textSecondary" align="center">
                    Built with React, Next.js, and Material UI, and Adobe Express
                </Typography>

                <Link href="https://github.com/jaquevan" target="_blank" color="inherit" underline="hover">
                    <Stack direction="row" spacing={0.5} alignItems="center">
                        <GitHubIcon fontSize="small" />
                        <Typography variant="body2">View on GitHub</Typography>
                    </Stack>
                </Link>

                <Typography variant="caption" color="textSecondary" align="center">
                    © 2024 Camelitics. All rights reserved.
                </Typography>
            </InfoContainer>
            <Logo src={PFP} alt="Logo" />
        </FooterContainer>
    );
}