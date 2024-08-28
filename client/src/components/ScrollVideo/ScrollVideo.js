// ScrollVideo.js
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ScrollVideo = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Ensure the video is fully loaded and has a duration
    const onLoadedData = () => {
      const videoDuration = video.duration;
      if (isNaN(videoDuration)) return;  // Check if duration is valid

      // ScrollTrigger to keep video centered until scroll is complete
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: "video",
          start: "top top",
          end: "bottom+=200% bottom",
          scrub: true,
          markers: true
        }
      });
    };

    video.addEventListener('loadeddata', onLoadedData);

    return () => {
      video.removeEventListener('loadeddata', onLoadedData);
    };
  }, []);

  return (
    <div style={{ height: '200vh' }}> {/* Make enough space to scroll */}
      <div style={{ 
        position: 'fixed', 
        top: '50%', 
        left: '50%', 
        transform: 'translate(-50%, -50%)', 
        width: '600px', 
        height: '400px' 
      }}>
        <video
          ref={videoRef}
          width="600"
          autoplay="false"
          height="400"
          style={{ maxWidth: '100%', maxHeight: '100%' }}
        >
          <source src="/printerSplash.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default ScrollVideo;
