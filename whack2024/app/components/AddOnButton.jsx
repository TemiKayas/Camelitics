"use client"
import { Button } from "@mui/material"
import { keyframes } from "@emotion/react"

const glow = keyframes`
    0%, 100% {
        box-shadow: 0 0 5px rgba(255, 165, 0, 0.4), 0 0 10px rgba(255, 165, 0, 0.3), 0 0 15px rgba(255, 165, 0, 0.2);
    }
    50% {
        box-shadow: 0 0 10px rgba(255, 165, 0, 0.6), 0 0 15px rgba(255, 165, 0, 0.5), 0 0 20px rgba(255, 165, 0, 0.3);
    }
`;

const hoverMove = keyframes`
    0%, 100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-5px);
    }
`;

export default function AddOnButton() {
    return (
        <Button
            target="_blank"
            href={"https://github.com/TemiKayas/Camelitics/tree/main/whack2024"}
            sx={{
                display: "flex",
                flexDirection: "row",
                my: 0,
                mx: 'auto',
                py: 2,
                px: 4,
                width: "30%",
                bgcolor: "darkorange",
                color: 'black',
                fontSize: '.8rem',
                fontWeight: 'bold',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                animation: `${glow} 2s infinite, ${hoverMove} 3s infinite`,
                '&:hover': {
                    bgcolor: 'orange',
                    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)',
                },
            }}
        >
            Add On Button
        </Button>
    )
}