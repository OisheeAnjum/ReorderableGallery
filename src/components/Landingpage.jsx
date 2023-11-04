/* eslint-disable react/no-array-index-key */
/* eslint-disable no-shadow */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { Col, Container, Row } from 'react-bootstrap';

import { Button } from 'rsuite';
import image1 from '../assets/images/T1It0qMA.png';
import image2 from '../assets/images/U6OVh27Q.png';
import image4 from '../assets/images/iegS0M-g.png';
import image5 from '../assets/images/z90_d-Pg.png';
import Imageupload from './Imageupload';

export default function Landingpage() {
    const [selectedImages, setSelectedImages] = useState([]);

    const handleImageSelect = (imageId) => {
        if (selectedImages.includes(imageId)) {
            setSelectedImages(selectedImages.filter((id) => id !== imageId));
        } else {
            setSelectedImages([...selectedImages, imageId]);
        }
        console.log(imageId);
    };

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
        // Add more images as needed
    ];

    const [imageList, setImageList] = useState(imageSources);
    const handleImageUpload = (newImages) => {
        Array.from(newImages).forEach((image, index) => {
            // You can use FileReader to read each uploaded image and generate a URL for it.
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

    const handleDragEnd = (result) => {
        if (!result.destination) {
            return;
        }

        const reorderedImages = [...imageList];
        const [movedImage] = reorderedImages.splice(result.source.index, 1);
        reorderedImages.splice(result.destination.index, 0, movedImage);

        setImageList(reorderedImages);
    };
    const handleImageRemove = (selectedImageIds) => {
        const updatedImageList = imageList.filter((image) => !selectedImageIds.includes(image.id));
        setImageList(updatedImageList);
    };
    // const grid = 8;
    const getListStyle = (isDraggingOver) => ({
        background: isDraggingOver ? 'lightblue' : 'lightgrey',
        overflow: 'scroll',
    });

    // const getItemStyle = () => ({
    //     height: '22rem',
    //     width: '22rem',
    // });

    return (
        <Container className="mt-4">
            <Imageupload onImageUpload={handleImageUpload} onImageRemove={handleImageRemove} />
            <Button onClick={() => handleImageRemove(selectedImages)}>Delete</Button>
            <Row>
                <Col md={3}>
                    <img
                        className="img-fluid rounded rounded-1 yellow-border"
                        src={imageList[0].src}
                        alt="featured"
                    />
                </Col>
                <Col md={9}>
                    <DragDropContext onDragEnd={handleDragEnd}>
                        <Droppable droppableId="image-gallery" direction="horizontal">
                            {(provided, snapshot) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    style={getListStyle(snapshot.isDraggingOver)}
                                >
                                    <Row>
                                        {imageList.map((item, index) => (
                                            <Draggable
                                                draggableId={`draggable-${item.id}`}
                                                key={`draggable-${item.id}`}
                                                index={index}
                                            >
                                                {(provided) => (
                                                    <Col
                                                        md={3}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                    >
                                                        <div className="position-relative ">
                                                            <img
                                                                ref={provided.innerRef}
                                                                className={`img-fluid  rounded rounded-1 m-1 ${
                                                                    index === 0
                                                                        ? 'yellow-border'
                                                                        : 'border'
                                                                }`}
                                                                src={item.src}
                                                                alt={` ${index}`}
                                                            />
                                                            <input
                                                                className="position-absolute"
                                                                type="checkbox"
                                                                checked={selectedImages.includes(
                                                                    item.id
                                                                )}
                                                                onChange={() =>
                                                                    handleImageSelect(item.id)
                                                                }
                                                                style={{
                                                                    zIndex: '10',
                                                                    top: '8px',
                                                                    right: '2px',
                                                                }}
                                                            />
                                                        </div>
                                                    </Col>
                                                )}
                                            </Draggable>
                                        ))}
                                    </Row>
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                </Col>
            </Row>
        </Container>
    );
}
