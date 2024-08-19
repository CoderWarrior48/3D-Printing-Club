import React from "react";
import ModelViewer from "../components/ModelViewer/ModelViewer";

const About = () => {
    return (
        <div>
            <h1>About</h1>
            <div className="flex justify-center items-center h-screen w-screen">
                <ModelViewer />
            </div>
        </div>
    )
}

export default About;