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

const gradients = [
  { from: '#FFD100', to: '#FFB347' },
  { from: '#45C4B0', to: '#2E8A99' },
  { from: '#7F5AF0', to: '#6246EA' },
  { from: '#EF476F', to: '#F78C6B' },
  { from: '#4CC9F0', to: '#4895EF' },
  { from: '#06D6A0', to: '#118AB2' },
];

const createAvatarDataUri = (name: string, gradientIndex: number) => {
  const colors = gradients[gradientIndex % gradients.length];
  const initials = name
    .split(' ')
    .map((part) => part.trim())
    .filter((part) => part.length > 0)
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const gradientId = `grad-${initials}-${gradientIndex}`;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" role="img" aria-label="${name}">
    <defs>
      <linearGradient id="${gradientId}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${colors.from}" />
        <stop offset="100%" stop-color="${colors.to}" />
      </linearGradient>
    </defs>
    <circle cx="60" cy="60" r="58" fill="url(#${gradientId})" />
    <circle cx="60" cy="60" r="56" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="4" />
    <text x="50%" y="52%" font-family="Inter, Arial, sans-serif" font-size="46" font-weight="700" fill="#0A0F2C" text-anchor="middle" dominant-baseline="middle">${initials}</text>
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

const testimonialSources: TestimonialSource[] = [
  {
    name: 'Barry Zito',
    title: 'Former MLB Pitcher',
    company: 'Major League Baseball',
    avatar: createAvatarDataUri('Barry Zito', 0),
    fileName: '1df2d62642bb4aa1837f6abc171998f7 (1).mp4',
  },
  {
    name: 'Sage Northcutt',
    title: 'Professional Mixed Martial Artist',
    company: 'ONE Championship',
    avatar: createAvatarDataUri('Sage Northcutt', 1),
    fileName: '3ce02033ea3c4f77b69d9c2aec658f5f (2).mp4',
  },
  {
    name: 'Anita Desai',
    title: 'Spa Manager',
    company: 'Tranquil Waters',
    avatar: createAvatarDataUri('Anita Desai', 2),
    fileName: '478524272f954ab2bd9ac7d998104a9e.mp4',
    thumbnailTime: 6,
  },
  {
    name: 'Barry Zito',
    title: 'Former MLB Pitcher',
    company: 'Major League Baseball',
    avatar: createAvatarDataUri('Barry Zito', 3),
    fileName: '51ba8d582c6d43098c4273f85bc31e93.mp4',
  },
  {
    name: 'Elena Martinez',
    title: 'Founder',
    company: 'PureGlow Studios',
    avatar: createAvatarDataUri('Elena Martinez', 4),
    fileName: '645f4a3430d949f3b3be0a65c93484d6 (1).mp4',
  },
  {
    name: 'Noah Williams',
    title: 'Performance Coach',
    company: 'Vitality Club',
    avatar: createAvatarDataUri('Noah Williams', 5),
    fileName: '67728e7c49674b29851e1747d49da6d3.mp4',
    thumbnailTime: 4,
  },
  {
    name: 'Sahana Iyengar',
    title: 'Holistic Therapist',
    company: 'Rejuvenate Spa',
    avatar: createAvatarDataUri('Sahana Iyengar', 0),
    fileName: '6f1efa7654fc4aa0980d93739043bbe0 (5).mp4',
    thumbnailTime: 5,
  },
  {
    name: 'James Porter',
    title: 'General Manager',
    company: 'Blue Haven Resort',
    avatar: createAvatarDataUri('James Porter', 1),
    fileName: 'a1e098ba75ab481fb8e63f9651ce8f3b.mp4',
  },
  {
    name: 'Minji Park',
    title: 'Product Trainer',
    company: 'Mediqua Labs',
    avatar: createAvatarDataUri('Minji Park', 2),
    fileName: 'AK-9000 Mediqua alkaline water ionizer (1).mp4',
  },
  {
    name: 'Mira Bose',
    title: 'Nutritionist',
    company: 'Balance Collective',
    avatar: createAvatarDataUri('Mira Bose', 3),
    fileName: 'f92c66840e94418cbdb9d274d42ec8c3.mp4',
  },
  {
    name: 'Dr. Thomas Walko',
    title: 'Medical Director',
    company: 'Hydrogen Therapy Institute',
    avatar: createAvatarDataUri('Dr. Thomas Walko', 4),
    fileName: 'Hydrogen Water presentation Dr.  Thomas Walko (2) (1) (1).mp4',
  },
  {
    name: 'Lydia Grant',
    title: 'Program Director',
    company: 'Renew Wellness',
    avatar: createAvatarDataUri('Lydia Grant', 5),
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

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [poster, setPoster] = useState<string | null>(null);

  const handleTogglePlayback = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      void video.play();
      video.muted = false;
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);

    video.addEventListener('pause', handlePause);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('ended', handleEnded);
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
              videoElement.pause();
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
                  } catch (error) {
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
  }, [testimonial.thumbnailTime, testimonial.video]);

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
        <video
          ref={videoRef}
          preload="metadata"
          playsInline
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
  return (
    <section className="relative z-10 bg-[#0A0F2C]">
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
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
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


