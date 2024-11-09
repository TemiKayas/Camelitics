import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { parse } from 'papaparse';
import { Button } from "@swc-react/button"; // Replace this if needed with the appropriate button

function DataLoad({ onDataLoad }) {
    const [fileData, setFileData] = useState(null);

    // Handles file selection and parsing
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const json = JSON.parse(e.target.result);
                    setFileData(json);
                    onDataLoad(json); // Pass the data to parent component
                } catch (error) {
                    console.error('Failed to parse JSON file:', error);
                    alert('Error parsing JSON file. Make sure it is a valid JSON format.');
                }
            };
            reader.readAsText(file);
        }
    };

    return (
        <div>
            <input
                type="file"
                accept=".json"
                onChange={handleFileChange}
                style={{ display: 'none' }}
                id="fileUpload"
            />
            <label htmlFor="fileUpload">
                <Button variant="cta" onPress={() => document.getElementById('fileUpload').click()}>
                    Upload Analytics Data
                </Button>
            </label>
            {fileData && <div>Data loaded successfully!</div>}
        </div>
    );
}

DataLoad.propTypes = {
    onDataLoad: PropTypes.func.isRequired,
};

export default DataLoad;
