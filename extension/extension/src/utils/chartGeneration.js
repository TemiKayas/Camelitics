// chartGeneration.js

export async function generateCharts(data) {
    const generatedImages = [];

    if (!data?.report?.data?.rows) {
        console.error("Invalid data format. Expected data.report.data.rows");
        return generatedImages;
    }

    for (const [index, row] of data.report.data.rows.entries()) {
        console.log(`Generating chart for row index ${index}`, row);

        try {
            const base64Image = await createChartFromData(row); // Replace with actual chart creation logic
            const blob = base64ToBlob(base64Image);
            const url = URL.createObjectURL(blob);
            generatedImages.push(url);
            console.log(`Chart for row index ${index} generated as blob URL:`, url); // Log each generated URL
        } catch (error) {
            console.error(`Error generating chart for row index ${index}:`, error);
        }
    }

    return generatedImages;
}

function base64ToBlob(base64) {
    const byteString = atob(base64.split(",")[1]);
    const mimeType = base64.match(/^data:(.*?);base64,/)[1];
    const buffer = new ArrayBuffer(byteString.length);
    const byteArray = new Uint8Array(buffer);

    for (let i = 0; i < byteString.length; i++) {
        byteArray[i] = byteString.charCodeAt(i);
    }

    return new Blob([buffer], { type: mimeType });
}

async function createChartFromData(rowData) {
    // For testing purposes, return a valid base64 image string.
    // Replace this with real chart generation logic if available.
    const validBase64Image = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA"
        + "AAAFCAYAAACNbyblAAAAHElEQVQI12P4"
        + "//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==";
    return validBase64Image;
}
