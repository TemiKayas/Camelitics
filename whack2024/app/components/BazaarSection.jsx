import BoxSection from "@/app/components/Box";
import FloatingCamel from "@/app/components/Camel";

export default function BazaarSection() {
    return (
        <BoxSection
            height="100vh"
            content= {<FloatingCamel />}
            style={{
                backgroundImage: `url('/Camelitics BG.png')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                position: "relative", // Ensures FloatingCamel is positioned within this box
                overflow: "hidden",
            }}
        >
            <FloatingCamel/>
        </BoxSection>

    );
}
