/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

function Defaultimage({ imageSources }) {
    return (
        <Container>
            <Row className="g-1">
                <Col md={3} className="px-1">
                    <img
                        className="img-fluid yellow-border rounded rounded-1 m-1"
                        src={imageSources[0]}
                        alt="featured"
                    />
                </Col>
                {imageSources.slice(1).map((src, index) => (
                    <Col md={3} className="px-1">
                        <img
                            className="img-fluid border rounded rounded-1 m-1"
                            key={index}
                            src={src}
                            alt={` ${index}`}
                        />
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default Defaultimage;
