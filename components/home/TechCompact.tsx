'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Activity, Droplets, FlaskConical, Sparkles, ArrowRight, Sparkles as SparklesIcon } from 'lucide-react';

// Lazy load the animation component
const AdvancedWaterIonizationAnimation = dynamic(
  () => import('@/components/tech/AdvancedWaterIonizationAnimation'),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white/30"></div>
      </div>
    )
  }
);

const tabs = [
  {
    id: 'ionized',
    label: 'Ionized Water',
    icon: Droplets,
    description: 'Advanced electrolysis creates structured water with enhanced properties',
    benefits: [
      { icon: 'Shield', text: 'Antioxidant Properties', value: 'ORP -300mV', color: 'text-green-400' },
      { icon: 'Heart', text: 'Superior Hydration', value: '6x Faster', color: 'text-blue-400' },
      { icon: 'Brain', text: 'Enhanced Absorption', value: 'Molecular Size', color: 'text-purple-400' }
    ],
    content: 'Ionized water is produced through advanced electrolysis technology, creating two distinct streams: alkaline water rich in antioxidants and acidic water with natural cleansing properties.'
  },
  {
    id: 'ph',
    label: 'pH Scale',
    icon: Activity,
    description: 'Precise pH control from mildly acidic to highly alkaline',
    benefits: [
      { icon: 'Zap', text: 'Alkaline Range', value: 'pH 8.5-11', color: 'text-green-400' },
      { icon: 'Shield', text: 'Acidic Range', value: 'pH 2.5-6.5', color: 'text-red-400' },
      { icon: 'Heart', text: 'Neutral Zone', value: 'pH 7.0', color: 'text-blue-400' }
    ],
    content: 'Our systems provide precise pH control, allowing you to create water tailored for specific health benefits, from antioxidant-rich alkaline water to natural cleansing acidic water.'
  },
  {
    id: 'orp',
    label: 'ORP',
    icon: FlaskConical,
    description: 'Oxidation Reduction Potential measures antioxidant capacity',
    benefits: [
      { icon: 'Shield', text: 'Antioxidant Power', value: '-300mV', color: 'text-green-400' },
      { icon: 'Zap', text: 'Free Radical Neutralization', value: '99.9%', color: 'text-blue-400' },
      { icon: 'Heart', text: 'Cellular Protection', value: 'Enhanced', color: 'text-purple-400' }
    ],
    content: 'Negative ORP indicates high antioxidant potential, helping neutralize free radicals and support cellular health through advanced electrolysis technology.'
  },
  {
    id: 'electrolysis',
    label: 'Electrolysis',
    icon: Sparkles,
    description: 'Advanced titanium plate technology for optimal ionization',
    benefits: [
      { icon: 'Zap', text: 'Titanium Plates', value: 'Medical Grade', color: 'text-blue-400' },
      { icon: 'Shield', text: 'Durability', value: '15+ Years', color: 'text-green-400' },
      { icon: 'Heart', text: 'Efficiency', value: '99.9%', color: 'text-purple-400' }
    ],
    content: 'Our electrolysis chambers feature medical-grade titanium plates that efficiently separate water molecules into alkaline and acidic streams through controlled electrical current.'
  }
];

export default function TechCompact() {
  const [activeTab, setActiveTab] = useState('ionized');
  const [isVisible, setIsVisible] = useState(false);
  const [shouldLoadAnimation, setShouldLoadAnimation] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Load animation when section comes into view
          setTimeout(() => setShouldLoadAnimation(true), 500);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const activeTabData = tabs.find(tab => tab.id === activeTab);

  return (
    <section 
      ref={sectionRef} 
      id="technology-preview"
      className="relative py-16 md:py-20"
    >
      {/* Background Effects - Light GPU usage */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        {/* Subtle sparkles */}
        <div className="absolute top-1/3 right-1/3">
          <SparklesIcon className="w-4 h-4 text-blue-400/30 animate-pulse" />
        </div>
        <div className="absolute bottom-1/3 left-1/3">
          <SparklesIcon className="w-3 h-3 text-purple-400/30 animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent mb-4">
            Advanced Technology
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
            Understand pH, ORP and the electrolysis process.
          </p>
        </div>

        {/* Tab Navigation */}
        <motion.div 
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {tabs.map((tab, index) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`group relative px-4 py-3 rounded-xl border backdrop-blur-xl transition-all duration-500 ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-400/50 text-white shadow-[0_0_20px_rgba(59,130,246,0.3)]'
                    : 'bg-white/5 border-white/15 text-white/80 hover:bg-white/10 hover:border-white/25'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={isActive ? { rotate: 360 } : { rotate: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${isActive ? 'text-blue-300' : 'text-white/70'}`} />
                  </motion.div>
                  <span className="font-medium text-sm">{tab.label}</span>
                </div>
                {isActive && (
                  <motion.div 
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Information */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {/* Tab Description */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6"
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <motion.h3 
                  className="text-2xl font-bold text-white mb-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {activeTabData?.label}
                </motion.h3>
                <motion.p 
                  className="text-white/80 text-base leading-relaxed mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {activeTabData?.description}
                </motion.p>
                <motion.p 
                  className="text-white/70 text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {activeTabData?.content}
                </motion.p>
              </motion.div>
            </AnimatePresence>

            {/* Benefits Grid */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`benefits-${activeTab}`}
                className="grid grid-cols-1 sm:grid-cols-3 gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {activeTabData?.benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl p-3 text-center group hover:bg-white/10 transition-all duration-300"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 * index }}
                    whileHover={{ scale: 1.05, y: -3 }}
                  >
                    <div className="text-xs text-white/80 mb-1">{benefit.text}</div>
                    <div className={`text-sm font-bold ${benefit.color}`}>{benefit.value}</div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Right: Interactive Animation */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            {/* Gradient Ring Accent */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 blur-xl"></div>
            
            <div className="relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 h-[520px] md:h-[520px]">
              <div className="h-full flex items-center justify-center">
                {shouldLoadAnimation ? (
                  <AdvancedWaterIonizationAnimation />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 animate-pulse"></div>
                      <div className="text-white/60 text-sm">Loading interactive diagram...</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Learn More Button */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <Link
            href="/technology#interactive"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl border border-white/15 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-xl text-white font-medium hover:from-blue-500/30 hover:to-purple-500/30 transition-all duration-300 group"
          >
            <span>Learn More</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}