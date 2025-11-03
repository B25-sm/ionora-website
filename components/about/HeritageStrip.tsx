"use client";

import { motion } from "framer-motion";

const items = [
  { 
    year: "2004", 
    title: "Early Innovation Era", 
    description: "R&D begins with pioneering water ionization research",
    icon: "🔬",
    color: "from-blue-500 to-cyan-500"
  },
  { 
    year: "2012", 
    title: "Medical-Grade Breakthroughs", 
    description: "Clinically validated technology and certifications",
    icon: "🏥",
    color: "from-emerald-500 to-teal-500"
  },
  { 
    year: "2018", 
    title: "Global Expansion", 
    description: "Worldwide certifications and market presence",
    icon: "🌐",
    color: "from-purple-500 to-pink-500"
  },
  { 
    year: "2024", 
    title: "IONORA Launch", 
    description: "Premium marketplace connecting brands and customers",
    icon: "🚀",
    color: "from-amber-500 to-orange-500"
  },
];

export default function HeritageStrip() {
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
        <h2 className="text-4xl md:text-5xl font-black mb-4">
          <span className="text-white">Our</span> <span className="text-[#EBEBEB]">Heritage</span>
        </h2>
        <p className="text-xl text-[#E5E5E5] max-w-2xl mx-auto">
          Two decades of innovation in water ionization technology
        </p>
      </motion.div>

      {/* Timeline */}
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-[#EBEBEB] rounded-full hidden md:block" />
        
        {/* Timeline Items */}
        <div className="space-y-12 md:space-y-16">
          {items.map((item, idx) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: idx * 0.2, duration: 0.6 }}
              className={`relative flex flex-col md:flex-row items-center gap-8 ${
                idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Timeline Dot */}
              <div className="relative z-10 flex-shrink-0">
                <div className="w-6 h-6 rounded-full bg-[#EBEBEB] border-4 border-white shadow-lg" />
              </div>

              {/* Content Card */}
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                className={`relative w-full md:w-5/12 ${
                  idx % 2 === 0 ? 'md:text-right' : 'md:text-left'
                }`}
              >
                <div className="relative overflow-hidden rounded-3xl border border-[#EBEBEB] bg-white p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
                  {/* Icon */}
                  <div className="relative mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-[#EBEBEB] flex items-center justify-center text-3xl mb-4">
                      {item.icon}
                    </div>
                  </div>

                  {/* Year */}
                  <div className="text-3xl font-black text-[#0A0F2C] mb-2">
                    {item.year}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-[#0A0F2C] mb-3">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[#0A0F2C]/70 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Hover Effect Line */}
                  <div className="absolute bottom-0 left-0 h-1 w-0 bg-[#EBEBEB] group-hover:w-full transition-all duration-500" />
                </div>
              </motion.div>

              {/* Spacer for alternating layout */}
              <div className="hidden md:block flex-1" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
