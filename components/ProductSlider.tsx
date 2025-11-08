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
  const [isMuted, setIsMuted] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Use array of refs for multiple videos
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const isAnimatingRef = useRef(false);
  const pendingPlayIndex = useRef<number | null>(null);
  const autoplayBlockedRef = useRef(false);
  const canplayListenersRef = useRef<Map<number, (() => void) | null>>(new Map());
  const unmuteListenersRef = useRef<Map<number, (() => void) | null>>(new Map());
  
  // Session-level unmute preference - tracks explicit user action
  const userExplicitlyUnmutedRef = useRef(false);

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
  const safeMutedPlay = useCallback(async (video: HTMLVideoElement, index: number): Promise<boolean> => {
    if (!video) return false;
    
    // Only force mute if user hasn't explicitly unmuted
    if (!userExplicitlyUnmutedRef.current) {
      video.muted = true;
      console.log(`[AUTOPLAY] Setting muted=true for video ${index} (session prefers muted)`);
    } else {
      console.log(`[AUTOPLAY] Respecting user preference: video ${index} muted=${video.muted}`);
    }
    
    if (!video.paused) return true;
    
    try {
      console.log(`[AUTOPLAY] Attempting autoplay for video ${index}`);
      await video.play();
      console.log(`[AUTOPLAY] Successfully started autoplay for video ${index}`);
      return true;
    } catch (error: any) {
      console.log(`[AUTOPLAY] Autoplay blocked for video ${index}:`, error.name);
      autoplayBlockedRef.current = true;
      return false;
    }
  }, []);

  // Attempt to unmute video after canplay (only if session preference says unmuted)
  const safeUnmuteAttempt = useCallback((video: HTMLVideoElement, index: number) => {
    if (!video || !userExplicitlyUnmutedRef.current) {
      console.log(`[UNMUTE] Skipping auto-unmute for video ${index} (session prefers muted)`);
      return;
    }
    
    try {
      video.muted = false;
      setIsMuted(false);
      console.log(`[UNMUTE] Auto-unmuted video ${index} (session preference)`);
    } catch (error: any) {
      console.log(`[UNMUTE] Blocked:`, error.name);
      video.muted = true; // Fallback to muted
      setIsMuted(true);
    }
  }, []);

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
    if (index === activeCategory && !isAnimatingRef.current && !autoplayBlockedRef.current) {
      console.log(`[CANPLAY] Video ${index} ready, attempting autoplay`);
      safeMutedPlay(video, index).then(() => {
        // Apply session preference after play starts
        if (userExplicitlyUnmutedRef.current) {
          setTimeout(() => safeUnmuteAttempt(video, index), 100);
        } else {
          // Ensure muted if session prefers muted
          if (!video.muted) {
            video.muted = true;
            setIsMuted(true);
            console.log(`[CANPLAY] Enforcing muted state for video ${index} (session preference)`);
          }
        }
      });
    }
  }, [activeCategory, safeMutedPlay, safeUnmuteAttempt]);

  // Handle video unmute state change
  const handleVideoUnmute = useCallback((index: number, video: HTMLVideoElement) => {
    setIsMuted(video.muted);
  }, []);

  // Set up video ref callback
  const setVideoRef = useCallback((index: number) => (node: HTMLVideoElement | null) => {
    const previousNode = videoRefs.current[index];
    
    if (previousNode && previousNode !== node) {
      // Clean up old listeners
      const canplayListener = canplayListenersRef.current.get(index);
      if (canplayListener) {
        previousNode.removeEventListener('canplay', canplayListener);
        canplayListenersRef.current.set(index, null);
      }
      
      const unmuteListener = unmuteListenersRef.current.get(index);
      if (unmuteListener) {
        previousNode.removeEventListener('volumechange', unmuteListener);
        unmuteListenersRef.current.set(index, null);
      }
    }
    
    videoRefs.current[index] = node;
    
    if (node) {
      // Ensure all required attributes for cross-browser autoplay
      // Only force mute if user hasn't explicitly unmuted
      if (!userExplicitlyUnmutedRef.current) {
        node.muted = true;
        node.setAttribute('muted', '');
        setIsMuted(true);
      }
      node.setAttribute('playsinline', '');
      node.setAttribute('playsInline', '');
      node.setAttribute('webkit-playsinline', '');
      
      // Add canplay listener if not already added
      if (!canplayListenersRef.current.get(index)) {
        const canplayHandler = () => handleVideoCanPlay(index, node);
        node.addEventListener('canplay', canplayHandler);
        canplayListenersRef.current.set(index, canplayHandler);
        console.log(`[SETUP] Added canplay listener for video ${index}`);
      }
      
      // Add unmute state change listener
      if (!unmuteListenersRef.current.get(index)) {
        const unmuteHandler = () => handleVideoUnmute(index, node);
        node.addEventListener('volumechange', unmuteHandler);
        unmuteListenersRef.current.set(index, unmuteHandler);
        console.log(`[SETUP] Added unmute control for video ${index}`);
      }
      
      // If already can play, trigger autoplay attempt
      if (node.readyState >= 3) {
        console.log(`[SETUP] Video ${index} already ready, attempting autoplay`);
        handleVideoCanPlay(index, node);
      }
    }
  }, [handleVideoCanPlay, handleVideoUnmute]);

  // Handle category change with animation tracking
  useEffect(() => {
    isAnimatingRef.current = true;
    setIsAnimating(true);
    pauseAllVideos();
    
    const timeoutId = setTimeout(() => {
      isAnimatingRef.current = false;
      setIsAnimating(false);
      
      const targetIndex = pendingPlayIndex.current !== null ? pendingPlayIndex.current : activeCategory;
      pendingPlayIndex.current = null;
      
      // Use double RAF to wait for CSS transitions to settle
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const targetVideo = videoRefs.current[targetIndex];
          if (targetVideo && !autoplayBlockedRef.current) {
            console.log(`[TRANSITION] Resuming autoplay after transition for video ${targetIndex}`);
            safeMutedPlay(targetVideo, targetIndex).then(() => {
              // Apply session preference after play starts
              if (userExplicitlyUnmutedRef.current) {
                setTimeout(() => safeUnmuteAttempt(targetVideo, targetIndex), 100);
              } else {
                // Ensure muted if session prefers muted
                if (!targetVideo.muted) {
                  targetVideo.muted = true;
                  setIsMuted(true);
                  console.log(`[TRANSITION] Enforcing muted state for video ${targetIndex} (session preference)`);
                }
              }
            });
          }
        });
      });
    }, 500);
    
    return () => clearTimeout(timeoutId);
  }, [activeCategory, pauseAllVideos, safeMutedPlay, safeUnmuteAttempt]);

  // Try initial autoplay after mount
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      console.log('[INIT] Attempting initial muted autoplay');
      if (!autoplayBlockedRef.current) {
        playCurrentVideo();
      }
    }, 100);
    
    return () => clearTimeout(timeoutId);
  }, [playCurrentVideo]);

  // Sync muted state with current video
  useEffect(() => {
    const currentVideo = videoRefs.current[activeCategory];
    if (currentVideo) {
      setIsMuted(currentVideo.muted);
    }
  }, [activeCategory]);

  // Handle unmute toggle - robust toggle that respects user intent
  const handleUnmuteToggle = useCallback(async (e?: React.MouseEvent | React.KeyboardEvent | React.TouchEvent) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    
    console.log(`[UI] Sound button clicked`);
    
    const currentVideo = videoRefs.current[activeCategory];
    if (!currentVideo) {
      console.log(`[UI] No current video available`);
      return;
    }
    
    try {
      // Read actual DOM property to get current state
      const nowMuted = !currentVideo.muted;
      
      console.log(`[UI] Sound toggle clicked: nowMuted=${nowMuted}`);
      console.log(`[UI] Current video.muted=${currentVideo.muted}, toggling to ${nowMuted}`);
      
      // Toggle mute state on DOM element
      currentVideo.muted = nowMuted;
      
      // Immediately update React state for UI sync
      setIsMuted(nowMuted);
      
      // Update session preference based on user's explicit choice
      if (nowMuted === false) {
        // User unmuted - remember this preference
        userExplicitlyUnmutedRef.current = true;
        console.log(`[SESSION] userExplicitlyUnmuted = true`);
        
        autoplayBlockedRef.current = false;
        if (currentVideo.paused) {
          try {
            await currentVideo.play();
            console.log(`[UI] Playback resumed after user interaction for video ${activeCategory}`);
          } catch (playError) {
            const errorName = playError instanceof Error ? playError.name : String(playError);
            console.log(`[UI] Playback still blocked for video ${activeCategory}:`, errorName);
          }
        }
      } else {
        // User muted - clear preference so autoplay will mute
        userExplicitlyUnmutedRef.current = false;
        console.log(`[SESSION] userExplicitlyUnmuted = false`);
      }
      
      // Success - UI and DOM are now in sync
      console.log(`[UNMUTE] Success - Video ${activeCategory} ${nowMuted ? 'muted' : 'unmuted'}, UI updated`);
      
    } catch (error: any) {
      console.error(`[UNMUTE] Failed to toggle mute:`, error);
      // Show fallback message
      alert('Browser requires a direct gesture to enable sound. Tap play to enable audio.');
    }
  }, [activeCategory]);
  
  // Keyboard handler for unmute toggle
  const handleUnmuteKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleUnmuteToggle(e);
    }
  }, [handleUnmuteToggle]);

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
      </div>

      {/* Main content area with overlay */}
      <div 
        className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 select-none"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        {/* Completely clean video section - no UI elements */}
      </div>

      {/* Unmute button - positioned outside video container to ensure clickability */}
      <button 
        className="fixed left-2 sm:left-4 md:left-6 lg:left-8 bottom-4 sm:bottom-6 md:bottom-8 z-[100] cursor-pointer group focus:outline-none focus:ring-2 focus:ring-white/50 rounded-full" 
        onClick={handleUnmuteToggle}
        onKeyDown={handleUnmuteKeyDown}
        type="button"
        tabIndex={0}
        aria-label={isMuted ? 'Enable sound' : 'Mute'}
        aria-pressed={!isMuted}
      >
        <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-black/40 rounded-full flex items-center justify-center backdrop-blur-md border border-white/30 hover:bg-black/60 active:scale-95 transition-all duration-200 shadow-lg hover:shadow-2xl hover:shadow-black/50">
          {isMuted ? (
            <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
            </svg>
          ) : (
            <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
            </svg>
          )}
        </div>
      </button>

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
