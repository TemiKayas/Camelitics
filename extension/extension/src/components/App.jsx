import React, { useState } from "react";
import FileUploader from "/src/components/FileUploader";
import ChartGenerator from "/src/components/ChartGenerator";
import ImageGallery from "/src/components/ImageGallery";

const App = () => {
    const [analyticsData, setAnalyticsData] = useState(null);
    const [chartImages, setChartImages] = useState([]);

    return (
        <div>
            <FileUploader onFileUpload={setAnalyticsData} />
            {analyticsData && (
                <ChartGenerator data={analyticsData} onChartsGenerated={setChartImages} />
            )}
            {chartImages.length > 0 && <ImageGallery images={chartImages} />}
        </div>
    );
};

export default App;
