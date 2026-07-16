import { useEffect, useRef } from "react";

const FrameHoverPlayer = ({ frames, fps = 1 }) => {
  const imgRef = useRef(null);
  const containerRef = useRef(null);
  const rafRef = useRef(null);
  const lastTimeRef = useRef(0);
  const frameRef = useRef(0);
  const playingRef = useRef(false);
  const startedRef = useRef(false); // first hover trigger

  // preload images
  useEffect(() => {
    frames.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, [frames]);

  const animate = (time) => {
    if (!playingRef.current) return;

    const delta = time - lastTimeRef.current;

    if (delta >= 1000 / fps) {
      frameRef.current = (frameRef.current + 1) % frames.length;
      imgRef.current.src = frames[frameRef.current];
      lastTimeRef.current = time;
    }

    rafRef.current = requestAnimationFrame(animate);
  };

  const start = () => {
    if (playingRef.current) return;

    playingRef.current = true;
    lastTimeRef.current = performance.now();
    rafRef.current = requestAnimationFrame(animate);
  };

  const stop = () => {
    playingRef.current = false;
    cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
  };

  //  Intersection Observer (scroll detection)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!startedRef.current) return;

        if (entry.isIntersecting) {
          start(); // resume
        } else {
          stop(); // pause
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  // First hover trigger only
  const handleFirstHover = () => {
    if (startedRef.current) return;

    startedRef.current = true;
    start();
  };

  return (
    <div
      ref={containerRef}
      className="absolute inset-0"
      onMouseEnter={handleFirstHover}
    >
      <img
        ref={imgRef}
        src={frames[0]}
        className="w-full h-full object-cover"
        alt=""
      />
    </div>
  );
};

export default FrameHoverPlayer;
