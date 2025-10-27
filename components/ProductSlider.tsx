'use client';

import { useState, useEffect } from 'react';
import { products, productsByBrand } from '@/data/products';

const BRAND_CATEGORIES = [
  { id: 'life', name: 'Life Ionizers', color: '#EBEBEB', video: '/videos/lifeionizer.mp4' },
  { id: 'mediqua', name: 'Mediqua', color: '#0A0F2C', video: '/videos/mediqua.mp4' },
  { id: 'medisoul', name: 'Medisoul', color: '#E5E5E5', video: '/videos/Ionora.mp4' }
];

export default function ProductSlider() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [showDots, setShowDots] = useState(true);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [videoRef, setVideoRef] = useState<HTMLVideoElement | null>(null);
  const [isClient, setIsClient] = useState(false);

  // Video ref callback to handle video element changes
  const videoRefCallback = (node: HTMLVideoElement | null) => {
    if (videoRef && videoRef !== node) {
      // Clean up previous video
      videoRef.pause();
      videoRef.currentTime = 0;
    }
    setVideoRef(node);
  };
  
  const getFeaturedProduct = (brandId: string) => {
    const brandProducts = productsByBrand(brandId);
    return brandProducts[0] || null;
  };

  const currentProduct = getFeaturedProduct(BRAND_CATEGORIES[activeCategory].id);

  // Handle dot click
  const handleDotClick = (clickedIndex: number) => {
    setActiveCategory(clickedIndex);
  };

  // Handle user interaction to start video playback with audio
  const handleUserInteraction = () => {
    if (videoRef && videoRef.paused) {
      videoRef.play().then(() => {
        console.log('Video started playing with audio');
      }).catch((error) => {
        console.log('Video play on interaction failed:', error);
      });
    }
  };

  // Client-side detection to prevent hydration mismatches
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Video completion detection and auto-advance
  useEffect(() => {
    const handleVideoEnded = () => {
      // Auto-advance to next video when current video ends
      setActiveCategory(prev => (prev + 1) % BRAND_CATEGORIES.length);
    };

    const handleVideoLoadedData = () => {
      // Try to play video when loaded
      if (videoRef && isClient) {
        videoRef.play().catch((error) => {
          console.log('Video autoplay blocked:', error);
        });
      }
    };

    const handleVideoCanPlay = () => {
      // Try to play when video can start playing
      if (videoRef && videoRef.paused) {
        videoRef.play().catch((error) => {
          console.log('Video play failed:', error);
        });
      }
    };

    if (videoRef) {
      videoRef.addEventListener('ended', handleVideoEnded);
      videoRef.addEventListener('loadeddata', handleVideoLoadedData);
      videoRef.addEventListener('canplay', handleVideoCanPlay);
    }

    return () => {
      if (videoRef) {
        videoRef.removeEventListener('ended', handleVideoEnded);
        videoRef.removeEventListener('loadeddata', handleVideoLoadedData);
        videoRef.removeEventListener('canplay', handleVideoCanPlay);
      }
    };
  }, [videoRef, activeCategory]);

  // Handle video cleanup when component unmounts or video changes
  useEffect(() => {
    return () => {
      if (videoRef) {
        videoRef.pause();
        videoRef.currentTime = 0;
      }
    };
  }, [videoRef]);

  // Simple video play mechanism - only after client hydration
  useEffect(() => {
    if (videoRef && isClient) {
      const playVideo = () => {
        if (videoRef.paused) {
          videoRef.play().catch((error) => {
            console.log('Video autoplay failed:', error);
          });
        }
      };

      // Try to play immediately
      playVideo();
    }
  }, [videoRef, activeCategory, isClient]);


  // Swipe detection logic
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      // Swipe left - go to next category
      const nextIndex = activeCategory < BRAND_CATEGORIES.length - 1 ? activeCategory + 1 : 0;
      setActiveCategory(nextIndex);
    } else if (isRightSwipe) {
      // Swipe right - go to previous category
      const prevIndex = activeCategory > 0 ? activeCategory - 1 : BRAND_CATEGORIES.length - 1;
      setActiveCategory(prevIndex);
    }
  };

  // Mouse drag support for desktop
  const [mouseStart, setMouseStart] = useState<number | null>(null);
  const [mouseEnd, setMouseEnd] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setMouseEnd(null);
    setMouseStart(e.clientX);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setMouseEnd(e.clientX);
  };

  const onMouseUp = () => {
    if (!isDragging || !mouseStart || !mouseEnd) {
      setIsDragging(false);
      return;
    }
    
    const distance = mouseStart - mouseEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      const nextIndex = activeCategory < BRAND_CATEGORIES.length - 1 ? activeCategory + 1 : 0;
      setActiveCategory(nextIndex);
    } else if (isRightSwipe) {
      const prevIndex = activeCategory > 0 ? activeCategory - 1 : BRAND_CATEGORIES.length - 1;
      setActiveCategory(prevIndex);
    }
    
    setIsDragging(false);
  };

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
        event.preventDefault();
        const prevIndex = activeCategory > 0 ? activeCategory - 1 : BRAND_CATEGORIES.length - 1;
        setActiveCategory(prevIndex);
      } else if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
        event.preventDefault();
        const nextIndex = activeCategory < BRAND_CATEGORIES.length - 1 ? activeCategory + 1 : 0;
        setActiveCategory(nextIndex);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeCategory]);

  // Scroll detection to hide dots when at bottom
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Hide dots when scrolled to bottom (with 100px threshold)
      const isAtBottom = scrollTop + windowHeight >= documentHeight - 100;
      setShowDots(!isAtBottom);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-bg overflow-hidden">
      {/* Fullscreen video background */}
      <div className="fixed inset-0 w-full h-full z-0">
        <video
          key={BRAND_CATEGORIES[activeCategory].id}
          ref={videoRefCallback}
          src={BRAND_CATEGORIES[activeCategory].video}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="min-w-full min-h-full w-auto h-auto max-w-none max-h-none transition-opacity duration-500"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            minWidth: '100%',
            minHeight: '100%',
            width: 'auto',
            height: 'auto'
          }}
          aria-label={`${BRAND_CATEGORIES[activeCategory].name} product video`}
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Main content area with overlay */}
      <div 
        className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 select-none"
        onTouchStart={(e) => {
          onTouchStart(e);
          handleUserInteraction();
        }}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onMouseDown={(e) => {
          onMouseDown(e);
          handleUserInteraction();
        }}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onClick={handleUserInteraction}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        {/* Completely clean video section - no UI elements */}
      </div>

      {/* Left side navigation dots */}
      <div className={`fixed left-2 xs:left-4 sm:left-6 md:left-8 lg:left-12 xl:left-16 2xl:left-20 3xl:left-24 4xl:left-32 5xl:left-40 6xl:left-48 top-1/2 transform -translate-y-1/2 z-50 transition-all duration-500 ease-in-out ${
        showDots ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 pointer-events-none'
      }`}>
        <div className="flex flex-col space-y-4 xs:space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-12 xl:space-y-14 2xl:space-y-16 3xl:space-y-20 4xl:space-y-24 5xl:space-y-28 6xl:space-y-32">
          {BRAND_CATEGORIES.map((category, index) => (
            <div key={category.id} className="flex items-center space-x-2 xs:space-x-3 sm:space-x-4 md:space-x-5 lg:space-x-6 xl:space-x-7 2xl:space-x-8 3xl:space-x-9 4xl:space-x-10 5xl:space-x-12 6xl:space-x-14">
              <button
                onClick={() => handleDotClick(index)}
                className={`group transition-all duration-500 ease-in-out ${
                  activeCategory === index
                    ? 'scale-125'
                    : 'hover:scale-110'
                }`}
                aria-label={`Switch to ${category.name} products`}
              >
                {/* All dots are circular - super small and premium */}
                <div className={`w-1.5 h-1.5 xs:w-2 xs:h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 lg:w-3.5 lg:h-3.5 xl:w-4 xl:h-4 2xl:w-4.5 2xl:h-4.5 3xl:w-5 3xl:h-5 4xl:w-6 4xl:h-6 5xl:w-7 5xl:h-7 6xl:w-8 6xl:h-8 rounded-full transition-all duration-500 ${
                  activeCategory === index
                    ? 'bg-white shadow-lg shadow-white/40 ring-2 ring-white/20'
                    : 'bg-white/40 group-hover:bg-white/60'
                }`} />
              </button>
              {/* Brand name */}
              <span className={`text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl 3xl:text-4xl 4xl:text-5xl 5xl:text-6xl 6xl:text-7xl font-medium text-white transition-all duration-500 ${
                activeCategory === index 
                  ? 'opacity-100 translate-x-0 text-shadow-lg' 
                  : 'opacity-80 group-hover:opacity-100'
              }`}>
                {category.name}
              </span>
            </div>
          ))}
        </div>
      </div>


    </div>
  );
}
