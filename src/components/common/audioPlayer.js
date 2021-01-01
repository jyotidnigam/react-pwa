import React from 'react';
const Music = () => {

  return (
    <div>
      <audio id="player" autoPlay>
        <source type="audio/mp3" />
      </audio>

    </div>
  );
}

export default Music;