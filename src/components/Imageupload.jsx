import React, { useState } from 'react';
import { Button } from 'rsuite';

function ImageUpload({ onImageUpload }) {
    const [selectedImages, setSelectedImages] = useState([]);

    const handleImageChange = (e) => {
        const { files } = e.target;
        setSelectedImages(files);
    };

    const handleUpload = () => {
        if (selectedImages.length > 0) {
            onImageUpload(selectedImages);
            setSelectedImages([]);
        }
    };

    return (
        <div className="d-flex justify-content-between">
            <input type="file" accept="image/*" onChange={handleImageChange} multiple />
            <Button onClick={handleUpload}>Upload</Button>
        </div>
    );
}

export default ImageUpload;
