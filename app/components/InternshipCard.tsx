import type { Internship } from '../types/internship';

const brandColors: Record<string, string> = {
  Google: '#4285F4',
  Microsoft: '#00A4EF',
  Swiggy: '#FC8019',
  Amazon: '#FF9900',
  Zomato: '#E23744',
  PhonePe: '#5F259F',
  'Times of India': '#003366',
  Flipkart: '#2874F0',
};

function getInitialColor(company: string): string {
  return brandColors[company] || '#006bff';
}

function getInitials(company: string): string {
  return company
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

function formatStipend(stipend: Internship['stipend']): string {
  if (stipend.salaryType === 'fixed') {
    return stipend.salary;
  }
  return stipend.salary;
}

interface InternshipCardProps {
  internship: Internship;
  index: number;
}

export default function InternshipCard({ internship, index }: InternshipCardProps) {
  const {
    title,
    company_name,
    company_logo,
    profile_name,
    location_names,
    duration,
    stipend,
    start_date,
    work_from_home,
    part_time,
    is_ppo,
    is_premium,
    labels_app_in_card,
    url,
  } = internship;

  return (
    <article
      className="bg-surface rounded-xl border border-border p-5 card-hover cursor-pointer animate-fade-up"
      style={{ animationDelay: `${index * 0.05}s`, opacity: 0 }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3.5 flex-1 min-w-0">
          {company_logo ? (
            <img
              src={company_logo}
              alt={`${company_name} logo`}
              className="w-11 h-11 rounded-lg object-contain flex-shrink-0"
            />
          ) : (
            <div
              className="w-11 h-11 rounded-lg flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
              style={{ backgroundColor: getInitialColor(company_name) }}
            >
              {getInitials(company_name)}
            </div>
          )}
          <div className="min-w-0">
            <h3 className="text-base font-semibold text-text-primary truncate">
              {title}
            </h3>
            <p className="text-sm text-text-secondary mt-0.5">{company_name}</p>
            <p className="text-xs text-text-tertiary mt-0.5">{profile_name}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          {is_premium && (
            <span className="text-xs font-bold text-premium bg-premium-light px-2 py-0.5 rounded flex items-center gap-1">
              <svg className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Premium
            </span>
          )}
          <button
            className="p-1.5 rounded-md text-text-tertiary hover:text-primary hover:bg-primary-light transition-colors"
            aria-label="Bookmark"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
            </svg>
          </button>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2.5">
        {location_names.map((loc) => (
          <span
            key={loc}
            className="inline-flex items-center gap-1 text-xs font-medium text-text-secondary bg-ghost px-2.5 py-1 rounded-full"
          >
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {loc}
          </span>
        ))}
        <span className="inline-flex items-center gap-1 text-xs font-medium text-text-secondary bg-ghost px-2.5 py-1 rounded-full">
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {duration}
        </span>
        <span className="inline-flex items-center gap-1 text-xs font-semibold text-success bg-success-light px-2.5 py-1 rounded-full">
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {formatStipend(stipend)}
        </span>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-1.5">
        {start_date.toLowerCase().includes('immediately') && (
          <span className="text-xs font-semibold text-immediate bg-immediate-light px-2 py-0.5 rounded">
            Starts Immediately
          </span>
        )}
        {is_ppo && (
          <span className="text-xs font-semibold text-ppo bg-ppo-light px-2 py-0.5 rounded">
            PPO
          </span>
        )}
        {work_from_home && (
          <span className="text-xs font-semibold text-wfh bg-wfh-light px-2 py-0.5 rounded">
            Work From Home
          </span>
        )}
        {part_time && (
          <span className="text-xs font-semibold text-parttime bg-parttime-light px-2 py-0.5 rounded">
            Part-time
          </span>
        )}
        {labels_app_in_card
          .filter((l) => !['Internship', 'PPO', 'Work From Home', 'Part-time'].includes(l))
          .map((label) => (
            <span
              key={label}
              className="text-xs font-semibold text-text-secondary bg-ghost px-2 py-0.5 rounded"
            >
              {label}
            </span>
          ))}
      </div>

      <div className="mt-4 pt-4 border-t border-border-light flex items-center justify-between">
        <span className="text-xs text-text-tertiary">{start_date}</span>
        <a
          href={`https://internshala.com/internship/detail/${url}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-semibold text-primary hover:text-primary-dark transition-colors"
        >
          Apply Now &rarr;
        </a>
      </div>
    </article>
  );
}
