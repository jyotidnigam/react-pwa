import React, { useEffect, useState } from 'react';
const Music = (props) => {
  const [play, setPlay] = useState(false);

  const togglePlay = () => {
    setPlay(!play);
    if(!play)
      document.getElementById('player').play()
    else 
      document.getElementById('player').pause()  
  }
  
  return (
    <div>
       {!play ? <i class="fa fa-play btn-cs" onClick={togglePlay}></i>
         : <i class="fa fa-pause btn-cs" onClick={togglePlay}></i>}
        <audio id="player">
          <source src={props.url} type="audio/ogg"/>
          <source src={props.url} type="audio/mpeg"/>
        Your browser does not support the audio element.
        </audio>

    </div>
  );
}

export default Music;