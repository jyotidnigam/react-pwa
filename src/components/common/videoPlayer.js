import React, {useEffect, useState} from 'react';

const VideoPlayer = (props) => {

    
    const videoUrl = '/video/v1.mp4';
    

    return (
        <iframe src={videoUrl} width="560" height="315"/>
        // <video id="background-video" height={600} width={200} controls id="videoclip"> 
        //     <source src={videoUrl} type="video/mp4" />
        //     <source src={videoUrl} type="video/ogg" />
        //         Your browser does not support the video tag.
        // </video>
    )
}


export default VideoPlayer;