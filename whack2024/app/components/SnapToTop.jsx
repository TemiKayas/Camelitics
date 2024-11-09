"use client"
import { Button } from "@mui/material";
import { useState, useEffect } from "react";

export default function ScrollToTopButton() {
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        const handleScroll = () => setShowButton(window.scrollY > 300);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

    return (
        showButton && (
            <Button
                onClick={scrollToTop}
                variant="contained"
                color="primary"
                sx={{
                    position: "fixed",
                    bottom: "2rem",
                    right: "2rem",
                    zIndex: 1000,
                    bgcolor: "orange"
                }}
            >
                Back to Top
            </Button>
        )
    );
}
