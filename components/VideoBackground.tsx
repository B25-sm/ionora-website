'use client';

import { useEffect, useState } from 'react';

export default function VideoBackground() {
  const [active, setActive] = useState('medisoul'); // default visible video

  useEffect(() => {
    const vids = document.querySelectorAll<HTMLVideoElement>('video[data-ionora]');

    vids.forEach((video) => {
      video.muted = true;
      video.playsInline = true;
      void video.play().catch((err) => {
        console.warn('Autoplay blocked:', video.currentSrc || video.src, err instanceof Error ? err.message : err);
      });
    });
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      {/* Medisoul */}
      <video
        data-ionora
        src="/videos/Ionora.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className={`absolute top-1/2 left-1/2 h-auto min-h-full min-w-full w-auto -translate-x-1/2 -translate-y-1/2 transform transition-opacity duration-500 ${
          active === 'medisoul' ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Life Ionizers */}
      <video
        data-ionora
        src="/videos/lifeionizer.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className={`absolute top-1/2 left-1/2 h-auto min-h-full min-w-full w-auto -translate-x-1/2 -translate-y-1/2 transform transition-opacity duration-500 ${
          active === 'lifeionizer' ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Mediqua */}
      <video
        data-ionora
        src="/videos/mediqua.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className={`absolute top-1/2 left-1/2 h-auto min-h-full min-w-full w-auto -translate-x-1/2 -translate-y-1/2 transform transition-opacity duration-500 ${
          active === 'mediqua' ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Radio Controls */}
      <div className="absolute bottom-10 left-10 space-y-3 rounded-2xl bg-black/40 p-4 text-white backdrop-blur-sm">
        {['medisoul', 'lifeionizer', 'mediqua'].map((label) => (
          <label
            key={label}
            className="flex cursor-pointer items-center gap-2 transition-opacity hover:opacity-80"
          >
            <input
              type="radio"
              name="videoToggle"
              checked={active === label}
              onChange={() => setActive(label)}
              className="h-4 w-4 accent-indigo-500"
            />
            <span className="font-medium capitalize">
              {label.replace(/ionizer/, ' Ionizers')}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}

