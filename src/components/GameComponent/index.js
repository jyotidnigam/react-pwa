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
      debugger
    const res = await getGameById(gamesDispatch, gameId);
    setGameDetails(JSON.parse(res.gameJson || ''))
    }    
    gameDetails && !isStarted && start();
  }, [gameDetails])

  const start = () => {
    setIsEnded(false);
    const rootScene = gameDetails['config'].rootScene;
    const scene = gameDetails.scenes[rootScene]
    debugger
    setCurrentScene(scene);
  }

  const choiceSelection = (followupScene) => { 

    const scene = gameDetails.scenes[followupScene]
    {
      let video = document.getElementById("video1");
      video && video.setAttribute('src', '/media/' + scene.movie)
      video && video.load();
    }
    if (scene.music && (scene.music !== currentScene.music || !currentScene.music)) {
      let music = document.getElementById("player");
      music && music.setAttribute('src', '/media/' + scene.music)
      if (music) {
        music.load();
        music.play();
      }
    }
    setCurrentScene(scene);
  }
  return (
    <div className="background-section">
     
    <Container>
      {
        <Row className="game-dashboard">
          <Col xs={12} className="w-100">
          <div>
            <Card className="bg-dark text-white" id="videoDiv" 
            style={{  
              backgroundImage: "url(" + "/media/"+currentScene.image + ")",
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat'
            }} >
                  {
                    currentScene.movie && <Suspense fallback={<div/>}>
                      <VideoPlayer url={'/media/' + currentScene.movie} 
                      repeat={currentScene.moviePlaybackOption === 'repeat' ? true: false} />
                    </Suspense>
                  }
                  
                  <Suspense fallback={<div/>}>
                      <Music />
                  </Suspense>
                  
              <Card.ImgOverlay>
                <div id="videoMessage">
                  <Row>
                    <Col xs={12} className="text-block mb-2">
                      <span>{currentScene.message}</span>
                    </Col>
                  </Row>
                  <Row className="choices-block">
                  {
                  currentScene &&  currentScene.choices && currentScene.choices.length ? currentScene.choices.map((choice, i) => {
                    return <Col xs={12} className="dialog-block mb-2"
                      onClick={() => choiceSelection(choice.followupScene)}>
                        <h6>{choice.text}</h6>                      
                    </Col>
                  }) :
                 "" 
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