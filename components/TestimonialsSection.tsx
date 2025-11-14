'use client';

import Image from 'next/image';
import { useMemo, useRef, useState, useEffect, useCallback } from 'react';

type Testimonial = {
  id: number;
  name: string;
  title: string;
  company: string;
  avatar: string;
  video: string;
  thumbnailTime?: number;
};

type TestimonialSource = Omit<Testimonial, 'id' | 'video'> & {
  fileName: string;
};

const encodeVideoPath = (fileName: string) => `/Testimonials/${encodeURIComponent(fileName)}`;

const testimonialSources: TestimonialSource[] = [
  {
    name: 'Barry Zito',
    title: 'Former MLB Pitcher',
    company: 'Major League Baseball',
    avatar: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&w=96&q=80',
    fileName: '1df2d62642bb4aa1837f6abc171998f7 (1).mp4',
  },
  {
    name: 'Sage Northcutt',
    title: 'Professional Mixed Martial Artist',
    company: 'ONE Championship',
    avatar: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=96&q=80',
    fileName: '3ce02033ea3c4f77b69d9c2aec658f5f (2).mp4',
  },
  {
    name: 'Anita Desai',
    title: 'Spa Manager',
    company: 'Tranquil Waters',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=96&q=80',
    fileName: '478524272f954ab2bd9ac7d998104a9e.mp4',
    thumbnailTime: 6,
  },
  {
    name: 'Barry Zito',
    title: 'Former MLB Pitcher',
    company: 'Major League Baseball',
    avatar: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=96&q=80',
    fileName: '51ba8d582c6d43098c4273f85bc31e93.mp4',
  },
  {
    name: 'Elena Martinez',
    title: 'Founder',
    company: 'PureGlow Studios',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=96&q=80',
    fileName: '645f4a3430d949f3b3be0a65c93484d6 (1).mp4',
  },
  {
    name: 'Noah Williams',
    title: 'Performance Coach',
    company: 'Vitality Club',
    avatar: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=96&q=80',
    fileName: '67728e7c49674b29851e1747d49da6d3.mp4',
    thumbnailTime: 4,
  },
  {
    name: 'Sahana Iyengar',
    title: 'Holistic Therapist',
    company: 'Rejuvenate Spa',
    avatar: 'https://images.unsplash.com/photo-1524503033411-c9566986fc8f?auto=format&fit=crop&w=96&q=80',
    fileName: '6f1efa7654fc4aa0980d93739043bbe0 (5).mp4',
    thumbnailTime: 5,
  },
  {
    name: 'James Porter',
    title: 'General Manager',
    company: 'Blue Haven Resort',
    avatar: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=96&q=80',
    fileName: 'a1e098ba75ab481fb8e63f9651ce8f3b.mp4',
  },
  {
    name: 'Minji Park',
    title: 'Product Trainer',
    company: 'Mediqua Labs',
    avatar: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=96&q=80',
    fileName: 'AK-9000 Mediqua alkaline water ionizer (1).mp4',
  },
  {
    name: 'Mira Bose',
    title: 'Nutritionist',
    company: 'Balance Collective',
    avatar: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=96&q=80',
    fileName: 'f92c66840e94418cbdb9d274d42ec8c3.mp4',
  },
  {
    name: 'Lydia Grant',
    title: 'Program Director',
    company: 'Renew Wellness',
    avatar: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=96&q=80',
    fileName: 'LIFE Ionizer Advanced Education Part 1.mp4',
    thumbnailTime: 18,
  },
];

const testimonials: Testimonial[] = testimonialSources
  .filter(
    (source) => !/mediqua/i.test(source.fileName) && !/ionora/i.test(source.fileName)
  )
  .map((source, index) => ({
    id: index + 1,
    name: source.name,
    title: source.title,
    company: source.company,
    avatar: source.avatar,
    video: encodeVideoPath(source.fileName),
    thumbnailTime: source.thumbnailTime,
  }));

const posterCache = new Map<string, string>();

let currentPlaying: number | null = null;
let currentPlayingEl: HTMLVideoElement | null = null;
const PLAY_DEBOUNCE_MS = 300;

async function safePlay(videoEl: HTMLVideoElement, id: number) {
  if (!videoEl) return;

  videoEl.muted = true;
  videoEl.playsInline = true;

  if (currentPlaying !== null && currentPlaying !== id && currentPlayingEl) {
    try {
      safePause(currentPlayingEl, currentPlaying);
    } catch (error) {
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Failed to pause previous testimonial video', error);
      }
    }
  }

  currentPlaying = id;
  currentPlayingEl = videoEl;

  try {
    const playPromise = videoEl.play();
    if (playPromise && typeof playPromise.then === 'function') {
      await playPromise;
    }
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(`safePlay warning for testimonial ${id}`, error);
    }
    if (videoEl.paused) {
      currentPlaying = null;
      currentPlayingEl = null;
    }
  }
}

function safePause(videoEl: HTMLVideoElement, id: number) {
  if (!videoEl) return;
  try {
    videoEl.pause();
  } catch (error) {
    if (!(error instanceof DOMException && error.name === 'AbortError')) {
      if (process.env.NODE_ENV !== 'production') {
        console.warn(`safePause warning for testimonial ${id}`, error);
      }
    }
  } finally {
    if (currentPlaying === id) {
      currentPlaying = null;
      currentPlayingEl = null;
    }
  }
}

type TestimonialCardProps = {
  testimonial: Testimonial;
  isActive: boolean;
  registerVideo: (id: number, element: HTMLVideoElement | null) => void;
  onRequestPlay: (id: number) => Promise<boolean>;
  onRequestPause: (id: number) => void;
};

const TestimonialCard = ({
  testimonial,
  isActive,
  registerVideo,
  onRequestPlay,
  onRequestPause,
}: TestimonialCardProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [poster, setPoster] = useState<string | null>(null);
  const [hasError, setHasError] = useState(false);
  const lastClickRef = useRef(0);

  const handleTogglePlayback = useCallback(async () => {
    const video = videoRef.current;
    if (!video || hasError) return;

    const now = Date.now();
    if (now - lastClickRef.current < PLAY_DEBOUNCE_MS) {
      return;
    }
    lastClickRef.current = now;

    if (video.paused) {
      const started = await onRequestPlay(testimonial.id);
      if (!started || video.paused) {
        setIsPlaying(false);
        return;
      }
      setIsPlaying(true);
    } else {
      onRequestPause(testimonial.id);
      setIsPlaying(false);
    }
  }, [hasError, onRequestPause, onRequestPlay, testimonial.id]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePause = () => {
      setIsPlaying(false);
      onRequestPause(testimonial.id);
    };
    const handleEnded = () => {
      safePause(video, testimonial.id);
      onRequestPause(testimonial.id);
      setIsPlaying(false);
    };
    const handlePlay = () => setIsPlaying(true);

    video.addEventListener('pause', handlePause);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('play', handlePlay);

    return () => {
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('play', handlePlay);
    };
  }, [onRequestPause, testimonial.id]);

  useEffect(() => {
    registerVideo(testimonial.id, videoRef.current);
    return () => {
      registerVideo(testimonial.id, null);
    };
  }, [registerVideo, testimonial.id]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (!isActive && !video.paused) {
      safePause(video, testimonial.id);
      setIsPlaying(false);
    }
  }, [isActive, testimonial.id]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleError = () => {
      setHasError(true);
      setIsPlaying(false);
    };

    const handleLoadedData = () => {
      setHasError(false);
    };

    video.addEventListener('error', handleError);
    video.addEventListener('loadeddata', handleLoadedData);

    return () => {
      video.removeEventListener('error', handleError);
      video.removeEventListener('loadeddata', handleLoadedData);
    };
  }, []);

  useEffect(() => {
    let isMounted = true;
    const cachedPoster = posterCache.get(testimonial.video);
    if (cachedPoster) {
      setPoster(cachedPoster);
      return;
    }

    const generatePoster = async () => {
      try {
        if (hasError) return;
        const frameTime = testimonial.thumbnailTime ?? 3;
        const videoElement = document.createElement('video');
        videoElement.crossOrigin = 'anonymous';
        videoElement.preload = 'auto';
        videoElement.muted = true;
        videoElement.playsInline = true;
        videoElement.src = testimonial.video;

        const captureFrame = () =>
          new Promise<string>((resolve, reject) => {
            const cleanup = () => {
              try {
                videoElement.pause();
              } catch (error) {
                if (!(error instanceof DOMException && error.name === 'AbortError')) {
                  if (process.env.NODE_ENV !== 'production') {
                    console.warn('Poster capture pause failed', error);
                  }
                }
              }
              videoElement.removeAttribute('src');
              videoElement.load();
            };

            const handleSeeked = () => {
              try {
                const canvas = document.createElement('canvas');
                canvas.width = videoElement.videoWidth;
                canvas.height = videoElement.videoHeight;
                const ctx = canvas.getContext('2d');
                if (!ctx) {
                  cleanup();
                  reject(new Error('Unable to obtain canvas context'));
                  return;
                }
                ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
                const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
                cleanup();
                resolve(dataUrl);
              } catch (error) {
                cleanup();
                reject(error);
              }
            };

            const handleError = () => {
              cleanup();
              reject(new Error('Failed to capture poster frame'));
            };

            videoElement.addEventListener('seeked', handleSeeked, { once: true });
            videoElement.addEventListener('error', handleError, { once: true });

            const hasDuration = Number.isFinite(videoElement.duration) && videoElement.duration > 0;
            const safeDuration = hasDuration ? Math.max(videoElement.duration - 0.25, 0.1) : undefined;
            const targetTime =
              Number.isFinite(frameTime) && frameTime > 0
                ? hasDuration
                  ? Math.min(frameTime, safeDuration ?? frameTime)
                  : frameTime
                : 0.1;

            try {
              videoElement.currentTime = targetTime;
            } catch {
              videoElement.addEventListener(
                'loadeddata',
                () => {
                  try {
                    videoElement.currentTime = targetTime;
                  } catch {
                    handleError();
                  }
                },
                { once: true }
              );
            }
          });

        await new Promise<void>((resolve, reject) => {
          const handleLoadedMetadata = () => {
            captureFrame()
              .then((frame) => {
                if (isMounted) {
                  posterCache.set(testimonial.video, frame);
                  setPoster(frame);
                }
                resolve();
              })
              .catch(reject);
          };

          const handleError = () => reject(new Error('Unable to load video metadata'));

          videoElement.addEventListener('loadedmetadata', handleLoadedMetadata, { once: true });
          videoElement.addEventListener('error', handleError, { once: true });
          videoElement.load();
        });
      } catch (error) {
        if (process.env.NODE_ENV !== 'production') {
          console.warn('Failed to generate testimonial poster', error);
        }
      }
    };

    void generatePoster();

    return () => {
      isMounted = false;
    };
  }, [hasError, testimonial.thumbnailTime, testimonial.video]);

  const playIcon = useMemo(
    () => (
      <svg
        className="h-4 w-4 text-[#0A0F2C]"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 5v14l11-7-11-7z"
          fill="currentColor"
        />
      </svg>
    ),
    []
  );

  const pauseIcon = useMemo(
    () => (
      <svg
        className="h-4 w-4 text-[#0A0F2C]"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9 5h2.5v14H9V5zm5.5 0H17v14h-2.5V5z"
          fill="currentColor"
        />
      </svg>
    ),
    []
  );

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-[32px] border border-white/10 bg-white/10 backdrop-blur-xl shadow-[0_20px_40px_-20px_rgba(10,15,44,0.45)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_30px_50px_-20px_rgba(10,15,44,0.55)]">
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#0A0F2C]/40">
        {hasError ? (
          <div className="flex h-full w-full flex-col items-center justify-center bg-[#0A0F2C]/60 px-6 text-center text-sm text-[#E5E5E5]/80">
            <p>We couldn&apos;t load this video automatically.</p>
            <a
              href={testimonial.video}
              className="mt-4 inline-flex items-center justify-center rounded-full bg-[#FFD100] px-4 py-2 font-semibold text-[#0A0F2C] transition-transform duration-200 hover:scale-105"
              target="_blank"
              rel="noreferrer"
            >
              Open video
            </a>
          </div>
        ) : (
          <>
            <video
              ref={videoRef}
              loop
              muted
              playsInline
              preload="metadata"
              data-tid={`testimonial-${testimonial.id}`}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              controls={false}
              poster={poster ?? undefined}
            >
              <source src={testimonial.video} type="video/mp4" />
            </video>

            <button
              type="button"
              onClick={handleTogglePlayback}
              className="absolute inset-0 flex items-center justify-center focus:outline-none"
              aria-label={isPlaying ? 'Pause testimonial video' : 'Play testimonial video'}
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FFD100]/90 text-[#0A0F2C] shadow-lg shadow-[#0A0F2C]/20 transition-transform duration-200 hover:scale-105">
                {isPlaying ? pauseIcon : playIcon}
              </span>
            </button>
          </>
        )}

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#0A0F2C]/70 to-transparent" />
      </div>

      <div className="flex items-center gap-3 px-6 py-5">
        <div className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-[#FFD100]/60 shadow-md shadow-[#0A0F2C]/20">
          <Image
            src={testimonial.avatar}
            alt={`${testimonial.name} avatar`}
            width={48}
            height={48}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="space-y-0.5">
          <p className="text-base font-semibold text-white">{testimonial.name}</p>
          <p className="text-sm text-[#E5E5E5]/70">
            {testimonial.title}, {testimonial.company}
          </p>
        </div>
      </div>
    </div>
  );
};

export default function TestimonialsSection() {
  const [activeVideoId, setActiveVideoId] = useState<number | null>(null);
  const videoRegistry = useRef(new Map<number, HTMLVideoElement>());

  const registerVideo = useCallback((id: number, element: HTMLVideoElement | null) => {
    if (element) {
      videoRegistry.current.set(id, element);
    } else {
      videoRegistry.current.delete(id);
    }
  }, []);

  const handleRequestPlay = useCallback(async (id: number) => {
    const video = videoRegistry.current.get(id);
    if (!video) return false;

    await safePlay(video, id);

    if (!video.paused) {
      setActiveVideoId(id);
      return true;
    }

    return false;
  }, []);

  const handleRequestPause = useCallback((id: number) => {
    const video = videoRegistry.current.get(id);
    if (!video) return;
    safePause(video, id);
    setActiveVideoId((current) => (current === id ? null : current));
  }, []);

  return (
    <section id="testimonials-section" className="relative z-10 bg-[#0A0F2C]">
      <div className="page-wrap section-pad relative">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#FFD100]/80">
            Testimonials
          </p>
          <h2 className="mt-3 text-4xl font-semibold text-white md:text-5xl">
            Hear what our customers are saying
          </h2>
          <p className="mt-5 text-lg text-[#E5E5E5]/75">
            Real stories from teams that are transforming hydration with Ionora. Tap any video to
            watch how we are elevating their wellness experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-4">
          {testimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              isActive={activeVideoId === testimonial.id}
              registerVideo={registerVideo}
              onRequestPlay={handleRequestPlay}
              onRequestPause={handleRequestPause}
            />
          ))}
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#0A0F2C] via-[#0A0F2C]/40 to-transparent"
      />
    </section>
  );
}


