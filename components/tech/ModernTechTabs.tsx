'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Droplets, FlaskConical, Sparkles, Zap, Shield, Heart, Brain } from 'lucide-react';
import AdvancedWaterIonizationAnimation from './AdvancedWaterIonizationAnimation';

const tabs = [
  {
    id: 'ionized',
    label: 'Ionized Water',
    icon: Droplets,
    description: 'Advanced electrolysis creates structured water with enhanced properties',
    benefits: [
      { icon: Shield, text: 'Antioxidant Properties', value: 'ORP -300mV', color: 'text-green-400' },
      { icon: Heart, text: 'Superior Hydration', value: '6x Faster', color: 'text-blue-400' },
      { icon: Brain, text: 'Enhanced Absorption', value: 'Molecular Size', color: 'text-purple-400' }
    ],
    content: 'Ionized water is produced through advanced electrolysis technology, creating two distinct streams: alkaline water rich in antioxidants and acidic water with natural cleansing properties.'
  },
  {
    id: 'ph',
    label: 'pH Scale',
    icon: Activity,
    description: 'Precise pH control from mildly acidic to highly alkaline',
    benefits: [
      { icon: Zap, text: 'Alkaline Range', value: 'pH 8.5-11', color: 'text-green-400' },
      { icon: Shield, text: 'Acidic Range', value: 'pH 2.5-6.5', color: 'text-red-400' },
      { icon: Heart, text: 'Neutral Zone', value: 'pH 7.0', color: 'text-blue-400' }
    ],
    content: 'Our systems provide precise pH control, allowing you to create water tailored for specific health benefits, from antioxidant-rich alkaline water to natural cleansing acidic water.'
  },
  {
    id: 'orp',
    label: 'ORP',
    icon: FlaskConical,
    description: 'Oxidation Reduction Potential measures antioxidant capacity',
    benefits: [
      { icon: Shield, text: 'Antioxidant Power', value: '-300mV', color: 'text-green-400' },
      { icon: Zap, text: 'Free Radical Neutralization', value: '99.9%', color: 'text-blue-400' },
      { icon: Heart, text: 'Cellular Protection', value: 'Enhanced', color: 'text-purple-400' }
    ],
    content: 'Negative ORP indicates high antioxidant potential, helping neutralize free radicals and support cellular health through advanced electrolysis technology.'
  },
  {
    id: 'electrolysis',
    label: 'Electrolysis',
    icon: Sparkles,
    description: 'Advanced titanium plate technology for optimal ionization',
    benefits: [
      { icon: Zap, text: 'Titanium Plates', value: 'Medical Grade', color: 'text-blue-400' },
      { icon: Shield, text: 'Durability', value: '15+ Years', color: 'text-green-400' },
      { icon: Heart, text: 'Efficiency', value: '99.9%', color: 'text-purple-400' }
    ],
    content: 'Our electrolysis chambers feature medical-grade titanium plates that efficiently separate water molecules into alkaline and acidic streams through controlled electrical current.'
  }
];

export default function ModernTechTabs() {
  const [activeTab, setActiveTab] = useState('ionized');
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
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
    <section ref={sectionRef} className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-900/20 to-purple-900/20">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-20">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent mb-6">
            Advanced
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Technology
            </span>
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            Discover the science behind water ionization and how our cutting-edge technology 
            transforms ordinary water into a powerful health and wellness tool.
          </p>
        </div>

        {/* Tab Navigation */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4 mb-16"
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
                className={`group relative px-6 py-4 rounded-2xl border backdrop-blur-xl transition-all duration-500 ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-400/50 text-white shadow-[0_0_30px_rgba(59,130,246,0.3)]'
                    : 'bg-white/5 border-white/15 text-white/80 hover:bg-white/10 hover:border-white/25'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={isActive ? { rotate: 360 } : { rotate: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${isActive ? 'text-blue-300' : 'text-white/70'}`} />
                  </motion.div>
                  <span className="font-medium">{tab.label}</span>
                </div>
                {isActive && (
                  <motion.div 
                    className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10"
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
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {/* Tab Description */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8"
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <motion.h2 
                  className="text-3xl font-bold text-white mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {activeTabData?.label}
                </motion.h2>
                <motion.p 
                  className="text-white/80 text-lg leading-relaxed mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {activeTabData?.description}
                </motion.p>
                <motion.p 
                  className="text-white/70"
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
                className="grid grid-cols-1 sm:grid-cols-3 gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {activeTabData?.benefits.map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <motion.div
                      key={index}
                      className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-4 text-center group hover:bg-white/10 transition-all duration-300"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 * index }}
                      whileHover={{ scale: 1.05, y: -5 }}
                    >
                      <motion.div 
                        className="w-12 h-12 mx-auto mb-3 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <Icon className={`w-6 h-6 ${benefit.color}`} />
                      </motion.div>
                      <div className="text-sm text-white/80 mb-1">{benefit.text}</div>
                      <div className={`text-lg font-bold ${benefit.color}`}>{benefit.value}</div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Right: Interactive Animation */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <AdvancedWaterIonizationAnimation />
          </motion.div>
        </div>

        {/* Health Benefits */}
        <motion.div 
          className="mt-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <motion.h3 
            className="text-3xl font-bold text-center text-white mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            Health Benefits
          </motion.h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              'Neutralizes Acidity',
              'Reduces Acid Reflux', 
              'Antioxidant Properties',
              'Superior Hydration',
              'Detoxification',
              'Energy & Metabolism',
              'Bone Health',
              'Skin Health & Anti-Aging',
              'Cardio Support',
              'General Wellness'
            ].map((benefit, index) => (
              <motion.div
                key={index}
                className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl p-4 text-center hover:bg-white/10 transition-all duration-300 group"
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 1.3 + index * 0.05 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <motion.div 
                  className="text-sm text-white/80 group-hover:text-white transition-colors"
                  whileHover={{ scale: 1.1 }}
                >
                  {benefit}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
