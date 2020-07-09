import React from 'react';
import './uploader.css';

function Uploader({ handleFileUpload }) {

    const handleChange = (event) => {
        handleFileUpload({
            title: 'new uploaded',
            id: Date.now().toString(),
            url: window.URL.createObjectURL(event.target.files[0])
        })
    }
    return (
        <div className="fileUploader">

            <label className="fileUploadButton">
                <input type="file" accept="image/*" onChange={handleChange} />
                Upload Image
            </label>
        </div>
    )
}

export default Uploader;