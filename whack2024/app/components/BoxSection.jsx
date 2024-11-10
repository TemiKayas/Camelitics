import { Box, Typography } from "@mui/material";

export default function BoxSection({ backgroundColor, height, content, style, children }) {
    return (
        <Box
            sx={{
                height: height || "500px",
                width: "100%",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                scrollSnapAlign: "center",
                backgroundColor: backgroundColor || "transparent",
                ...style, // Allows inline styles like background images or gradients
            }}
        >
            <Typography variant="h4">{children}</Typography>
        </Box>
    );
}
