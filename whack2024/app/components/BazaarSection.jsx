import BoxSection from "@/app/components/BoxSection";
import Camel from "@/app/components/Camel";
import AddOnButton from "@/app/components/AddOnButton";

export default function BazaarSection() {
    return (
        <BoxSection
            height="100vh"
            style={{
                backgroundImage: `url('/Camelitics BG.png')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                position: "relative", // Ensures FloatingCamel and button are positioned within this box
                overflow: "hidden",
            }}
        >
            {/* Ensure the button is visible above the background */}
            <AddOnButton />
            <Camel />
        </BoxSection>
    );
}
