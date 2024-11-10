import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { parse } from 'papaparse';
import { Button } from "@swc-react/button";
import styled from 'styled-components';

const UploadContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
`;

const Bubble = styled.div`
    border: 2px solid #ccc;
    border-radius: 15px;
    padding: 20px;
    text-align: center;
    background-color: #f9f9f9;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    max-width: 400px;
    width: 100%;
`;

const MyButton = styled(Button)`
    text-decoration: none;
    border: none;
`

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
        <UploadContainer>
            <Bubble>
                <input
                    type="file"
                    accept=".json"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                    id="fileUpload"
                />
                <label htmlFor="fileUpload">
                    <MyButton onPress={() => document.getElementById('fileUpload').click()}>
                        Import Data
                    </MyButton>
                </label>
                {fileData && <div style={{ marginTop: '10px', color: '#4caf50' }}>Data loaded successfully!</div>}
            </Bubble>
        </UploadContainer>
    );
}

DataLoad.propTypes = {
    onDataLoad: PropTypes.func.isRequired,
};

export default DataLoad;
