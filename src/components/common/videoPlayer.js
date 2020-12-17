import React from 'react';

const VideoPlayer = (props) => {
    return (
        <video id="video1" width="100%" loop={props.repeat} autoPlay> 
            <source src={props.url} type="video/mp4" />
                Your browser does not support the video tag.
        </video>

    )
}

export default VideoPlayer;