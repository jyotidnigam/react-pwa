import React, { useState, useEffect } from 'react';
import { Button, Card, Container, Row, Col, Image  } from 'react-bootstrap';
import './index.scss';
import demo from '../../utils/demo.json';

export const Home = () => {
  const [currentScene, setCurrentScene] = useState({}); 
  const [isStarted, setIsStarted] = useState(false);
  const [isEnded, setIsEnded] = useState(false);
  useEffect(() => {
    
  });
  const start = () => {
    setIsEnded(false);
    const rootScene = demo['config'].rootScene;
    const scene = demo.scenes[rootScene]
    setCurrentScene(scene);
    setIsStarted(true);
  }

  const playAgain = () => {
    setIsEnded(true);
    setIsStarted(false);
  }
  const choiceSelection = (followupScene) => { 
    const scene = demo.scenes[followupScene]
    setCurrentScene(scene);
  }

  return (
    <div className="background-section">
      <div className="content-wrapper">
    <Container className="h-100">
      {!isStarted && 
            <Card className="bg-dark text-white">
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
      {
        isStarted && !isEnded &&  <Row className="game-dashboard">
          <Col xs={12} className="w-100">
            <Card className="bg-dark text-white">
            <Card.Img src={`/images/${currentScene.image}`}/>
              <Card.ImgOverlay>
                {/* <Card.Title>{currentScene.message}</Card.Title> */}
                <Row>
                  <Col xs={12} className="text-block mb-2">
                     <span>{currentScene.message}</span>
                  </Col>
                </Row>
                <Row className="choices-block">
                  {
                  currentScene && currentScene.choices.length ? currentScene.choices.map((choice, i) => {
                    return <Col xs={12} className="dialog-block mb-2"
                      onClick={() => choiceSelection(choice.followupScene)}>
                        <h6>{choice.text}</h6>                      
                    </Col>
                  }) :
                  <Row className="w-100">
                    <Col>
                  <Button className="play-btn" onClick={playAgain}>Play Again</Button>
                  </Col>
                </Row> 
                }
                </Row>
              </Card.ImgOverlay>
            </Card>
          </Col>
        </Row>
      }

    </Container>
    </div>
    </div>
  );
}

export default Home;
