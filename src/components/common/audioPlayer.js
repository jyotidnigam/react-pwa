
import React, {useEffect, useState} from 'react';
const Music = (props) => {
  const [play, setPlay] = useState(false);
  const [ audio ] = useState(new Audio(props.url))
  useEffect(()=>{
    audio.addEventListener('ended', () => setPlay(false));
    return () => {
      audio.removeEventListener('ended', () => this.setState({ play: false }));
    }
  });
 
  const togglePlay = () => {
    setPlay(!play);
    if(audio.paused){
      audio.play();
     } else {
      audio.pause();
     }    
  }

    return (
      <div>
          {!play ? <i class="fa fa-play" onClick={togglePlay}></i> : <i class="fa fa-pause" onClick={togglePlay}></i>}
      </div>
    );
  
}

export default Music;