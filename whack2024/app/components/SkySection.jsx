import BoxSection from "@/app/components/BoxSection";

export default function SkySection() {
    return (
        <BoxSection
            height="150vh"
            content="Sky"
            style={{
                background: "linear-gradient(to bottom, #defdfd, #ceffff, #bffefe)",  // Smooth gradient for transition
            }}
        />
    );
}
