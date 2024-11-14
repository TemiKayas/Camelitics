import BoxSection from "@/app/components/BoxSection";
import Camel from "@/app/components/Camel";
import AddOnButton from "@/app/components/AddOnButton";
import CloudButtonComponent from "@/app/components/CloudButton";

export default function BazaarSection() {
    return (
        <BoxSection
            height="120vh"
            width="100%"
            style={{
                backgroundImage: `url('/Camelitics BG.png')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                position: "relative",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
            }}
        >
            <CloudButtonComponent />
            <div style={{ position: "absolute", right: "20px", top: "50%", transform: "translateY(-50%)" }}>
                <AddOnButton />
            </div>
            <Camel />
        </BoxSection>
    );
}