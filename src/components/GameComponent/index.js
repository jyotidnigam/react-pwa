import React, { useState, useEffect,lazy, Suspense } from 'react';
import { Card, Container, Row, Col, Image  } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import './index.scss';
import { useGameState } from '../../Context';
import { getGameById } from '../../Context/Actions/gameActions';

const VideoPlayer = lazy(() => import('../common/videoPlayer'));
const Music = lazy(() => import('../common/audioPlayer'));

export const Home = () => {
  const [currentScene, setCurrentScene] = useState({}); 
  const [isStarted, setIsStarted] = useState(false);
  const [isEnded, setIsEnded] = useState(false);
  const { pathname } = useLocation();
  const gameId = pathname.split('/')[2]
  const { games : { games, game } = {}, gamesDispatch } = useGameState();
  const [ gameDetails, setGameDetails] = useState(null);

  useEffect(async()=>{
     document.addEventListener('contextmenu', (e) => { 
       e.preventDefault();
       });
     
      if(!gameDetails){ 
        const res = await getGameById(gamesDispatch, gameId); 
        setGameDetails(JSON.parse(res.gameJson || '')) 
      } 
      gameDetails && !isStarted && start(); 
    }, [gameDetails]) 

  const start = () => {
    const rootScene = gameDetails['config'].rootScene;
    const scene = gameDetails.scenes[rootScene]
    setCurrentScene(scene);
  }

  const choiceSelection = (followupScene) => { 
    const scene = gameDetails.scenes[followupScene]
    setCurrentScene(scene);
  }

  return (
    <div className="background-section">
     
    <Container>
      {
        <Row className="game-dashboard">
          <Col xs={12} className="w-100">
          <div>
            <Card className="bg-dark text-white" id="videoDiv">
                  { currentScene.image && <Card.Img src={'/images/'+currentScene.image}/> }
                  {
                    currentScene.movie && <Suspense fallback={()=><div></div>}>
                     <VideoPlayer url={'/video/'+currentScene.movie} repeat={currentScene.repeatVideo}/>
                    </Suspense>
                   }
                  {
                    currentScene.sound && <Suspense fallback={()=><div></div>}>
                        <Music url={'/music/'+currentScene.sound} />
                      </Suspense>
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
                  currentScene && currentScene.choices && currentScene.choices.length && currentScene.choices.map((choice, i) => {
                    return <Col xs={12} className="dialog-block mb-2"
                      onClick={() => choiceSelection(choice.followupScene)}>
                        <h6>{choice.text}</h6>                      
                    </Col>
                  }) 
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