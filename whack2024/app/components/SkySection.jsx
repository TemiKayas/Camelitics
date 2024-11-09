import BoxSection from "@/app/components/Box";

export default function SkySection() {
    return (
        <BoxSection
            height="100vh"
            content="Sky"
            style={{
                background: "linear-gradient(to bottom, #defdfd, #ceffff, #bffefe)",  // Smooth gradient for transition
            }}
        />
    );
}
