import Hero from '@/components/Hero';
import Team from '@/components/Team';
import TripTimeline from '@/components/TripTimeline';

export default function Home() {
  return (
    <main className="bg-black min-h-screen">
      <Hero />
      <Team />
      <TripTimeline />
    </main>
  );
}