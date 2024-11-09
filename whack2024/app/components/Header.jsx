"use client"
import { Typography, Box } from "@mui/material";
import styled from "styled-components";



const StyledHeader = styled(Typography)`
    border: 1px solid black;
    border-radius: 15px;
    padding: 10% 38%;
    background-color: rgba(138,87,69,0.59);
    color: black;
`;

export default function Header() {
    return (

        <StyledHeader>
            <Typography variant="h2" sx={{ display: "flex", align: "top"}}>
                Camelitics
            </Typography>
            <Typography variant="h4">Desc.</Typography>
        </StyledHeader>

    );
}
