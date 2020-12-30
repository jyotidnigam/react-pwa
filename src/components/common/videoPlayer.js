import React from 'react';

const VideoPlayer = (props) => {
    return (
        <video id="video1" loop={props.repeat} autoPlay style={{
            display: props.toggle ? 'none':'block'
        }}> 
            <source src={props.url} type="video/mp4" />
                Your browser does not support the video tag.
        </video>

    )
}

export default VideoPlayer;