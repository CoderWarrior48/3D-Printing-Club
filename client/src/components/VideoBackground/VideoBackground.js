import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const VideoContainer = styled.div`
    top: 0;
    left: 0;
    width: 100vw:
    height: 100vh;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const TextContainer = styled.div`
  background-color: green;
  text-align: center;
  display: flex;
  justify-items: center;
  align-items: center;
  height: 100vh;
`;
const Video = styled.video`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
`;

const VideoBackground = ({src}) => {
    return (
      <VideoContainer>
        <Video autoPlay loop muted>
            <source src={src} type="video/mp4" />
        </Video>
        <TextContainer>
          <div style={{backgroundColor: 'red', height: 'min-content'}}>
            <h1>DO 3D Printing Club</h1>
            <h4>Unbound posibilities</h4>
            <Link
                className="btn btn-outline-light btn-lg"
                to={`explore`}
            >
            Explore
            </Link>
          </div>
        </TextContainer>
      </VideoContainer>   
    )
}

export default VideoBackground;