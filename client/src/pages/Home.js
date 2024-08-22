import React from "react";
import VideoBackground from "../components/VideoBackground/VideoBackground";
import Carousel from "../components/Carousel/Carousel";

const Home = () => {
    return (
        <div>
            <VideoBackground src="/printerSplash.mp4"/>
            <h1>Create your own personalized items with the power of 3d printing</h1>
            <Carousel />
            <p>Considering adding advanced scroll animations and visual. This website is still under construction!</p>


        </div>
            
    )
}

export default Home;