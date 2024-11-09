"use client"
import { Typography, Box } from "@mui/material";
import styled from "styled-components";
const StyledHeader = styled.div`
    border: 1px solid black;
    border-radius: 15px;
    padding: 2% 38%;
    background-color: #ffaf82;
    color: black;
`;

export default function Header() {
    return (
        <StyledHeader>
            <Typography variant="h2" sx={{display: "flex" }}>
                Camelitics
            </Typography>

        </StyledHeader>
    );
}
