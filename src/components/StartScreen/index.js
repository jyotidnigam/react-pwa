import React from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';

const StartScreen = (props) => {

    const { start } = props;
    return <Card className="bg-dark text-white">
        <Card.Img src={`/images/img1.jpg`} />
        <Card.ImgOverlay align="center">
            <Row className="w-100">
                <Col>
                    <Button className="play-btn" onClick={start}>Start</Button>
                </Col>
            </Row>
        </Card.ImgOverlay>
    </Card>
}

export default StartScreen;