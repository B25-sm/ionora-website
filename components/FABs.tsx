import WhatsAppButton from '@/components/common/WhatsAppButton';

export default function FABs(){
  return (
    <div className="fixed right-4 bottom-[calc(1rem+var(--safe-bottom))] z-50 flex flex-col gap-3 md:right-6">
      <WhatsAppButton variant="floating" size="md" />
      <a href="#top" className="rounded-full border border-[#B45253]/20 bg-white/90 px-4 py-3 text-[#B45253] hover:bg-[#FFE797]/20 transition-colors shadow-lg">Top</a>
    </div>
  );
}
