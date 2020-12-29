import React from 'react';
const Music = () => {

  return (
    <div>
        <audio id="player" autoPlay>
          <source type="audio/mp3"/>
        Your browser does not support the audio element.
        </audio>

    </div>
  );
}

export default Music;