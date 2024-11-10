import BoxSection from "@/app/components/BoxSection";
import CloudButtonComponent from "@/app/components/CloudButton";

export default function SkySection() {
    return (
        <BoxSection
            height="50vh"
            content="Sky"
            style={{
                background: "linear-gradient(to bottom, #defdfd, #ceffff, #bffefe)",  // Smooth gradient for transition
            }}
        >
            <CloudButtonComponent>Demo</CloudButtonComponent>
        </BoxSection>
    );
}