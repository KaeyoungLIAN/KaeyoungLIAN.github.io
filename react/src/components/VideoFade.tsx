import { useRef, useEffect } from 'react';

interface VideoFadeProps {
  src: string;
  className?: string;
}

export default function VideoFade({ src, className = '' }: VideoFadeProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let fadingOut = false;
    let fadingIn = false;
    let animFrame: number;

    function fadeIn() {
      fadingIn = true;
      const start = performance.now();
      const initialOpacity = parseFloat(video.style.opacity) || 0;
      function step(now: number) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / 500, 1);
        video.style.opacity = String(initialOpacity + (1 - initialOpacity) * progress);
        if (progress < 1) {
          animFrame = requestAnimationFrame(step);
        } else {
          fadingIn = false;
        }
      }
      animFrame = requestAnimationFrame(step);
    }

    function fadeOut() {
      fadingOut = true;
      const start = performance.now();
      const initialOpacity = parseFloat(video.style.opacity) || 1;
      function step(now: number) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / 500, 1);
        video.style.opacity = String(initialOpacity * (1 - progress));
        if (progress < 1) {
          animFrame = requestAnimationFrame(step);
        } else {
          fadingOut = false;
        }
      }
      animFrame = requestAnimationFrame(step);
    }

    function onCanPlay() {
      video.play();
      fadeIn();
    }

    function onTimeUpdate() {
      const remaining = video.duration - video.currentTime;
      if (remaining <= 0.55 && !fadingOut) {
        fadeOut();
      }
    }

    function onEnded() {
      video.style.opacity = '0';
      setTimeout(() => {
        video.currentTime = 0;
        video.play();
        fadeIn();
      }, 100);
    }

    video.addEventListener('canplay', onCanPlay);
    video.addEventListener('timeupdate', onTimeUpdate);
    video.addEventListener('ended', onEnded);

    return () => {
      video.removeEventListener('canplay', onCanPlay);
      video.removeEventListener('timeupdate', onTimeUpdate);
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
      className={className}
      style={{ opacity: 0 }}
    />
  );
}
