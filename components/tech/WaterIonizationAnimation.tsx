'use client';

import { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

export default function WaterIonizationAnimation() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const animationRef = useRef<HTMLDivElement>(null);

  const steps = [
    { name: 'Water Input', description: 'Pure water enters the system' },
    { name: 'Electrolysis', description: 'Electric current passes through titanium plates' },
    { name: 'Ion Separation', description: 'Water molecules split into H+ and OH- ions' },
    { name: 'Alkaline Stream', description: 'OH- ions create alkaline water (pH 8.5-11)' },
    { name: 'Acidic Stream', description: 'H+ ions create acidic water (pH 2.5-6.5)' },
    { name: 'Output', description: 'Two separate streams with different properties' }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentStep(prev => (prev + 1) % steps.length);
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, steps.length]);

  const toggleAnimation = () => {
    setIsPlaying(!isPlaying);
  };

  const resetAnimation = () => {
    setIsPlaying(false);
    setCurrentStep(0);
  };

  return (
    <div className="relative w-full h-96 bg-gradient-to-br from-blue-900/40 via-purple-900/40 to-pink-900/40 rounded-3xl border border-white/10 backdrop-blur-xl overflow-hidden">
      {/* Background Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Water Flow Animation */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Input Water */}
        <div className="absolute left-8 top-1/2 -translate-y-1/2">
          <div className="w-16 h-16 rounded-full bg-blue-500/20 border-2 border-blue-400 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-blue-400 animate-pulse"></div>
          </div>
          <div className="text-xs text-white/80 mt-2 text-center">H₂O</div>
        </div>

        {/* Electrolysis Chamber */}
        <div className="relative w-32 h-24 bg-white/10 border border-white/20 rounded-2xl flex items-center justify-center">
          {/* Titanium Plates */}
          <div className="flex gap-2">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className={`w-2 h-16 bg-gradient-to-b from-gray-300 to-gray-500 rounded ${
                  isPlaying && currentStep >= 1 ? 'animate-pulse' : ''
                }`}
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 text-xs text-white/60">
            ⚡ Electrolysis
          </div>
        </div>

        {/* Ion Streams */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-4">
          {/* Alkaline Stream */}
          <div className="flex items-center gap-2">
            <div className={`w-12 h-12 rounded-full bg-green-500/20 border-2 border-green-400 flex items-center justify-center transition-all duration-500 ${
              isPlaying && currentStep >= 3 ? 'scale-110 animate-pulse' : ''
            }`}>
              <div className="text-xs text-green-300 font-bold">OH⁻</div>
            </div>
            <div className="text-xs text-white/80">
              <div>Alkaline</div>
              <div>pH 8.5-11</div>
            </div>
          </div>

          {/* Acidic Stream */}
          <div className="flex items-center gap-2">
            <div className={`w-12 h-12 rounded-full bg-red-500/20 border-2 border-red-400 flex items-center justify-center transition-all duration-500 ${
              isPlaying && currentStep >= 4 ? 'scale-110 animate-pulse' : ''
            }`}>
              <div className="text-xs text-red-300 font-bold">H⁺</div>
            </div>
            <div className="text-xs text-white/80">
              <div>Acidic</div>
              <div>pH 2.5-6.5</div>
            </div>
          </div>
        </div>

        {/* Flow Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {/* Input to Chamber */}
          <path
            d="M 80 200 Q 120 200 160 200"
            stroke="url(#gradient1)"
            strokeWidth="2"
            fill="none"
            strokeDasharray="5,5"
            className={isPlaying && currentStep >= 0 ? 'animate-pulse' : ''}
          />
          
          {/* Chamber to Alkaline */}
          <path
            d="M 200 180 Q 240 180 280 180"
            stroke="url(#gradient2)"
            strokeWidth="2"
            fill="none"
            strokeDasharray="5,5"
            className={isPlaying && currentStep >= 3 ? 'animate-pulse' : ''}
          />
          
          {/* Chamber to Acidic */}
          <path
            d="M 200 220 Q 240 220 280 220"
            stroke="url(#gradient3)"
            strokeWidth="2"
            fill="none"
            strokeDasharray="5,5"
            className={isPlaying && currentStep >= 4 ? 'animate-pulse' : ''}
          />

          {/* Gradients */}
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#ef4444" stopOpacity="0.2" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Controls */}
      <div className="absolute bottom-4 left-4 flex items-center gap-3">
        <button
          onClick={toggleAnimation}
          className="p-3 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 transition-all"
        >
          {isPlaying ? <Pause className="w-5 h-5 text-white" /> : <Play className="w-5 h-5 text-white" />}
        </button>
        <button
          onClick={resetAnimation}
          className="p-3 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 transition-all"
        >
          <RotateCcw className="w-5 h-5 text-white" />
        </button>
        <div className="text-sm text-white/80">
          Step {currentStep + 1}: {steps[currentStep]?.name}
        </div>
      </div>

      {/* Step Indicator */}
      <div className="absolute top-4 right-4">
        <div className="flex gap-1">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${
                index <= currentStep ? 'bg-blue-400' : 'bg-white/30'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
