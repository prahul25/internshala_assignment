export interface Stipend {
  salary: string;
  salaryValue1: number | null;
  salaryValue2: number | null;
  salaryType: string;
  currency: string;
  scale: string;
}

export interface Location {
  string: string;
  locationName: string;
  country: string;
  region: string | null;
}

export interface Internship {
  id: number;
  title: string;
  company_name: string;
  company_logo: string;
  company_url: string;
  profile_name: string;
  location_names: string[];
  locations: Location[];
  duration: string;
  stipend: Stipend;
  start_date: string;
  posted_on: string;
  application_deadline: string;
  expiring_in: string;
  work_from_home: boolean;
  part_time: boolean;
  is_ppo: boolean;
  is_premium: boolean;
  is_international_job: boolean;
  url: string;
  labels_app_in_card: string[];
}

export interface Filters {
  profile: string;
  location: string;
  durationMax: number;
  stipendMin: number;
  workFromHome: boolean;
  partTime: boolean;
}