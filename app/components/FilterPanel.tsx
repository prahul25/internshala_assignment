'use client';

import { useState, useMemo } from 'react';
import type { Filters } from '../types/internship';

const profiles = [
  'Web Development', 'Data Science', 'UI/UX Design', 'Machine Learning',
  'Digital Marketing', 'Product Management', 'Content Writing',
  'Mobile Development', 'DevOps', 'Cloud Computing', 'Cybersecurity',
  'Blockchain', 'Artificial Intelligence', 'Business Development',
];

const locations = [
  'Bangalore', 'Mumbai', 'Delhi', 'Hyderabad', 'Pune',
  'Chennai', 'Kolkata', 'Ahmedabad', 'Gurgaon', 'Noida',
  'Work From Home',
];

const durationOptions = [
  { label: '1 Month', value: 1 },
  { label: '2 Months', value: 2 },
  { label: '3 Months', value: 3 },
  { label: '4 Months', value: 4 },
  { label: '5 Months', value: 5 },
  { label: '6 Months', value: 6 },
];

const stipendPresets = [0, 5000, 10000, 15000, 25000, 50000];

interface FilterPanelProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
  activeFilterCount: number;
  onClearAll: () => void;
}

export default function FilterPanel({
  filters,
  onChange,
  activeFilterCount,
  onClearAll,
}: FilterPanelProps) {
  const [profileSearch, setProfileSearch] = useState('');
  const [locationSearch, setLocationSearch] = useState('');

  const filteredProfiles = useMemo(
    () =>
      profiles.filter(
        (p) =>
          !filters.profiles.includes(p) &&
          p.toLowerCase().includes(profileSearch.toLowerCase())
      ),
    [filters.profiles, profileSearch]
  );

  const filteredLocations = useMemo(
    () =>
      locations.filter(
        (l) =>
          !filters.locations.includes(l) &&
          l.toLowerCase().includes(locationSearch.toLowerCase())
      ),
    [filters.locations, locationSearch]
  );

  const set = (patch: Partial<Filters>) => onChange({ ...filters, ...patch });

  function toggleArrayItem(arr: string[], item: string): string[] {
    return arr.includes(item) ? arr.filter((i) => i !== item) : [...arr, item];
  }

  function toggleProfile(profile: string) {
    set({ profiles: toggleArrayItem(filters.profiles, profile) });
  }

  function toggleLocation(loc: string) {
    set({ locations: toggleArrayItem(filters.locations, loc) });
  }

  return (
    <aside className="w-full lg:w-72 flex-shrink-0">
      <div className="lg:sticky lg:top-24 space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-heading font-semibold text-text-primary">
            Filters
          </h2>
          <div className="flex items-center gap-2">
            {activeFilterCount > 0 && (
              <span className="text-xs font-semibold text-white bg-primary px-2 py-0.5 rounded-full">
                {activeFilterCount}
              </span>
            )}
            {activeFilterCount > 0 && (
              <button
                onClick={onClearAll}
                className="text-xs font-semibold text-error hover:text-error/80 transition-colors"
              >
                Clear all
              </button>
            )}
          </div>
        </div>

        {/* Profile */}
        <CollapsibleSection title="Profile" defaultOpen>
          <div className="relative flex flex-wrap gap-1.5 p-2 border-2 border-border rounded-md bg-surface focus-within:border-primary focus-within:shadow-[0_0_0_3px_var(--color-primary-light)] transition-all">
            {filters.profiles.map((p) => (
              <span key={p} className="filter-chip !text-xs !py-0.5 !px-2">
                {p}
                <button
                  onClick={() => toggleProfile(p)}
                  className="filter-chip-remove"
                  type="button"
                >
                  &times;
                </button>
              </span>
            ))}
            <input
              type="text"
              placeholder={filters.profiles.length ? '' : 'Search profiles...'}
              value={profileSearch}
              onChange={(e) => setProfileSearch(e.target.value)}
              className="flex-1 min-w-[100px] border-none outline-none text-sm bg-transparent py-0.5 placeholder:text-text-tertiary"
            />
          </div>
          <div className="mt-2 space-y-1 max-h-48 overflow-y-auto">
            {filteredProfiles.map((profile) => (
              <label
                key={profile}
                className={`flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer text-sm transition-colors ${
                  filters.profiles.includes(profile)
                    ? 'bg-primary-light text-primary font-semibold'
                    : 'text-text-secondary hover:bg-ghost'
                }`}
              >
                <input
                  type="checkbox"
                  checked={filters.profiles.includes(profile)}
                  onChange={() => toggleProfile(profile)}
                  className="accent-primary"
                />
                {profile}
              </label>
            ))}
            {filteredProfiles.length === 0 && (
              <p className="text-xs text-text-tertiary px-2 py-1">No profiles found</p>
            )}
          </div>
        </CollapsibleSection>

        {/* Location */}
        <CollapsibleSection title="Location" defaultOpen>
          <div className="relative flex flex-wrap gap-1.5 p-2 border-2 border-border rounded-md bg-surface focus-within:border-primary focus-within:shadow-[0_0_0_3px_var(--color-primary-light)] transition-all">
            {filters.locations.map((l) => (
              <span key={l} className="filter-chip !text-xs !py-0.5 !px-2">
                {l}
                <button
                  onClick={() => toggleLocation(l)}
                  className="filter-chip-remove"
                  type="button"
                >
                  &times;
                </button>
              </span>
            ))}
            <input
              type="text"
              placeholder={filters.locations.length ? '' : 'Search locations...'}
              value={locationSearch}
              onChange={(e) => setLocationSearch(e.target.value)}
              className="flex-1 min-w-[100px] border-none outline-none text-sm bg-transparent py-0.5 placeholder:text-text-tertiary"
            />
          </div>
          <div className="mt-2 space-y-1 max-h-48 overflow-y-auto">
            {filteredLocations.map((loc) => (
              <label
                key={loc}
                className={`flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer text-sm transition-colors ${
                  filters.locations.includes(loc)
                    ? 'bg-primary-light text-primary font-semibold'
                    : 'text-text-secondary hover:bg-ghost'
                }`}
              >
                <input
                  type="checkbox"
                  checked={filters.locations.includes(loc)}
                  onChange={() => toggleLocation(loc)}
                  className="accent-primary"
                />
                {loc}
              </label>
            ))}
            {filteredLocations.length === 0 && (
              <p className="text-xs text-text-tertiary px-2 py-1">No locations found</p>
            )}
          </div>
        </CollapsibleSection>

        {/* Duration */}
        <CollapsibleSection title="Max Duration">
          <div className="flex flex-wrap gap-1.5">
            {durationOptions.map((d) => (
              <button
                key={d.value}
                onClick={() =>
                  set({ durationMax: filters.durationMax === d.value ? 12 : d.value })
                }
                className={`px-3 py-1.5 text-xs font-semibold rounded-full border transition-colors ${
                  filters.durationMax === d.value
                    ? 'bg-primary text-white border-primary'
                    : 'bg-surface text-text-secondary border-border hover:border-primary hover:text-primary'
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
        </CollapsibleSection>

        {/* Stipend */}
        <CollapsibleSection title="Min. Stipend (₹)">
          <div className="space-y-3">
            <input
              type="range"
              min={0}
              max={50000}
              step={1000}
              value={filters.stipendMin}
              onChange={(e) => set({ stipendMin: Number(e.target.value) })}
            />
            <div className="flex items-center justify-between text-xs text-text-tertiary">
              <span>₹0</span>
              <span className="font-semibold text-text-primary">
                ₹{filters.stipendMin.toLocaleString('en-IN')}+
              </span>
              <span>₹50K</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {stipendPresets.map((s) => (
                <button
                  key={s}
                  onClick={() => set({ stipendMin: s })}
                  className={`px-2.5 py-1 text-xs font-medium rounded-full border transition-colors ${
                    filters.stipendMin === s
                      ? 'bg-primary text-white border-primary'
                      : 'bg-surface text-text-secondary border-border hover:border-primary'
                  }`}
                >
                  {s === 0 ? 'Any' : `₹${s >= 1000 ? `${s / 1000}K` : s}`}
                </button>
              ))}
            </div>
          </div>
        </CollapsibleSection>

        {/* Work From Home Toggle */}
        <div className="pt-2">
          <label className="toggle">
            <input
              type="checkbox"
              checked={filters.workFromHome}
              onChange={(e) => set({ workFromHome: e.target.checked })}
            />
            <span className="toggle-track" />
            <span className="toggle-label">Work From Home</span>
          </label>
        </div>

        {/* Part-time Toggle */}
        <div>
          <label className="toggle">
            <input
              type="checkbox"
              checked={filters.partTime}
              onChange={(e) => set({ partTime: e.target.checked })}
            />
            <span className="toggle-track" />
            <span className="toggle-label">Part-time</span>
          </label>
        </div>
      </div>
    </aside>
  );
}

function CollapsibleSection({
  title,
  defaultOpen,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen ?? false);

  return (
    <div className="bg-surface rounded-lg border border-border p-4">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full text-left"
      >
        <span className="text-sm font-semibold text-text-primary">{title}</span>
        <svg
          className={`w-4 h-4 text-text-tertiary transition-transform duration-200 ${
            open ? 'rotate-180' : ''
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && <div className="mt-3">{children}</div>}
    </div>
  );
}
