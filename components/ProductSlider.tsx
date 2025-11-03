'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { products, productsByBrand } from '@/data/products';

const BRAND_CATEGORIES = [
  { id: 'medisoul', name: 'Medisoul™', color: '#E5E5E5', video: '/videos/Ionora.mp4' },
  { id: 'life', name: 'Life Ionizers™', color: '#EBEBEB', video: '/videos/lifeionizer.mp4' },
  { id: 'mediqua', name: 'Mediqua™', color: '#0A0F2C', video: '/videos/mediqua.mp4' }
];

export default function ProductSlider() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [showDots, setShowDots] = useState(true);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [showPlayPrompt, setShowPlayPrompt] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Use array of refs for multiple videos
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const isAnimatingRef = useRef(false);
  const pendingPlayIndex = useRef<number | null>(null);
  const autoplayBlockedRef = useRef(false);
  const rafIdRef = useRef<number | null>(null);

  // Get featured product
  const getFeaturedProduct = (brandId: string) => {
    const brandProducts = productsByBrand(brandId);
    return brandProducts[0] || null;
  };

  const currentProduct = getFeaturedProduct(BRAND_CATEGORIES[activeCategory].id);

  // Handle dot click
  const handleDotClick = useCallback((clickedIndex: number) => {
    setActiveCategory(clickedIndex);
  }, []);

  // Safe play function with error handling
  const safePlay = useCallback(async (video: HTMLVideoElement, index: number): Promise<boolean> => {
    if (!video || video.paused === false) return true;
    
    try {
      await video.play();
      return true;
    } catch (error: any) {
      console.log(`Autoplay blocked for video ${index}, showing fallback`);
      autoplayBlockedRef.current = true;
      setShowPlayPrompt(true);
      return false;
    }
  }, []);

  // Play currently active video
  const playCurrentVideo = useCallback(async () => {
    if (isAnimatingRef.current || autoplayBlockedRef.current) return;
    
    const currentVideo = videoRefs.current[activeCategory];
    if (currentVideo && currentVideo.paused) {
      await safePlay(currentVideo, activeCategory);
    }
  }, [activeCategory, safePlay]);

  // Pause all videos
  const pauseAllVideos = useCallback(() => {
    videoRefs.current.forEach((video) => {
      if (video && !video.paused) {
        video.pause();
      }
    });
  }, []);

  // Handle video ended - advance to next
  const handleVideoEnded = useCallback((index: number) => {
    if (isAnimatingRef.current) return;
    
    const nextIndex = (index + 1) % BRAND_CATEGORIES.length;
    setActiveCategory(nextIndex);
    pendingPlayIndex.current = nextIndex;
  }, []);

  // Set up video ref callback
  const setVideoRef = useCallback((index: number) => (node: HTMLVideoElement | null) => {
    videoRefs.current[index] = node;
    
    if (node && index === activeCategory && !isAnimatingRef.current && !autoplayBlockedRef.current) {
      // Try to autoplay the current video
      safePlay(node, index);
    }
  }, [activeCategory, safePlay]);

  // Handle category change with animation tracking
  useEffect(() => {
    isAnimatingRef.current = true;
    setIsAnimating(true);
    pauseAllVideos();
    
    const timeoutId = setTimeout(() => {
      isAnimatingRef.current = false;
      setIsAnimating(false);
      
      // After animation, play the current video or pending one
      const targetIndex = pendingPlayIndex.current !== null ? pendingPlayIndex.current : activeCategory;
      pendingPlayIndex.current = null;
      
      // Use double RAF to wait for CSS transitions to settle
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const targetVideo = videoRefs.current[targetIndex];
          if (targetVideo && !autoplayBlockedRef.current) {
            safePlay(targetVideo, targetIndex);
          }
        });
      });
    }, 500); // Match CSS transition duration
    
    return () => clearTimeout(timeoutId);
  }, [activeCategory, pauseAllVideos, safePlay]);

  // Client-side detection
  useEffect(() => {
    // Try initial autoplay after mount
    const timeoutId = setTimeout(() => {
      if (!autoplayBlockedRef.current) {
        playCurrentVideo();
      }
    }, 100);
    
    return () => clearTimeout(timeoutId);
  }, [playCurrentVideo]);

  // User interaction handler
  const handleUserInteraction = useCallback(async (e?: React.MouseEvent | React.TouchEvent) => {
    if (e) {
      e.stopPropagation();
    }
    
    autoplayBlockedRef.current = false;
    setShowPlayPrompt(false);
    
    const currentVideo = videoRefs.current[activeCategory];
    if (currentVideo) {
      // Unmute and try to play
      currentVideo.muted = false;
      await safePlay(currentVideo, activeCategory);
    }
  }, [activeCategory, safePlay]);

  // Swipe detection logic
  const minSwipeDistance = 50;
  const touchDistanceRef = useRef<number>(0);
  const touchStartRef = useRef<number | null>(null);

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    const startX = e.targetTouches[0].clientX;
    setTouchStart(startX);
    touchStartRef.current = startX;
    touchDistanceRef.current = 0;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
    if (touchStartRef.current !== null) {
      touchDistanceRef.current = Math.abs(touchStartRef.current - e.targetTouches[0].clientX);
    }
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      const nextIndex = activeCategory < BRAND_CATEGORIES.length - 1 ? activeCategory + 1 : 0;
      setActiveCategory(nextIndex);
    } else if (isRightSwipe) {
      const prevIndex = activeCategory > 0 ? activeCategory - 1 : BRAND_CATEGORIES.length - 1;
      setActiveCategory(prevIndex);
    }
  };

  // Mouse drag support for desktop
  const [mouseStart, setMouseStart] = useState<number | null>(null);
  const [mouseEnd, setMouseEnd] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const mouseDistanceRef = useRef<number>(0);
  const mouseStartRef = useRef<number | null>(null);

  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setMouseEnd(null);
    const startX = e.clientX;
    setMouseStart(startX);
    mouseStartRef.current = startX;
    mouseDistanceRef.current = 0;
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setMouseEnd(e.clientX);
    if (mouseStartRef.current !== null) {
      mouseDistanceRef.current = Math.abs(mouseStartRef.current - e.clientX);
    }
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
        {/* Render all videos but only show the active one */}
        {BRAND_CATEGORIES.map((category, index) => (
          <video
            key={category.id}
            ref={setVideoRef(index)}
            src={category.video}
            playsInline
            muted
            preload="auto"
            autoPlay={index === activeCategory && !autoplayBlockedRef.current}
            className={`absolute transition-opacity duration-500 ${
              index === activeCategory ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
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
            aria-label={`${category.name} product video`}
            onEnded={() => handleVideoEnded(index)}
            onClick={(e) => {
              e.stopPropagation();
              handleUserInteraction(e);
            }}
          />
        ))}
        
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/30"></div>
        
        {/* Play prompt - shows when autoplay is blocked */}
        {showPlayPrompt && (
          <div 
            className="absolute inset-0 flex items-center justify-center z-20 cursor-pointer" 
            onClick={handleUserInteraction}
            onTouchEnd={(e) => {
              e.stopPropagation();
              handleUserInteraction(e);
            }}
          >
            <div className="text-center text-white pointer-events-none px-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-2 sm:mb-3 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors pointer-events-auto">
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
              <p className="text-xs sm:text-sm font-medium opacity-90">Tap to play with sound</p>
            </div>
          </div>
        )}
      </div>

      {/* Main content area with overlay */}
      <div 
        className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 select-none"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={(e) => {
          const wasTap = touchDistanceRef.current < minSwipeDistance;
          onTouchEnd();
          if (wasTap && showPlayPrompt) {
            handleUserInteraction();
          }
        }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={(e) => {
          const wasClick = mouseDistanceRef.current < minSwipeDistance;
          onMouseUp();
          if (wasClick && showPlayPrompt) {
            handleUserInteraction();
          }
        }}
        onMouseLeave={onMouseUp}
        onClick={showPlayPrompt ? handleUserInteraction : undefined}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        {/* Completely clean video section - no UI elements */}
      </div>

      {/* Left side navigation dots */}
      <div className={`fixed left-2 sm:left-4 md:left-6 lg:left-8 top-1/2 transform -translate-y-1/2 z-50 transition-all duration-500 ease-in-out ${
        showDots ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 pointer-events-none'
      }`}>
        <div className="flex flex-col space-y-3 sm:space-y-4 md:space-y-5">
          {BRAND_CATEGORIES.map((category, index) => (
            <div key={category.id} className="flex items-center space-x-2 sm:space-x-3">
              <button
                onClick={() => handleDotClick(index)}
                className={`group transition-all duration-500 ease-in-out ${
                  activeCategory === index
                    ? 'scale-125'
                    : 'hover:scale-110'
                }`}
                aria-label={`Switch to ${category.name} products`}
              >
                <div className={`w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 lg:w-3.5 lg:h-3.5 rounded-full transition-all duration-500 ${
                  activeCategory === index
                    ? 'bg-white shadow-lg shadow-white/40 ring-2 ring-white/20'
                    : 'bg-white/40 group-hover:bg-white/60'
                }`} />
              </button>
              <span className={`text-xs sm:text-sm md:text-base lg:text-lg font-medium text-white transition-all duration-500 ${
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
