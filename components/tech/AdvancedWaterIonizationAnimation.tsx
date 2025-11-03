'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, Info } from 'lucide-react';

interface StreamTooltip {
  type: 'alkaline' | 'acidic';
  pH: string;
  description: string;
  color: string;
}

export default function AdvancedWaterIonizationAnimation() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hoveredStream, setHoveredStream] = useState<StreamTooltip | null>(null);
  const [showPHScale, setShowPHScale] = useState(false);

  const streams: StreamTooltip[] = [
    {
      type: 'alkaline',
      pH: '8.5 - 11.0',
      description: 'Antioxidant-rich alkaline water',
      color: 'from-green-400 to-emerald-500'
    },
    {
      type: 'acidic',
      pH: '2.5 - 6.5',
      description: 'Natural cleansing acidic water',
      color: 'from-red-400 to-orange-500'
    }
  ];

  const pHScaleColors = [
    { pH: 0, color: '#dc2626' }, // Red
    { pH: 1, color: '#ea580c' }, // Orange
    { pH: 2, color: '#d97706' }, // Amber
    { pH: 3, color: '#ca8a04' }, // Yellow
    { pH: 4, color: '#65a30d' }, // Lime
    { pH: 5, color: '#16a34a' }, // Green
    { pH: 6, color: '#059669' }, // Emerald
    { pH: 7, color: '#0891b2' }, // Cyan (neutral)
    { pH: 8, color: '#0284c7' }, // Sky
    { pH: 9, color: '#2563eb' }, // Blue
    { pH: 10, color: '#7c3aed' }, // Violet
    { pH: 11, color: '#9333ea' }, // Purple
    { pH: 12, color: '#c026d3' }, // Fuchsia
    { pH: 13, color: '#db2777' }, // Pink
    { pH: 14, color: '#be185d' }  // Rose
  ];

  useEffect(() => {
    if (isPlaying) {
      const timer = setTimeout(() => setShowPHScale(true), 2000);
      return () => clearTimeout(timer);
    } else {
      setShowPHScale(false);
    }
  }, [isPlaying]);

  const toggleAnimation = () => {
    setIsPlaying(!isPlaying);
  };

  const resetAnimation = () => {
    setIsPlaying(false);
    setShowPHScale(false);
  };

  return (
    <div className="relative w-full h-96 bg-gradient-to-br from-[#0A0F2C]/60 via-[#0A0F2C]/40 to-[#0A0F2C]/60 rounded-3xl border border-primary/20 backdrop-blur-xl overflow-hidden">
      {/* Background Particles */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Main Animation Container */}
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Central Water Droplet */}
        <motion.div
          className="relative z-10"
          animate={isPlaying ? {
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          } : {}}
          transition={{
            duration: 2,
            repeat: isPlaying ? Infinity : 0,
            ease: "easeInOut"
          }}
        >
          {/* Droplet Core */}
          <motion.div
            className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 via-cyan-400 to-blue-600 shadow-2xl"
            animate={isPlaying ? {
              boxShadow: [
                "0 0 20px rgba(59, 130, 246, 0.5)",
                "0 0 40px rgba(59, 130, 246, 0.8)",
                "0 0 20px rgba(59, 130, 246, 0.5)"
              ]
            } : {}}
            transition={{
              duration: 1.5,
              repeat: isPlaying ? Infinity : 0,
            }}
          >
            {/* Inner Glow */}
            <div className="absolute inset-2 rounded-full bg-gradient-to-br from-white/30 to-transparent"></div>
            
            {/* H2O Text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white font-bold text-sm">H₂O</span>
            </div>
          </motion.div>

          {/* Electrolysis Effect */}
          {isPlaying && (
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-[#FFD100]"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.8, 0.3, 0.8],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
              }}
            />
          )}
        </motion.div>

        {/* Alkaline Stream (Right) */}
        <motion.div
          className="absolute right-8 top-1/2 -translate-y-1/2"
          onHoverStart={() => setHoveredStream(streams[0])}
          onHoverEnd={() => setHoveredStream(null)}
        >
          <motion.div
            className="w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 shadow-lg cursor-pointer"
            animate={isPlaying ? {
              scale: [1, 1.1, 1],
              x: [0, 10, 0],
              y: [0, -5, 0],
            } : {}}
            transition={{
              duration: 2,
              repeat: isPlaying ? Infinity : 0,
              delay: 0.5,
            }}
          >
            <div className="absolute inset-2 rounded-full bg-gradient-to-br from-white/30 to-transparent"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white font-bold text-xs">OH⁻</span>
            </div>
          </motion.div>

          {/* Alkaline Flow Lines */}
          {isPlaying && (
            <motion.div
              className="absolute -left-8 top-1/2 -translate-y-1/2"
              animate={{
                x: [-20, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: 0.5,
              }}
            >
              <svg width="40" height="4" viewBox="0 0 40 4">
                <motion.path
                  d="M0,2 Q10,0 20,2 Q30,4 40,2"
                  stroke="url(#alkalineGradient)"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="5,5"
                  animate={{
                    strokeDashoffset: [0, -10],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                  }}
                />
                <defs>
                  <linearGradient id="alkalineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0.2" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>
          )}
        </motion.div>

        {/* Acidic Stream (Left) */}
        <motion.div
          className="absolute left-8 top-1/2 -translate-y-1/2"
          onHoverStart={() => setHoveredStream(streams[1])}
          onHoverEnd={() => setHoveredStream(null)}
        >
          <motion.div
            className="w-16 h-16 rounded-full bg-gradient-to-br from-red-400 to-orange-500 shadow-lg cursor-pointer"
            animate={isPlaying ? {
              scale: [1, 1.1, 1],
              x: [0, -10, 0],
              y: [0, 5, 0],
            } : {}}
            transition={{
              duration: 2,
              repeat: isPlaying ? Infinity : 0,
              delay: 0.5,
            }}
          >
            <div className="absolute inset-2 rounded-full bg-gradient-to-br from-white/30 to-transparent"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white font-bold text-xs">H⁺</span>
            </div>
          </motion.div>

          {/* Acidic Flow Lines */}
          {isPlaying && (
            <motion.div
              className="absolute -right-8 top-1/2 -translate-y-1/2"
              animate={{
                x: [20, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: 0.5,
              }}
            >
              <svg width="40" height="4" viewBox="0 0 40 4">
                <motion.path
                  d="M40,2 Q30,0 20,2 Q10,4 0,2"
                  stroke="url(#acidicGradient)"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="5,5"
                  animate={{
                    strokeDashoffset: [0, -10],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                  }}
                />
                <defs>
                  <linearGradient id="acidicGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#ef4444" stopOpacity="0.2" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>
          )}
        </motion.div>

        {/* pH Scale Animation */}
        <AnimatePresence>
          {showPHScale && (
            <motion.div
              className="absolute bottom-8 left-1/2 -translate-x-1/2 w-80"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-primary/20">
                <div className="text-center text-primary text-sm mb-3">pH Scale</div>
                <div className="flex items-center gap-1">
                  {pHScaleColors.map((item, index) => (
                    <motion.div
                      key={index}
                      className="h-4 flex-1 rounded-sm"
                      style={{ backgroundColor: item.color }}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{
                        duration: 0.1,
                        delay: index * 0.05,
                      }}
                    />
                  ))}
                </div>
                <div className="flex justify-between text-xs text-primary/70 mt-2">
                  <span>0</span>
                  <span>7 (Neutral)</span>
                  <span>14</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tooltips */}
        <AnimatePresence>
          {hoveredStream && (
            <motion.div
              className="absolute top-4 left-1/2 -translate-x-1/2 z-20"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-primary/20 text-primary">
                <div className="flex items-center gap-2 mb-2">
                  <Info className="w-4 h-4 text-[#FFD100]" />
                  <span className="font-semibold capitalize">{hoveredStream.type} Stream</span>
                </div>
                <div className="text-sm text-primary/80">
                  <div>pH Range: {hoveredStream.pH}</div>
                  <div className="text-xs mt-1">{hoveredStream.description}</div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="absolute bottom-4 left-4 flex items-center gap-3">
        <motion.button
          onClick={toggleAnimation}
          className="p-3 rounded-full bg-white/10 backdrop-blur-xl border border-primary/20 hover:bg-[#FFD100]/20 transition-all"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {isPlaying ? <Pause className="w-5 h-5 text-[#FFD100]" /> : <Play className="w-5 h-5 text-[#FFD100]" />}
        </motion.button>
        <motion.button
          onClick={resetAnimation}
          className="p-3 rounded-full bg-white/10 backdrop-blur-xl border border-primary/20 hover:bg-[#FFD100]/20 transition-all"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <RotateCcw className="w-5 h-5 text-[#FFD100]" />
        </motion.button>
        <div className="text-sm text-primary/80">
          {isPlaying ? 'Ionization Active' : 'Ready to Ionize'}
        </div>
      </div>
    </div>
  );
}
