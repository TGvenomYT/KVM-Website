import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StatsBar from "@/components/StatsBar";
import HallOfFame from "@/components/HallOfFame";
import Courses from "@/components/Courses";
import Faculty from "@/components/Faculty";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      <Navbar />
      <Hero />
      <StatsBar />
      <HallOfFame />
      <Courses />
      <Faculty />
      <Testimonials />
      <Footer />
    </main>
  );
}
