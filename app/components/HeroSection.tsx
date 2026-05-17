interface HeroSectionProps {
  resultCount: number;
}

export default function HeroSection({ resultCount }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-primary via-primary-dark to-[#0045b3] text-white">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold leading-tight max-w-2xl">
          Find the Perfect Internship
          <span className="block text-blue-200">for Your Career</span>
        </h1>
        <p className="mt-4 text-base sm:text-lg text-blue-100 max-w-xl leading-relaxed">
          Explore {resultCount} curated internships from India&apos;s top companies.
          Filter by profile, location, stipend, and more to find your dream role.
        </p>
        <div className="mt-6 flex items-center gap-2 text-sm text-blue-200">
          <span className="inline-flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse-soft" />
            {resultCount} internships available
          </span>
        </div>
      </div>
    </section>
  );
}
