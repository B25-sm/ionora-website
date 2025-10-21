'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import HeroVisual from '@/components/HeroVisual';

export default function HeroSection() {
  return (
    <section className="relative min-h-[80svh] md:min-h-screen section-pad flex items-center overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="page-wrap">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-xl bg-white/10 border border-white/20">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
              <span className="text-white/90 text-sm">In-stock • 24h Installation</span>
            </div>

            <h1 className="font-extrabold leading-tight">
              <span className="text-white">Pure Water,</span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Pure Life
              </span>
            </h1>

            <p className="text-xl text-white/70 leading-relaxed max-w-xl">
              Discover premium water ionizers from world-leading brands. Transform your hydration with cutting-edge ionization technology.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link 
                href="/products"
                className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl text-white font-semibold flex items-center gap-2 hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105"
              >
                Explore Products
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/technology"
                className="px-8 py-4 backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl text-white font-semibold hover:bg-white/20 transition-all duration-300"
              >
                Learn Technology
              </Link>
            </div>

            <div className="flex gap-8 pt-8">
              <div>
                <div className="text-3xl font-bold text-white">6</div>
                <div className="text-white/60 text-sm">Premium Brands</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">50+</div>
                <div className="text-white/60 text-sm">Models Available</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">20+</div>
                <div className="text-white/60 text-sm">Years Innovation</div>
              </div>
            </div>
          </div>

          <div className="h-[52vh] md:h-[64vh]">
            <HeroVisual />
          </div>
        </div>
      </div>
    </section>
  );
}