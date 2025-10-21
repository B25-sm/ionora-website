'use client';
import { useEffect, useState } from 'react';
import products from '@/data/products';

export default function SearchModal(){
  const [open,setOpen]=useState(false);
  useEffect(()=>{
    const onKey=(e:KeyboardEvent)=>{ if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){ e.preventDefault(); setOpen(true);} };
    window.addEventListener('keydown',onKey); return ()=>window.removeEventListener('keydown',onKey);
  },[]);
  if(!open) return null;
  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm" onClick={()=>setOpen(false)}>
      <div className="mx-auto mt-24 w-full max-w-2xl rounded-2xl border border-white/15 bg-slate-900 p-4" onClick={e=>e.stopPropagation()}>
        <input autoFocus placeholder="Search products (UI only)" className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white/90" />
        <div className="mt-3 max-h-64 overflow-auto">
          {products.slice(0,5).map(p=>(
            <div key={p.id} className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white/80">{p.name}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
