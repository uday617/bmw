import { useRef, useState, useEffect } from "react";

function ClickableVideo({ src, className = "", playMode = "click" }) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const observerRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  // 🔥 Smooth progress updater
  const updateProgress = () => {
    const video = videoRef.current;
    if (!video || !video.duration) return;

    const percent = (video.currentTime / video.duration) * 100;

    if (video.currentTime >= video.duration - 0.05) {
      setProgress(100);
      return;
    }

    setProgress(percent);
    animationRef.current = requestAnimationFrame(updateProgress);
  };

  const playVideo = () => {
    const video = videoRef.current;
    if (!video) return;

    video.play();
    setIsPlaying(true);
    animationRef.current = requestAnimationFrame(updateProgress);
  };

  const pauseVideo = () => {
    const video = videoRef.current;
    if (!video) return;

    video.pause();
    setIsPlaying(false);
    cancelAnimationFrame(animationRef.current);
  };

  const togglePlay = () => {
    if (isPlaying) {
      pauseVideo();
    } else {
      playVideo();
    }
  };

  const handleEnded = () => {
    cancelAnimationFrame(animationRef.current);
    setIsPlaying(false);
    setProgress(0);

    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  };

  // 🔥 Scroll based auto play / pause
  useEffect(() => {
    if (playMode !== "scroll") return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= 0.6) {
          playVideo();
        } else {
          pauseVideo();
        }
      },
      {
        threshold: [0, 0.6, 1],
      }
    );

    if (containerRef.current) {
      observerRef.current.observe(containerRef.current);
    }

    return () => {
      if (observerRef.current && containerRef.current) {
        observerRef.current.unobserve(containerRef.current);
      }
    };
  }, [playMode]);

  // 🔥 Cleanup RAF
  useEffect(() => {
    return () => cancelAnimationFrame(animationRef.current);
  }, []);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <video
        ref={videoRef}
        src={src}
        className="w-full h-full object-cover cursor-pointer"
        playsInline
        onEnded={handleEnded}
        onClick={playMode === "click" ? togglePlay : undefined}
      />

      {/* Play / Pause Icon (only for click mode) */}
      {playMode === "click" && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            togglePlay();
          }}
          className="absolute bottom-4 left-4 text-white hover:opacity-80 transition"
        >
          {isPlaying ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
              <rect x="6" y="5" width="4" height="14" />
              <rect x="14" y="5" width="4" height="14" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
              <polygon points="5,3 19,12 5,21" />
            </svg>
          )}
        </button>
      )}
      {/* Timeline */}
      <div className="absolute bottom-0 left-0 w-full h-0.75 bg-white/20">
        <div
          className="h-full bg-white"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

export default ClickableVideo;