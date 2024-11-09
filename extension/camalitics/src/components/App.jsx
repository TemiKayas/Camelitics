// To support: theme="express" scale="medium" color="light"
// import these spectrum web components modules:
import "@spectrum-web-components/theme/express/scale-medium.js";
import "@spectrum-web-components/theme/express/theme-light.js";
import styled from "styled-components";

// To learn more about using "swc-react" visit:
// https://opensource.adobe.com/spectrum-web-components/using-swc-react/
import { Button } from "@swc-react/button";
import { Theme } from "@swc-react/theme";
import React, { useState, useEffect } from "react";
import DataLoad from "./DataLoad";
import ChartGenerator from "./ChartGenerator";
import "./App.css";

const MyDiv = styled.div`
    margin: 0 auto;
    background-color: lightgray;
    height: 90vh;
    width: 80vw;
    border-radius: 45px;
`;
const MyP = styled.p`
    text-align: center;
`;
const SmallBubble = styled.div`
    padding: 3%;
    margin: 3%;
    background-color: lightblue;
    border: 1px solid white;
    border-radius: 45px;
`;

const App = ({ addOnUISdk }) => {
    const [analyticsData, setAnalyticsData] = useState(null);
    const [chartImage, setChartImage] = useState(null);

    const handleDataLoad = (data) => {
        setAnalyticsData(data);
    };

    useEffect(() => {
        const enableDragAndDrop = async () => {
            if (chartImage) {
                // Wait until AddOnSdk is ready
                if (window.AddOnSdk && window.AddOnSdk.ready) {
                    await window.AddOnSdk.ready;

                    // Enable drag to document for the generated chart image
                    const imageElement = document.getElementById("generated-chart");
                    if (imageElement) {
                        window.AddOnSdk.app.enableDragToDocument(imageElement, {
                            previewCallback: (element) => {
                                return new URL(element.src);
                            },
                            completionCallback: async (element) => {
                                return [{ blob: await getBlob(element.src) }];
                            },
                        });
                    }
                } else {
                    console.error("AddOnSdk is not available.");
                }
            }
        };

        enableDragAndDrop();
    }, [chartImage]);

    const getBlob = async (url) => {
        return await fetch(url).then((response) => response.blob());
    };

    return (
        // Please note that the below "<Theme>" component does not react to theme changes in Express.
        // You may use "addOnUISdk.app.ui.theme" to get the current theme and react accordingly.
        <Theme theme={addOnUISdk.app.ui.theme} scale="medium" color="light">
            <MyDiv>
                <SmallBubble>
                    <MyP>Please upload your JSON</MyP>
                    <DataLoad onDataLoad={handleDataLoad} />
                </SmallBubble>
                {analyticsData && (
                    <SmallBubble>
                        <ChartGenerator data={analyticsData} setChartImage={setChartImage} />
                    </SmallBubble>
                )}
                {/*{chartImage && (*/}
                {/*    <div style={{ marginTop: "20px" }}>*/}
                {/*        <img*/}
                {/*            id="generated-chart"*/}
                {/*            src={chartImage}*/}
                {/*            alt="Generated Chart"*/}
                {/*            style={{ cursor: "pointer" }}*/}
                {/*            onClick={() => {*/}
                {/*                if (window.AddOnSdk) {*/}
                {/*                    window.AddOnSdk.app.document.addImage(chartImage);*/}
                {/*                } else {*/}
                {/*                    console.error("AddOnSdk is not available.");*/}
                {/*                }*/}
                {/*            }}*/}
                {/*        />*/}
                {/*        <p>Click the image to add it to your Adobe Express project or drag and drop it.</p>*/}
                {/*    </div>*/}
                {/*)}*/}
            </MyDiv>
        </Theme>
    );
};

export default App;
