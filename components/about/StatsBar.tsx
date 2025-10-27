"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const stats = [
  { 
    value: "20+", 
    label: "Years of Innovation", 
    description: "Pioneering water ionization technology",
    icon: "🚀",
    color: "from-blue-500 to-cyan-500"
  },
  { 
    value: "32+", 
    label: "Countries Served", 
    description: "Global presence and reach",
    icon: "🌍",
    color: "from-emerald-500 to-teal-500"
  },
  { 
    value: "11–15", 
    label: "Models per Brand", 
    description: "Diverse product portfolio",
    icon: "⚡",
    color: "from-purple-500 to-pink-500"
  },
  { 
    value: "1M+", 
    label: "Liters ionized daily", 
    description: "Clean water for millions",
    icon: "💧",
    color: "from-amber-500 to-orange-500"
  },
];

export default function StatsBar() {
  const [counters, setCounters] = useState(stats.map(() => 0));

  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepDuration = duration / steps;

    const intervals = stats.map((stat, index) => {
      const targetValue = parseInt(stat.value.replace(/[^\d]/g, ''));
      const increment = targetValue / steps;
      
      return setInterval(() => {
        setCounters(prev => {
          const newCounters = [...prev];
          if (newCounters[index] < targetValue) {
            newCounters[index] = Math.min(newCounters[index] + increment, targetValue);
          }
          return newCounters;
        });
      }, stepDuration);
    });

    return () => {
      intervals.forEach(interval => clearInterval(interval));
    };
  }, []);

  return (
    <div className="text-center">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-black text-[#0A0F2C] mb-4">
          By the <span className="text-[#EBEBEB]">Numbers</span>
        </h2>
        <p className="text-xl text-[#0A0F2C]/70 max-w-2xl mx-auto">
          Our impact in water ionization technology
        </p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-8"
      >
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.6 }}
            whileHover={{ y: -8, scale: 1.05 }}
            className="group relative"
          >
            <div className="relative overflow-hidden rounded-3xl border border-[#EBEBEB] bg-white p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
              {/* Icon */}
              <div className="relative mb-6">
                <div className="w-16 h-16 rounded-2xl bg-[#EBEBEB] flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
              </div>

              {/* Counter */}
              <div className="relative mb-4">
                <motion.div 
                  className="text-4xl md:text-5xl font-black text-[#0A0F2C]"
                  initial={{ scale: 0.5 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: idx * 0.1 + 0.3, duration: 0.5, type: "spring" }}
                >
                  {stat.value.includes('+') ? Math.floor(counters[idx]) + '+' : 
                   stat.value.includes('–') ? stat.value : 
                   Math.floor(counters[idx])}
                </motion.div>
              </div>

              {/* Label */}
              <h3 className="text-lg font-bold text-[#0A2238] mb-2 group-hover:text-[#EBEBEB] transition-colors duration-300">
                {stat.label}
              </h3>
              
              {/* Description */}
              <p className="text-[#0A0F2C]/70 text-sm leading-relaxed">
                {stat.description}
              </p>

              {/* Hover Effect Line */}
              <div className="absolute bottom-0 left-0 h-1 w-0 bg-[#EBEBEB] group-hover:w-full transition-all duration-500" />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
