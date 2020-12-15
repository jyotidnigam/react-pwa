import React, { useState, useEffect } from 'react';
import { Button, Card, Container, Row, Col, Image  } from 'react-bootstrap';
import './index.scss';
import demo from '../../utils/demo.json';
import Music from '../common/audioPlayer.js';
import VideoPlayer from '../common/videoPlayer.js';

export const Home = () => {
  const [currentScene, setCurrentScene] = useState({}); 
  const [isStarted, setIsStarted] = useState(false);
  const [isEnded, setIsEnded] = useState(false);
  
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
            {/* <button class="btn-cs">Button</button> */}

                  {
                    currentScene.sound && <Music url={'/music/1.mp3'} />
                  }
                  {
                    currentScene.video && <VideoPlayer url={'/video/v1.mp4'} />
                  }

              <Card.ImgOverlay>
                
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
