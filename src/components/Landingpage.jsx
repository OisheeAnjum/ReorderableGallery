/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { GridContextProvider, GridDropZone, GridItem, swap } from 'react-grid-dnd';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Button, Modal } from 'rsuite';
import image1 from '../assets/images/T1It0qMA.png';
import image2 from '../assets/images/U6OVh27Q.png';
import image4 from '../assets/images/iegS0M-g.png';
import image5 from '../assets/images/z90_d-Pg.png';
import Imageupload from './Imageupload';

export default function Landingpage() {
    const { small } = useSelector((state) => state.device);
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
    // select image to delete
    const handleImageSelect = (imageId) => {
        if (selectedImages.includes(imageId)) {
            setSelectedImages(selectedImages.filter((id) => id !== imageId));
        } else {
            setSelectedImages([...selectedImages, imageId]);
        }
    };
    const baseHeight = 150;

    // Calculate the height based on the number of items
    const calculatedHeight = `${
        small
            ? baseHeight + Math.floor((imageList.length - 1) / 4) * 70
            : baseHeight + Math.floor((imageList.length - 1) / 4) * 160
    }px`;
    // upload new image
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
    // remove image
    const handleImageRemove = (selectedImageIds) => {
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
    // on drag end
    const onChange = (sourceId: string, sourceIndex: number, targetIndex: number) => {
        const nextState = swap(imageList, sourceIndex, targetIndex);
        setImageList(nextState);
    };
    return (
        <>
            <div className=" navbar ps-1 ps-md-2 pe-2 pe-md-3">
                <div className={`container d-flex justify-content-end ${small ? 'px-0' : ''}`}>
                    <Imageupload
                        onImageUpload={handleImageUpload}
                        onImageRemove={handleImageRemove}
                    />
                    <Button className="custom-button" appearance="primary" onClick={handleOpen}>
                        Delete
                    </Button>
                </div>
            </div>
            <Container className="mt-5 mb-5">
                <Row>
                    <Col md={3}>
                        <div
                            className="yellow-border d-flex justify-content-center align-items-center w-100"
                            style={{ minHeight: small ? '14rem' : '10rem' }}
                        >
                            <img
                                className="img-fluid rounded rounded-1 "
                                src={imageList[0].src}
                                alt="featured"
                            />
                        </div>
                    </Col>
                    <Col md={9}>
                        <GridContextProvider onChange={onChange}>
                            <GridDropZone
                                id="items"
                                boxesPerRow={4}
                                rowHeight={small ? 90 : 140}
                                style={{ height: calculatedHeight }}
                            >
                                {imageList.map((item, index) => (
                                    <GridItem key={item.id}>
                                        <div
                                            className={`position-relative d-flex justify-content-center align-items-center rounded rounded-1 m-1 ${
                                                index === 0 ? 'yellow-border' : 'border'
                                            }`}
                                            style={{
                                                height: small ? '5rem' : '8rem',
                                                cursor: '-webkit-grab',
                                            }}
                                        >
                                            <img
                                                className="img-fluid"
                                                src={item.src}
                                                alt={` ${index}`}
                                                style={{ maxHeight: small ? '4.8rem' : '7.8rem' }}
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
                                {selectedImages.length === 1 ? 'selected image' : 'selected images'}{' '}
                                ?
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
        </>
    );
}
