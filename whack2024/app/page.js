import { Box, Container } from "@mui/material";
import Header from "@/app/components/Header";
// import SkySection from "@/app/components/SkySection";
import BazaarSection from "@/app/components/BazaarSection";
import SnapToTop from "@/app/components/SnapToTop";
import Footer from "@/app/components/Footer";

export default function Home() {
    return (
        <>
            <Header />
            <Box sx={{ scrollSnapType: "y mandatory", scrollBehavior: "smooth", backgroundColor: "#f0f0f0", padding: "0rem" }}>
                {/*<SkySection />*/}
                <BazaarSection />
            </Box>
            <Footer />
            <SnapToTop />
        </>
    );
}