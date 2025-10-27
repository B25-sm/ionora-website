import WhatsAppButton from '@/components/common/WhatsAppButton';

export default function FABs(){
  return (
    <div className="fixed right-4 bottom-[calc(1rem+var(--safe-bottom))] z-50 flex flex-col gap-3 md:right-6">
      <WhatsAppButton variant="floating" size="md" />
      <a href="#top" className="rounded-full border border-primary/20 bg-bg px-4 py-3 text-primary hover:bg-primary/10 transition-colors shadow-lg">Top</a>
    </div>
  );
}
