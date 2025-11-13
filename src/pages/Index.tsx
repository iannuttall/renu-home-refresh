import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { BookingCalendar } from "@/components/BookingCalendar";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Services />
      <BookingCalendar />
      <Footer />
    </div>
  );
};

export default Index;
