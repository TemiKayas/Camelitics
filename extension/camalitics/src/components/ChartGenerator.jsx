import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Chart from 'chart.js/auto';
import html2canvas from 'html2canvas';
import AddOnSdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

function ChartGenerator({ data }) {
    const chartRef = useRef(null);
    const [chartImage, setChartImage] = useState(null);
    const [chartType, setChartType] = useState('bar');
    const chartInstanceRef = useRef(null);

    useEffect(() => {
        if (data) {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }

            const uniqueData = Array.from(new Map(data.report.data.rows.map(row => [row.dimensions[1], row])).values());

            const colors = [
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)',
                'rgba(255, 159, 64, 0.6)'
            ];

            const borderColors = [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ];

            const assignedColors = uniqueData.map((_, index) => colors[index % colors.length]);
            const assignedBorderColors = uniqueData.map((_, index) => borderColors[index % borderColors.length]);

            const ctx = chartRef.current.getContext('2d');
            chartInstanceRef.current = new Chart(ctx, {
                type: chartType,
                data: {
                    labels: uniqueData.map(row => row.dimensions[1]),
                    datasets: [
                        {
                            label: 'Pageviews',
                            data: uniqueData.map(row => row.metrics[0]),
                            backgroundColor: assignedColors,
                            borderColor: assignedBorderColors,
                            borderWidth: 1
                        },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    plugins: {
                        legend: {
                            display: chartType !== 'bar', // Disable legend only for the bar chart
                            position: 'top',
                            labels: {
                                boxWidth: 10,
                                padding: 10,
                            },
                        },
                        title: {
                            display: true,
                            text: 'Pageviews by Page',
                        },
                    },
                    layout: {
                        padding: {
                            left: 20,
                            right: 20,
                            top: 20,
                            bottom: 20
                        }
                    }
                },
            });

            setTimeout(() => {
                html2canvas(chartRef.current, { useCORS: true }).then(canvas => {
                    canvas.toBlob(blob => {
                        const imageDataUrl = URL.createObjectURL(blob);
                        setChartImage(imageDataUrl);
                    }, 'image/png');
                });
            }, 1000);
        }
    }, [data, chartType]);

    const handleAddToProject = () => {
        if (chartImage) {
            fetch(chartImage)
                .then(response => response.blob())
                .then(blob => {
                    AddOnSdk.app.document.addImage(blob, {
                        mimeType: 'image/png',
                        name: 'chart.png',
                    }).then(() => {
                        console.log('Chart image added to the project successfully.');
                    }).catch(error => {
                        console.error('Error adding chart image to project:', error);
                    });
                });
        }
    };

    const handleChartTypeChange = (e) => {
        setChartType(e.target.value);
    };

    return (
        <div style={{ overflow: 'hidden', maxWidth: '100%', maxHeight: '100%' }}>
            <div style={{ marginBottom: '20px', textAlign: 'center' }}>
                <label htmlFor="chartType" style={{ marginRight: '10px' }}>Select Chart Type:</label>
                <select id="chartType" value={chartType} onChange={handleChartTypeChange}>
                    <option value="bar">Bar Chart</option>
                    <option value="pie">Pie Chart</option>
                    <option value="doughnut">Doughnut Chart</option>
                </select>
            </div>
            <div style={{ position: 'relative', width: '100%', height: '350px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ marginBottom: '10px' }}>
                    <canvas ref={chartRef} style={{ display: 'block', width: '100%', height: '300px' }} />
                </div>
            </div>
            {chartImage && (
                <div style={{ marginTop: '20px', textAlign: 'center' }}>
                    <img
                        src={chartImage}
                        alt="Generated Chart"
                        style={{ cursor: 'pointer', width: '150px', height: 'auto', borderRadius: '10px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}
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
