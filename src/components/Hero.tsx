import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-kitchen.jpg";

export const Hero = () => {
  const scrollToBooking = () => {
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-primary/75" />
      </div>
      
      <div className="container relative z-10 px-4 py-20 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold text-primary-foreground tracking-tight">
            Renu
          </h1>
          <p className="text-2xl md:text-3xl text-primary-foreground/95 font-light">
            Professional Kitchen & Bathroom Repairs
          </p>
          <p className="text-lg md:text-xl text-primary-foreground/90 max-w-2xl mx-auto">
            Expert repair services for your kitchen and bathroom. From hinges to taps, 
            we restore functionality with professional care.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button 
              size="lg"
              onClick={scrollToBooking}
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold shadow-medium transition-all hover:scale-105"
            >
              Book an Appointment
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="bg-background/10 backdrop-blur-sm border-2 border-primary-foreground/30 text-primary-foreground hover:bg-background/20 font-semibold"
            >
              View Services
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
