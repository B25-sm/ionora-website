import WhatsAppButton from '@/components/common/WhatsAppButton';

export default function FABs(){
  return (
    <div className="fixed right-4 bottom-[calc(1rem+var(--safe-bottom))] z-50 flex flex-col gap-3 md:right-6">
      <WhatsAppButton variant="floating" size="md" />
      <a href="#top" className="rounded-full border border-white/20 bg-white/10 px-4 py-3 text-white hover:bg-white/20 transition-colors">Top</a>
    </div>
  );
}
