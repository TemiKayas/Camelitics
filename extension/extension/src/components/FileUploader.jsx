import React from "react";

const FileUploader = ({ onFileUpload }) => {
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type === "application/json") {
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = JSON.parse(e.target.result);
                onFileUpload(data); // Pass data to parent
            };
            reader.readAsText(file);
        } else {
            alert("Please upload a valid JSON file.");
        }
    };

    return (
        <div>
            <input type="file" accept=".json" onChange={handleFileChange} />
        </div>
    );
};

export default FileUploader;
