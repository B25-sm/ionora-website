'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';

type Option = { label: string; value: string };
type Props = {
  value: string;
  onChange: (v: string) => void;
  options: Option[];
  placeholder?: string;
  className?: string;
};

export default function HeadlessSelect({ value, onChange, options, placeholder = 'Select', className = '' }: Props) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const id = useId();
  const selected = options.find(o => o.value === value);

  // close on outside click / escape
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!listRef.current && !btnRef.current) return;
      const t = e.target as Node;
      if (!listRef.current?.contains(t) && !btnRef.current?.contains(t)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('mousedown', onClick); document.removeEventListener('keydown', onKey); };
  }, []);

  return (
    <div className={`relative ${className}`}>
      <button
        ref={btnRef}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen(o => !o)}
        className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-left text-white/90 focus:outline-none focus:ring-2 focus:ring-purple-500/40 flex items-center justify-between"
      >
        <span className={selected ? '' : 'text-white/50'}>{selected?.label ?? placeholder}</span>
        <ChevronDown className={`h-4 w-4 transition ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div
          ref={listRef}
          id={id}
          role="listbox"
          className="absolute z-50 mt-2 w-full overflow-hidden rounded-2xl border border-white/15 bg-slate-900/95 backdrop-blur-xl shadow-2xl"
        >
          <div className="max-h-60 overflow-y-auto p-1">
            {options.map(opt => {
              const active = opt.value === value;
              return (
                <div
                  key={opt.value}
                  role="option"
                  aria-selected={active}
                  onClick={() => { onChange(opt.value); setOpen(false); }}
                  className={`cursor-pointer rounded-xl px-3 py-2 text-sm ${
                    active
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                      : 'text-white/90 hover:bg-white/10'
                  }`}
                >
                  {opt.label}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
