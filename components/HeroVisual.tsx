'use client';

import { useEffect, useRef } from 'react';
import { Globe2, Activity, Cpu, Headphones } from 'lucide-react';
import WaterDroplet from '@/components/WaterDroplet';

function usePrefersReducedMotion() {
  const prefers = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;
  return prefers;
}

export default function HeroVisual() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || reduced) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    let mounted = true;

    // Retina scale
    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.scale(dpr, dpr);
    };
    const onResize = () => {
      // Reset transform matrix before re-scaling
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      resize();
    };

    resize();
    window.addEventListener('resize', onResize);

    // Particle ring config
    const PARTICLE_RINGS = [
      { r: 70, n: 120, speed: 0.0008, hue: 210 },
      { r: 110, n: 90, speed: -0.0012, hue: 260 },
      { r: 150, n: 70, speed: 0.0016, hue: 295 },
    ];

    // Create particles
    const particles: { base: number; off: number; hue: number; ring: number }[] = [];
    PARTICLE_RINGS.forEach((ring, i) => {
      for (let k = 0; k < ring.n; k++) {
        particles.push({
          ring: i,
          base: (k / ring.n) * Math.PI * 2,
          off: Math.random() * Math.PI * 2,
          hue: ring.hue,
        });
      }
    });

    const draw = (t: number) => {
      if (!mounted) return;
      const { width, height } = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, width, height);

      // Soft radial glow
      const cx = width / 2;
      const cy = height / 2;
      const grad = ctx.createRadialGradient(cx, cy, 10, cx, cy, Math.min(width, height) * 0.65);
      grad.addColorStop(0, 'rgba(124, 58, 237, 0.35)'); // violet
      grad.addColorStop(1, 'rgba(15, 23, 42, 0.0)');    // slate-900 transparent
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Subtle core sphere
      ctx.beginPath();
      ctx.arc(cx, cy, Math.min(width, height) * 0.22, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(59, 130, 246, 0.10)'; // blue-500/10
      ctx.fill();

      // Particle rings
      particles.forEach((p) => {
        const ring = PARTICLE_RINGS[p.ring];
        const a = p.base + Math.sin((t + p.off) * ring.speed * 1000) * 0.7 + t * ring.speed * 4;
        const r = ring.r;

        const x = cx + Math.cos(a) * r;
        const y = cy + Math.sin(a) * r * 0.55; // squash for "globe" feel

        const size = 1 + Math.sin(t * 0.002 + p.off) * 0.5;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 85%, 65%, 0.75)`;
        ctx.fill();
      });

      raf = requestAnimationFrame((nextT) => draw(nextT));
    };

    raf = requestAnimationFrame((t) => draw(t));

    return () => {
      mounted = false;
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
    };
  }, [reduced]);

  return (
    <div className="relative w-full h-full">
      <div className="absolute inset-0 rounded-3xl border border-white/10 bg-gradient-to-br from-purple-900/40 via-indigo-900/30 to-slate-900/50 backdrop-blur-[2px] overflow-hidden">
        {/* Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          aria-hidden="true"
        />

        {/* Center droplet */}
        <div className="absolute inset-0 grid place-items-center">
          <div className="w-[56%] max-w-[340px] min-w-[220px]">
            <WaterDroplet />
          </div>
        </div>

        {/* Overlay USPs */}
        <div className="absolute inset-0 p-4 md:p-6 lg:p-8 flex flex-col justify-between pointer-events-none">
          {/* Top-left badge */}
          <div className="flex gap-3 flex-wrap">
            <div className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs text-white/90">
              <Globe2 className="h-4 w-4" />
              <span>Trusted in 32+ Countries</span>
            </div>
          </div>

          {/* Bottom feature grid */}
          <div className="grid grid-cols-2 gap-3 md:gap-4 lg:gap-5">
            <Feature
              icon={<Activity className="h-4 w-4" />}
              title="Medical-grade Ionization"
              subtitle="Clinically validated"
            />
            <Feature
              icon={<Cpu className="h-4 w-4" />}
              title="AI-Powered Filtration"
              subtitle="Adaptive purity"
            />
            <Feature
              icon={<Headphones className="h-4 w-4" />}
              title="24/7 Global Support"
              subtitle="Anywhere you are"
            />
            <Feature
              icon={<Globe2 className="h-4 w-4" />}
              title="Eco-Optimized"
              subtitle="Low energy profile"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function Feature({
  icon,
  title,
  subtitle,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="pointer-events-auto rounded-2xl border border-white/10 bg-white/5 p-3 md:p-4 backdrop-blur-sm hover:bg-white/10 transition">
      <div className="flex items-center gap-2 text-white">
        <span className="grid place-items-center h-7 w-7 rounded-full bg-white/10 border border-white/15">
          {icon}
        </span>
        <div>
          <p className="text-sm font-medium leading-tight">{title}</p>
          <p className="text-[11px] text-white/70 leading-none mt-1">{subtitle}</p>
        </div>
      </div>
    </div>
  );
}
