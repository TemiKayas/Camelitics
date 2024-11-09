import React from "react";
import { generateCharts } from "../utils/chartGeneration";

const ChartGenerator = ({ data, onChartsGenerated }) => {
    const handleGenerateCharts = async () => {
        console.log("Starting chart generation with data:", data); // Log the input data

        try {
            const charts = await generateCharts(data); // Call chart generation
            console.log("Generated chart URLs:", charts); // Log generated charts for debugging
            onChartsGenerated(charts); // Pass generated chart images to parent
        } catch (error) {
            console.error("Error during chart generation:", error); // Catch any errors
        }
    };

    return (
        <div>
            <button onClick={handleGenerateCharts}>Generate Charts</button>
        </div>
    );
};

export default ChartGenerator;
