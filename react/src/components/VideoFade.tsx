import { useRef, useEffect } from 'react';

interface VideoFadeProps {
  src: string;
}

export default function VideoFade({ src }: VideoFadeProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let fadingOut = false;
    let animFrame: number;

    function fadeIn() {
      const start = performance.now();
      function step(now: number) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / 500, 1);
        video.style.opacity = String(progress);
        if (progress < 1) animFrame = requestAnimationFrame(step);
      }
      animFrame = requestAnimationFrame(step);
    }

    function fadeOut() {
      fadingOut = true;
      const start = performance.now();
      function step(now: number) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / 500, 1);
        video.style.opacity = String(1 - progress);
        if (progress < 1) animFrame = requestAnimationFrame(step);
        else fadingOut = false;
      }
      animFrame = requestAnimationFrame(step);
    }

    function onCanplay() { video.play(); fadeIn(); }
    function onTimeupdate() {
      if (video.duration - video.currentTime <= 0.55 && !fadingOut) fadeOut();
    }
    function onEnded() {
      video.style.opacity = '0';
      setTimeout(() => { video.currentTime = 0; video.play(); fadeIn(); }, 100);
    }

    video.addEventListener('canplay', onCanplay);
    video.addEventListener('timeupdate', onTimeupdate);
    video.addEventListener('ended', onEnded);

    return () => {
      video.removeEventListener('canplay', onCanplay);
      video.removeEventListener('timeupdate', onTimeupdate);
      video.removeEventListener('ended', onEnded);
      cancelAnimationFrame(animFrame);
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      src={src}
      muted
      autoPlay
      playsInline
      preload="auto"
      className="hero-video"
    />
  );
}
