import { useRef, useState, useEffect } from "react";

function Stylecard({ src, className = "", mode = "hover" }) {
  const videoRef = useRef(null);
  const animationRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const radius = 26;
  const circumference = 2 * Math.PI * radius;

  const updateProgress = () => {
    const video = videoRef.current;
    if (!video || video.paused || video.ended) return;

    const percent = (video.currentTime / video.duration) * 100;
    setProgress(percent);

    animationRef.current = requestAnimationFrame(updateProgress);
  };

  const handleMouseEnter = () => {
    const video = videoRef.current;
    if (!video) return;

    setIsHovering(true);
    video.play();
    animationRef.current = requestAnimationFrame(updateProgress);
  };

  const handleMouseLeave = () => {
    const video = videoRef.current;
    if (!video) return;

    setIsHovering(false);
    video.pause();
    cancelAnimationFrame(animationRef.current);
  };

  const handleEnded = () => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = 0;
    setProgress(0);

    if (mode === "hover" && isHovering) {
      video.play();
      animationRef.current = requestAnimationFrame(updateProgress);
    }
  };

  //  Scroll Mode Logic
  useEffect(() => {
    const video = videoRef.current;
    if (!video || mode !== "scroll") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play();
          animationRef.current = requestAnimationFrame(updateProgress);
        } else {
          video.pause();
          cancelAnimationFrame(animationRef.current);
        }
      },
      { threshold: 0.6 }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationRef.current);
    };
  }, [mode]);

  // Cleanup for hover mode
  useEffect(() => {
    return () => cancelAnimationFrame(animationRef.current);
  }, []);

  const strokeDashoffset =
    circumference - (progress / 100) * circumference;

  return (
    <div
      className={`relative group ${className}`}
      onMouseEnter={mode === "hover" ? handleMouseEnter : undefined}
      onMouseLeave={mode === "hover" ? handleMouseLeave : undefined}
    >
      <video
        ref={videoRef}
        src={src}
        muted
       loop={mode === "scroll"}
        playsInline
        onEnded={handleEnded}
        className="w-full h-full object-cover"
      />

      <div className="absolute bottom-6 right-6 w-16 h-16 flex items-center justify-center">
        <svg
          className="absolute w-16 h-16"
          viewBox="0 0 60 60"
        >
          <circle
            cx="30"
            cy="30"
            r={radius}
            stroke="white"
            strokeWidth="2"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
          />
        </svg>

        <div className="w-10 h-10 rounded-full border border-white flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
            <polygon points="5,3 19,12 5,21" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default Stylecard;