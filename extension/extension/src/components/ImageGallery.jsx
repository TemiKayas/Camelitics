import React, { useEffect, useState } from "react";
import AddOnSdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

const ImageGallery = ({ images }) => {
    const [base64Images, setBase64Images] = useState([]);

    // Convert blob URLs to base64 data URLs when images are updated
    useEffect(() => {
        const convertBlobsToBase64 = async () => {
            const base64Promises = images.map(async (blobUrl) => {
                try {
                    const response = await fetch(blobUrl);
                    const blob = await response.blob();
                    const base64 = await blobToBase64(blob);
                    return base64;
                } catch (error) {
                    console.error("Error converting blob to base64:", error);
                    return null; // Return null if conversion fails
                }
            });

            const base64Urls = await Promise.all(base64Promises);
            setBase64Images(base64Urls.filter(Boolean)); // Filter out any null values
        };

        convertBlobsToBase64();
    }, [images]);

    // Helper function to convert blob to base64
    const blobToBase64 = (blob) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    };

    return (
        <div className="gallery">
            {base64Images.map((imageSrc, index) => (
                <img
                    key={index}
                    id={`chart-${index}`}
                    src={imageSrc} // Use base64 data URL
                    alt={`Chart ${index + 1}`}
                    draggable="true"
                    onClick={() => AddOnSdk.app.document.addImage(imageSrc)} // Use base64 URL in addImage
                    style={{
                        cursor: "pointer",
                        maxWidth: "100px",
                        height: "100px",
                        margin: "5px",
                        border: "1px solid black",
                    }}
                />
            ))}
        </div>
    );
};

export default ImageGallery;
