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
  const [showUnmuteOverlay, setShowUnmuteOverlay] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Use array of refs for multiple videos
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const isAnimatingRef = useRef(false);
  const pendingPlayIndex = useRef<number | null>(null);
  const autoplayBlockedRef = useRef(false);
  const canplayListenersRef = useRef<Map<number, boolean>>(new Map());

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

  // Safe muted play function with error handling
  const safeMutedPlay = useCallback(async (video: HTMLVideoElement, index: number, retryCount = 0): Promise<boolean> => {
    if (!video) return false;
    
    // Ensure video is muted before attempting play
    video.muted = true;
    
    if (!video.paused) return true;
    
    try {
      // Log autoplay attempt for telemetry
      console.log(`[AUTOPLAY] Attempting muted autoplay for video ${index} (retry ${retryCount})`);
      
      await video.play();
      console.log(`[AUTOPLAY] Successfully started muted autoplay for video ${index}`);
      return true;
    } catch (error: any) {
      console.log(`[AUTOPLAY] Muted autoplay blocked for video ${index}:`, error.name);
      autoplayBlockedRef.current = true;
      
      // Only show overlay if muted autoplay is blocked
      if (!showUnmuteOverlay) {
        setShowUnmuteOverlay(true);
      }
      return false;
    }
  }, [showUnmuteOverlay]);

  // Play currently active video with muted autoplay
  const playCurrentVideo = useCallback(async () => {
    if (isAnimatingRef.current || autoplayBlockedRef.current) return;
    
    const currentVideo = videoRefs.current[activeCategory];
    if (currentVideo && currentVideo.paused) {
      await safeMutedPlay(currentVideo, activeCategory);
    }
  }, [activeCategory, safeMutedPlay]);

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
    
    console.log(`[SEQUENTIAL] Video ${index} ended, advancing to next`);
    const nextIndex = (index + 1) % BRAND_CATEGORIES.length;
    setActiveCategory(nextIndex);
    pendingPlayIndex.current = nextIndex;
  }, []);

  // Handle video canplay - try autoplay once ready
  const handleVideoCanPlay = useCallback((index: number, video: HTMLVideoElement) => {
    // Only try to autoplay if this is the active video and not animating
    if (index === activeCategory && !isAnimatingRef.current && !autoplayBlockedRef.current) {
      console.log(`[CANPLAY] Video ${index} ready, attempting autoplay`);
      safeMutedPlay(video, index);
    }
  }, [activeCategory, safeMutedPlay]);

  // Set up video ref callback
  const setVideoRef = useCallback((index: number) => (node: HTMLVideoElement | null) => {
    const previousNode = videoRefs.current[index];
    
    if (previousNode && previousNode !== node) {
      // Clean up old listeners if replacing ref
      const hadListener = canplayListenersRef.current.get(index);
      if (hadListener) {
        previousNode.removeEventListener('canplay', () => {
          handleVideoCanPlay(index, previousNode);
        });
        canplayListenersRef.current.set(index, false);
      }
    }
    
    videoRefs.current[index] = node;
    
    if (node) {
      // Ensure all required attributes for cross-browser autoplay
      node.muted = true;
      node.setAttribute('muted', '');
      node.setAttribute('playsinline', '');
      node.setAttribute('playsInline', '');
      node.setAttribute('webkit-playsinline', '');
      
      // Add canplay listener if not already added
      if (!canplayListenersRef.current.get(index)) {
        const canplayHandler = () => handleVideoCanPlay(index, node);
        node.addEventListener('canplay', canplayHandler);
        canplayListenersRef.current.set(index, true);
        
        console.log(`[SETUP] Added canplay listener for video ${index}`);
      }
      
      // If already can play, trigger autoplay attempt
      if (node.readyState >= 3) {
        console.log(`[SETUP] Video ${index} already ready, attempting autoplay`);
        handleVideoCanPlay(index, node);
      }
    }
  }, [handleVideoCanPlay]);

  // Handle category change with animation tracking
  useEffect(() => {
    isAnimatingRef.current = true;
    setIsAnimating(true);
    pauseAllVideos();
    
    const timeoutId = setTimeout(() => {
      isAnimatingRef.current = false;
      setIsAnimating(false);
      
      // After animation, play the current video or pending one using double RAF
      const targetIndex = pendingPlayIndex.current !== null ? pendingPlayIndex.current : activeCategory;
      pendingPlayIndex.current = null;
      
      // Use double RAF to wait for CSS transitions to settle
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const targetVideo = videoRefs.current[targetIndex];
          if (targetVideo && !autoplayBlockedRef.current) {
            console.log(`[TRANSITION] Resuming autoplay after transition for video ${targetIndex}`);
            safeMutedPlay(targetVideo, targetIndex);
          }
        });
      });
    }, 500); // Match CSS transition duration
    
    return () => clearTimeout(timeoutId);
  }, [activeCategory, pauseAllVideos, safeMutedPlay]);

  // Try initial autoplay after mount with delay
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      console.log('[INIT] Attempting initial muted autoplay');
      if (!autoplayBlockedRef.current) {
        playCurrentVideo();
      }
    }, 100);
    
    return () => clearTimeout(timeoutId);
  }, [playCurrentVideo]);

  // Handle unmute user interaction
  const handleUnmuteClick = useCallback(async (e?: React.MouseEvent | React.TouchEvent) => {
    if (e) {
      e.stopPropagation();
    }
    
    const currentVideo = videoRefs.current[activeCategory];
    if (!currentVideo) return;
    
    try {
      // Toggle mute state
      currentVideo.muted = !currentVideo.muted;
      setIsMuted(currentVideo.muted);
      
      console.log(`[UNMUTE] User toggled mute: ${currentVideo.muted ? 'muted' : 'unmuted'}`);
      
      // Hide overlay if unmuted successfully
      if (!currentVideo.muted) {
        setShowUnmuteOverlay(false);
        autoplayBlockedRef.current = false; // Clear blocked flag
      }
    } catch (error: any) {
      console.error(`[UNMUTE] Failed to toggle mute:`, error);
      // Show message if browser blocks unmuting
      alert('Please interact with the video player to enable sound.');
    }
  }, [activeCategory]);

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
        />
        ))}
        
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/30"></div>
        
        {/* Unmute overlay - shows when autoplay is blocked and user needs to enable sound */}
        {showUnmuteOverlay && (
          <div 
            className="absolute inset-0 flex items-center justify-center z-20 cursor-pointer" 
            onClick={handleUnmuteClick}
            onTouchEnd={(e) => {
              e.stopPropagation();
              handleUnmuteClick(e);
            }}
          >
            <div className="text-center text-white pointer-events-none px-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-2 sm:mb-3 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors pointer-events-auto">
                {isMuted ? (
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                  </svg>
                ) : (
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
                </svg>
                )}
              </div>
              <p className="text-xs sm:text-sm font-medium opacity-90">
                {isMuted ? 'Tap to enable sound' : 'Tap to mute'}
              </p>
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
          if (wasTap && showUnmuteOverlay) {
            handleUnmuteClick(e);
          }
        }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={(e) => {
          const wasClick = mouseDistanceRef.current < minSwipeDistance;
          onMouseUp();
          if (wasClick && showUnmuteOverlay) {
            handleUnmuteClick(e);
          }
        }}
        onMouseLeave={onMouseUp}
        onClick={showUnmuteOverlay ? handleUnmuteClick : undefined}
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
