import { fetchInternships } from './lib/api';
import HeroSection from './components/HeroSection';
import InternshipList from './components/InternshipList';

export default async function Home() {
  const internships = await fetchInternships();

  return (
    <>
      <HeroSection resultCount={internships.length} />
      <InternshipList internships={internships} />
    </>
  );
}
