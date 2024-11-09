import { Box, Container } from "@mui/material";
import Header from "@/app/components/Header";
import SkySection from "@/app/components/SkySection";
import BazaarSection from "@/app/components/BazaarSection";
import SnapToTop from "@/app/components/SnapToTop";
import Footer from "@/app/components/Footer";


export default function Home() {
    return (
        <>
            <Box sx={{ scrollSnapType: "y mandatory", scrollBehavior: "smooth", backgroundColor: "#f0f0f0", padding: "2rem 0" }}>
                <Container sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0rem" }}>
                    <Header />
                    <SkySection />
                    <BazaarSection />
                </Container>
            </Box>
            <Footer />
            <SnapToTop />
        </>
    );
}
