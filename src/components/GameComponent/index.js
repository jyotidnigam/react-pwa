import React, { useState, useEffect,lazy, Suspense } from 'react';
import { Button, Card, Container, Row, Col, Image  } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import './index.scss';
import { useGameState } from '../../Context';
import { gameInitialState } from '../../Context/Reducers/gameReducer';
import StartScreen from '../StartScreen'
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
  const [ gameDetails, setGameDetails] = useState({});

  useEffect(async()=>{
    document.addEventListener('contextmenu', (e) => {
      e.preventDefault();
    });
    const detail = games.length ? games.find((g) => g._id === gameId) : ''
    if(!detail){
      const res = await getGameById(gamesDispatch, gameId);
      if(res){
        if(Object.keys(game).length)
          setGameDetails(JSON.parse(res.gameJson))
      }else alert(res.error);
    }
    else
      setGameDetails(JSON.parse(detail.gameJson))
  }, [gameId, games, game])

  const start = () => {
    setIsEnded(false);
    const rootScene = gameDetails['config'].rootScene;
    const scene = gameDetails.scenes[rootScene]
    setCurrentScene(scene);
    setIsStarted(true);
  }

  const playAgain = () => {
    setIsEnded(true);
    setIsStarted(false);
  }
  const choiceSelection = (followupScene) => { 
    const scene = gameDetails.scenes[followupScene]
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
                  { currentScene.image && !currentScene.video && <Card.Img src={currentScene.image}/> }
                  {
                    currentScene.sound && <Suspense fallback={()=><div></div>}>
                        <Music url={currentScene.sound} />
                      </Suspense>
                  }
                  {
                    currentScene.video && <Suspense fallback={()=><div></div>}>
                     <VideoPlayer url={currentScene.video} repeat={currentScene.repeatVideo}/>
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