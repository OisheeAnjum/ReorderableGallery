/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Button, Modal } from 'rsuite';

function ImageUpload({ onImageUpload }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [selectedImages, setSelectedImages] = useState([]);

    const handleImageChange = (e) => {
        const { files } = e.target;
        setSelectedImages(files);
        handleOpen();
    };

    const handleUpload = () => {
        if (selectedImages.length > 0) {
            onImageUpload(selectedImages);
            setSelectedImages([]);
            toast.success('Images Uploaded successfully');
            handleClose();
        }
    };

    return (
        <div className="d-flex justify-content-between">
            <label className="custom-file-input-label m-0">
                <div className="custom-button">Add New</div>
                <input
                    id="file-input"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    multiple
                    className="file-input"
                />
            </label>

            <Modal keyboard={false} open={open} onClose={handleClose}>
                <Modal.Header>
                    <Modal.Title>Add New Images</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>
                        {selectedImages.length} {selectedImages.length === 1 ? 'image' : 'images'}{' '}
                        selected
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="custom-button" onClick={handleUpload} appearance="primary">
                        Upload
                    </Button>
                    <Button onClick={handleClose} appearance="subtle">
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ImageUpload;
