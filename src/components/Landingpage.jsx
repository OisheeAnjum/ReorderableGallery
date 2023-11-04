/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { GridContextProvider, GridDropZone, GridItem, swap } from 'react-grid-dnd';
import { toast } from 'react-toastify';
import { Button, Modal } from 'rsuite';
import image1 from '../assets/images/T1It0qMA.png';
import image2 from '../assets/images/U6OVh27Q.png';
import image4 from '../assets/images/iegS0M-g.png';
import image5 from '../assets/images/z90_d-Pg.png';
import Imageupload from './Imageupload';

export default function Landingpage() {
    const imageSources = [
        {
            id: 1,
            src: image1,
        },
        {
            id: 2,
            src: image2,
        },
        {
            id: 3,
            src: image4,
        },
        {
            id: 4,
            src: image5,
        },
        {
            id: 5,
            src: image4,
        },
        {
            id: 6,
            src: image5,
        },
    ];
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [imageList, setImageList] = useState(imageSources);
    const [selectedImages, setSelectedImages] = useState([]);

    const handleImageSelect = (imageId) => {
        if (selectedImages.includes(imageId)) {
            setSelectedImages(selectedImages.filter((id) => id !== imageId));
        } else {
            setSelectedImages([...selectedImages, imageId]);
        }
        console.log(imageId);
    };

    const handleImageUpload = (newImages) => {
        Array.from(newImages).forEach((image, index) => {
            const reader = new FileReader();
            reader.onload = () => {
                const uploadedImage = {
                    id: imageList.length + Math.random() + index + 1, // Assign a unique ID
                    src: reader.result,
                };
                setImageList((prevImageList) => [...prevImageList, uploadedImage]);
            };
            reader.readAsDataURL(image);
        });
    };
    const handleImageRemove = (selectedImageIds) => {
        console.log(selectedImageIds.length);
        if (selectedImageIds.length === 0) {
            <p>No Images Selected</p>;
        } else {
            const updatedImageList = imageList.filter(
                (image) => !selectedImageIds.includes(image.id)
            );
            setImageList(updatedImageList);
            toast.success('Images Deleted successfully');
            handleClose();
            setSelectedImages([]);
        }
    };

    const onChange = (sourceId: string, sourceIndex: number, targetIndex: number) => {
        const nextState = swap(imageList, sourceIndex, targetIndex);
        setImageList(nextState);
    };
    return (
        <Container className="mt-4">
            <div className="d-flex justify-content-end">
                {' '}
                <Imageupload onImageUpload={handleImageUpload} onImageRemove={handleImageRemove} />
                <Button className="custom-button" appearance="primary" onClick={handleOpen}>
                    Delete
                </Button>
            </div>

            <Row>
                <Col md={3}>
                    <img
                        className="img-fluid rounded rounded-1 yellow-border"
                        src={imageList[0].src}
                        alt="featured"
                    />
                </Col>
                <Col md={9}>
                    <GridContextProvider onChange={onChange}>
                        <GridDropZone
                            id="items"
                            boxesPerRow={4}
                            rowHeight={150}
                            style={{ height: '450px' }}
                        >
                            {imageList.map((item, index) => (
                                <GridItem key={item.id}>
                                    <div
                                        className={`position-relative d-flex justify-content-center align-items-center rounded rounded-1 m-1 ${
                                            index === 0 ? 'yellow-border' : 'border'
                                        }`}
                                        style={{ height: '8rem' }}
                                    >
                                        <img
                                            className="img-fluid"
                                            src={item.src}
                                            alt={` ${index}`}
                                            style={{ maxHeight: '7.9rem' }}
                                            draggable="false"
                                        />
                                        <input
                                            className="position-absolute"
                                            type="checkbox"
                                            checked={selectedImages.includes(item.id)}
                                            onChange={() => handleImageSelect(item.id)}
                                            style={{
                                                zIndex: '10',
                                                top: '8px',
                                                right: '2px',
                                            }}
                                        />
                                    </div>
                                </GridItem>
                            ))}
                        </GridDropZone>
                    </GridContextProvider>
                </Col>
            </Row>
            <Modal keyboard={false} open={open} onClose={handleClose}>
                <Modal.Header>
                    <Modal.Title>Delete Selected Images</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {selectedImages.length > 0 ? (
                        <p>
                            Are You Sure You Want To Delete &nbsp;
                            {selectedImages.length}{' '}
                            {selectedImages.length === 1 ? 'selected image' : 'selected images'} ?
                        </p>
                    ) : (
                        <p>No Image Selected</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    {selectedImages.length > 0 && (
                        <Button
                            className="custom-button"
                            onClick={() => handleImageRemove(selectedImages)}
                            appearance="primary"
                        >
                            Delete
                        </Button>
                    )}
                    <Button onClick={handleClose} appearance="subtle">
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}
