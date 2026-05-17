'use client';

import { useState, useMemo, useEffect, useCallback } from 'react';
import type { Internship, Filters } from '../types/internship';
import FilterPanel from './FilterPanel';
import InternshipCard from './InternshipCard';

type SortKey = 'relevance' | 'stipend' | 'duration' | 'latest';
type SortDir = 'asc' | 'desc';

const sortOptions: { label: string; value: SortKey }[] = [
  { label: 'Relevance', value: 'relevance' },
  { label: 'Stipend', value: 'stipend' },
  { label: 'Duration', value: 'duration' },
  { label: 'Latest', value: 'latest' },
];

function parseDurationMonths(duration: string): number {
  const num = parseInt(duration, 10);
  return isNaN(num) ? 99 : num;
}

function parseStipendValue(stipend: Internship['stipend']): number {
  return stipend.salaryValue1 ?? 0;
}

function parsePostedDate(posted_on: string): number {
  const match = posted_on.match(/(\d+)/);
  if (!match) return 0;
  const day = parseInt(match[1], 10);
  const monthMap: Record<string, number> = {
    "Jan'": 0, "Feb'": 1, "Mar'": 2, "Apr'": 3, "May'": 4, "Jun'": 5,
    "Jul'": 6, "Aug'": 7, "Sep'": 8, "Oct'": 9, "Nov'": 10, "Dec'": 11,
  };
  const monthStr = posted_on.split(' ')[1];
  const month = monthMap[monthStr] ?? 0;
  return new Date(2025, month, day).getTime();
}

const defaultFilters: Filters = {
  profiles: [],
  locations: [],
  durationMax: 12,
  stipendMin: 0,
  workFromHome: false,
  partTime: false,
};

interface InternshipListProps {
  internships: Internship[];
}

export default function InternshipList({ internships }: InternshipListProps) {
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [sort, setSort] = useState<SortKey>('relevance');
  const [sortDir, setSortDir] = useState<SortDir>('desc');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.profiles.length) count++;
    if (filters.locations.length) count++;
    if (filters.durationMax < 12) count++;
    if (filters.stipendMin > 0) count++;
    if (filters.workFromHome) count++;
    if (filters.partTime) count++;
    return count;
  }, [filters]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    let result = internships.filter((internship) => {
      if (q) {
        const haystack = [
          internship.title,
          internship.company_name,
          internship.profile_name,
          ...internship.location_names,
        ]
          .join(' ')
          .toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      if (filters.profiles.length && !filters.profiles.includes(internship.profile_name)) return false;
      if (filters.locations.length && !filters.locations.some((l) => internship.location_names.includes(l))) return false;
      if (parseDurationMonths(internship.duration) > filters.durationMax) return false;
      if (parseStipendValue(internship.stipend) < filters.stipendMin) return false;
      if (filters.workFromHome && !internship.work_from_home) return false;
      if (filters.partTime && !internship.part_time) return false;
      return true;
    });

    const dir = sortDir === 'desc' ? -1 : 1;
    result.sort((a, b) => {
      switch (sort) {
        case 'stipend':
          return (parseStipendValue(a.stipend) - parseStipendValue(b.stipend)) * dir;
        case 'duration':
          return (parseDurationMonths(a.duration) - parseDurationMonths(b.duration)) * dir;
        case 'latest':
          return (parsePostedDate(a.posted_on) - parsePostedDate(b.posted_on)) * dir;
        default:
          return 0;
      }
    });

    return result;
  }, [internships, search, filters, sort, sortDir]);

  const clearAll = useCallback(() => {
    setFilters({ ...defaultFilters });
    setSearch('');
  }, []);

  const activeChips = useMemo(() => {
    const chips: { label: string; onRemove: () => void }[] = [];
    filters.profiles.forEach((p) =>
      chips.push({
        label: `Profile: ${p}`,
        onRemove: () =>
          setFilters((prev) => ({
            ...prev,
            profiles: prev.profiles.filter((x) => x !== p),
          })),
      })
    );
    filters.locations.forEach((l) =>
      chips.push({
        label: `Location: ${l}`,
        onRemove: () =>
          setFilters((prev) => ({
            ...prev,
            locations: prev.locations.filter((x) => x !== l),
          })),
      })
    );
    if (filters.durationMax < 12)
      chips.push({
        label: `Max ${filters.durationMax} month${filters.durationMax > 1 ? 's' : ''}`,
        onRemove: () => setFilters((prev) => ({ ...prev, durationMax: 12 })),
      });
    if (filters.stipendMin > 0)
      chips.push({
        label: `₹${filters.stipendMin.toLocaleString('en-IN')}+`,
        onRemove: () => setFilters((prev) => ({ ...prev, stipendMin: 0 })),
      });
    if (filters.workFromHome)
      chips.push({
        label: 'Work From Home',
        onRemove: () => setFilters((prev) => ({ ...prev, workFromHome: false })),
      });
    if (filters.partTime)
      chips.push({
        label: 'Part-time',
        onRemove: () => setFilters((prev) => ({ ...prev, partTime: false })),
      });
    return chips;
  }, [filters]);

  useEffect(() => {
    if (mobileFilterOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileFilterOpen]);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
      {/* Search + Sort Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search internships, companies, skills..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
          <svg className="search-icon w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-tertiary hover:text-text-primary"
              aria-label="Clear search"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-1.5 text-sm font-semibold text-text-primary bg-surface border border-border px-3 py-2 rounded-lg hover:bg-ghost transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filters
            {activeFilterCount > 0 && (
              <span className="text-xs font-bold text-white bg-primary px-1.5 py-0.5 rounded-full">
                {activeFilterCount}
              </span>
            )}
          </button>
          <select
            value={sort}
            onChange={(e) => {
              const val = e.target.value as SortKey;
              setSort(val);
              if (val === 'stipend') setSortDir('desc');
              else if (val === 'duration') setSortDir('asc');
            }}
            className="text-sm font-medium text-text-primary bg-surface border border-border rounded-lg px-3 py-2 pr-8 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-light"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%239a9ab0' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 10px center',
            }}
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
                {opt.value === 'stipend' && sort === 'stipend'
                  ? sortDir === 'desc' ? ' (High-Low)' : ' (Low-High)'
                  : ''}
                {opt.value === 'duration' && sort === 'duration'
                  ? sortDir === 'asc' ? ' (Short-Long)' : ' (Long-Short)'
                  : ''}
                {opt.value === 'latest' && sort === 'latest'
                  ? sortDir === 'desc' ? ' (Newest)' : ' (Oldest)'
                  : ''}
              </option>
            ))}
          </select>
          {(sort === 'stipend' || sort === 'duration' || sort === 'latest') && (
            <button
              onClick={() => setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))}
              className="flex items-center justify-center w-9 h-9 rounded-lg border border-border bg-surface hover:bg-ghost transition-colors text-text-tertiary hover:text-text-primary"
              aria-label={`Sort ${sortDir === 'asc' ? 'descending' : 'ascending'}`}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                {sortDir === 'asc' ? (
                  <>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                  </>
                ) : (
                  <>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
                  </>
                )}
              </svg>
            </button>
          )}
        </div>
      </div>

      <div className="flex gap-6 lg:gap-8">
        {/* Desktop Filter Panel */}
        <div className="hidden lg:block">
          <FilterPanel
            filters={filters}
            onChange={setFilters}
            activeFilterCount={activeFilterCount}
            onClearAll={clearAll}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Result Count */}
          <p className="text-sm text-text-secondary mb-4">
            Showing{' '}
            <span className="font-semibold text-text-primary">{filtered.length}</span>{' '}
            {filtered.length === 1 ? 'internship' : 'internships'}
          </p>

          {/* Cards */}
          {filtered.length > 0 ? (
            <div className="space-y-4">
              {filtered.map((internship, i) => (
                <InternshipCard key={internship.id} internship={internship} index={i} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 animate-fade-in">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary-light flex items-center justify-center">
                <svg className="w-10 h-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-heading font-semibold text-text-primary mb-1">
                No internships found
              </h3>
              <p className="text-sm text-text-tertiary mb-6 max-w-xs mx-auto">
                Try adjusting your filters or search term to find more opportunities.
              </p>
              <button
                onClick={clearAll}
                className="text-sm font-semibold text-white bg-primary px-5 py-2.5 rounded-lg hover:bg-primary-dark transition-colors"
              >
                Reset all filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40 animate-fade-in"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-background overflow-y-auto animate-slide-up">
            <div className="sticky top-0 z-10 bg-surface border-b border-border px-4 py-3 flex items-center justify-between">
              <h2 className="text-lg font-heading font-semibold">Filters</h2>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="p-1.5 rounded-md hover:bg-ghost text-text-tertiary"
                aria-label="Close filters"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4">
              <FilterPanel
                filters={filters}
                onChange={setFilters}
                activeFilterCount={activeFilterCount}
                onClearAll={clearAll}
              />
            </div>
            <div className="sticky bottom-0 bg-surface border-t border-border px-4 py-3">
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full text-sm font-semibold text-white bg-primary py-3 rounded-lg hover:bg-primary-dark transition-colors"
              >
                Show {filtered.length} results
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
