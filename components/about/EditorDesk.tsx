"use client";

import { motion } from "framer-motion";

export default function EditorDesk() {
  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative rounded-3xl border border-[#EBEBEB]/20 bg-white/95 backdrop-blur-xl shadow-2xl p-8 md:p-12 overflow-hidden"
    >
      {/* Top Label */}
      <div className="relative flex items-center gap-4 mb-8">
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#EBEBEB] border border-[#EBEBEB] text-[#0A2238]">
          <div className="w-2 h-2 bg-[#0A0F2C] rounded-full" />
          <span className="text-sm font-bold tracking-wider uppercase">
            FROM THE EDITOR'S DESK
          </span>
        </div>
        <div className="h-px flex-1 bg-[#EBEBEB]" />
      </div>

      {/* Main Heading */}
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-3xl md:text-4xl lg:text-5xl font-black text-[#0A0F2C] leading-tight mb-8"
      >
        About{" "}
        <span className="text-[#FFD100]">
          IONORA
        </span>
      </motion.h2>

      {/* Content */}
      <div className="relative prose prose-lg max-w-none leading-relaxed text-[#0A0F2C]/90">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="space-y-6"
        >
          <p className="text-lg leading-relaxed">
            At <strong className="text-[#0A0F2C]">Ionora International Private Limited</strong>, we believe that true vitality flows from nature's purest gift — water. Our mission is to transform this simple element into a source of life-enhancing energy through the world's most trusted alkaline water ionizers from <strong className="text-[#0A0F2C]">Life Ionizers, Mediqua, and Medisoul Water Ionizers</strong>.
          </p>

          <p className="text-lg leading-relaxed">
            For over two decades, these pioneering brands have shaped the evolution of ionization technology, turning ordinary drinking water into a powerful elixir rich in antioxidants, alkaline minerals, and purity. Ionora brings this legacy to every household — empowering families to experience water that strengthens immunity, revitalizes energy, and promotes a vibrant lifestyle.
          </p>

          <p className="text-lg leading-relaxed">
            But our promise goes beyond products. With Ionora's dedicated mobile app, customers enjoy one-click service, instant assistance, and seamless after-sales support — setting a new benchmark in customer care.
          </p>

          <p className="text-lg leading-relaxed">
            Driven by excellence and guided by innovation, <strong className="text-[#0A0F2C]">IONORA</strong> stands as a symbol of trust, technology, and transformation — helping people everywhere live healthier, longer, and more balanced lives.
          </p>

          {/* Vision Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="relative p-6 rounded-2xl bg-gradient-to-br from-[#FFD100]/10 to-[#FFD100]/5 border border-[#FFD100]/20 mt-8"
          >
            <h3 className="text-xl font-bold text-[#0A0F2C] mb-3">Our Vision</h3>
            <p className="text-[#0A0F2C]/90 leading-relaxed">
              To redefine wellness through the power of pure, ionized water — enriching lives with vitality, balance, and health; and to be the most trusted, customer-centric provider of world-class alkaline water ionizers, empowering healthier and more sustainable living through innovation, convenience, and exceptional service.
            </p>
          </motion.div>

          {/* Mission Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="relative p-6 rounded-2xl bg-[#EBEBEB] border border-[#EBEBEB] mt-8"
          >
            <h3 className="text-xl font-bold text-[#0A0F2C] mb-3">Our Mission</h3>
            <ul className="space-y-2 text-[#0A0F2C]/90">
              <li className="flex items-start gap-3">
                <span className="text-[#FFD100] font-bold mt-1">•</span>
                <span>To bring globally renowned brands such as Life Ionizers, Mediqua, KYK, and Kangen Water Ionizers to customers seeking premium alkaline water solutions for better health and wellness.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#FFD100] font-bold mt-1">•</span>
                <span>To make advanced water ionization technology accessible to every home, office, and institution, enhancing health and hydration at every level.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#FFD100] font-bold mt-1">•</span>
                <span>To revolutionize after-sales care through our one-click service support via our dedicated mobile app, ensuring faster response, transparent communication, and complete convenience.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#FFD100] font-bold mt-1">•</span>
                <span>To educate communities on the life-changing benefits of alkaline and ionized water, fostering a culture of wellness and environmental consciousness.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#FFD100] font-bold mt-1">•</span>
                <span>To uphold the highest standards of integrity, service excellence, and innovation in everything we do.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#FFD100] font-bold mt-1">•</span>
                <span>To champion eco-friendly hydration by promoting sustainable alternatives that reduce plastic waste and preserve our planet's water resources.</span>
              </li>
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </motion.article>
  );
}
