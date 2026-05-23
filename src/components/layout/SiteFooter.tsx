export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 mt-16">
      <div className="container-zylo py-10 flex flex-col gap-3 text-sm">
        <div className="font-black tracking-[0.25em]">ZYLO AVENUE</div>
        <div className="text-muted">
          Premium streetwear commerce — built for speed. Payment integration coming soon.
        </div>
        <div className="text-white/40">© {new Date().getFullYear()} ZYLO AVENUE</div>
      </div>
    </footer>
  );
}
