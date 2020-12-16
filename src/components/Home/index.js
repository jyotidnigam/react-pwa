import React, { useState, useEffect } from 'react';
import { Button, Card, Container, Row, Col, Image  } from 'react-bootstrap';
import './index.scss';
import demo from '../../utils/demo.json';
import Music from '../common/audioPlayer';
import StartScreen from '../StartScreen'
import VideoPlayer from '../common/videoPlayer';

export const Home = () => {
  const [currentScene, setCurrentScene] = useState({}); 
  const [isStarted, setIsStarted] = useState(false);
  const [isEnded, setIsEnded] = useState(false);

  useEffect(()=>{
    document.addEventListener('contextmenu', (e) => {
      e.preventDefault();
    });
  })
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
     
    <Container>
      {!isStarted && 
            <StartScreen start={start}/>
      }
      {
        isStarted && !isEnded &&  <Row className="game-dashboard">
          <Col xs={12} className="w-100">
          <div>
            <Card className="bg-dark text-white" id="videoDiv">
                  { currentScene.image && !currentScene.video && <Card.Img src={`/images/${currentScene.image}`}/> }
                  {
                    currentScene.sound && <Music url={`/music/${currentScene.sound}`} />
                  }
                  {
                    currentScene.video && <VideoPlayer url={`/video/${currentScene.video}`} repeat={currentScene.repeatVideo}/>
                   }
              <Card.ImgOverlay>
                <div id="videoMessage">
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
                  <Row className="w-100 text-center">
                    <Col xs={12}>
                      <Button className="play-btn" onClick={playAgain}>Play Again</Button>
                  </Col>
                </Row> 
                }
                </Row>
                </div>
              </Card.ImgOverlay>
            </Card>
          </div>
          </Col>
        </Row>
      }

    </Container>
    </div>
  );
}

export default Home;
