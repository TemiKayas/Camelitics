import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Chart from 'chart.js/auto';
import html2canvas from 'html2canvas';
import AddOnSdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

function ChartGenerator({ data }) {
    const chartRef = useRef(null);
    const [chartImage, setChartImage] = useState(null);

    useEffect(() => {
        if (data) {
            const ctx = chartRef.current.getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: data.report.data.rows.map(row => row.dimensions[1]), // Using page names as labels
                    datasets: [
                        {
                            label: 'Pageviews',
                            data: data.report.data.rows.map(row => row.metrics[0]), // Using pageviews as data
                            backgroundColor: 'rgba(75, 192, 192, 0.6)',
                        },
                    ],
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        title: {
                            display: true,
                            text: 'Pageviews by Page',
                        },
                    },
                },
            });

            // Automatically export as JPG once the chart is generated and display it
            setTimeout(() => {
                html2canvas(chartRef.current.parentElement).then(canvas => {
                    canvas.toBlob(blob => {
                        const imageDataUrl = URL.createObjectURL(blob);
                        setChartImage(imageDataUrl);
                    }, 'image/jpeg');
                });
            }, 1000); // Adding slight delay to ensure chart rendering is complete
        }
    }, [data]);

    const handleAddToProject = () => {
        if (chartImage) {
            fetch(chartImage)
                .then(response => response.blob())
                .then(blob => {
                    AddOnSdk.app.document.addImage(blob, {
                        mimeType: 'image/jpeg',
                        name: 'chart.jpg',
                    }).then(() => {
                        console.log('Chart image added to the project successfully.');
                    }).catch(error => {
                        console.error('Error adding chart image to project:', error);
                    });
                });
        }
    };

    return (
        <div>
            <canvas ref={chartRef} width={400} height={400} />
            {chartImage && (
                <div style={{ marginTop: '20px' }}>
                    <img
                        src={chartImage}
                        alt="Generated Chart"
                        style={{ cursor: 'pointer' }}
                        onClick={handleAddToProject}
                    />
                    <p>Click the image to add it to your Adobe Express project.</p>
                </div>
            )}
        </div>
    );
}

ChartGenerator.propTypes = {
    data: PropTypes.object.isRequired,
};

export default ChartGenerator;
