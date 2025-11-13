import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Wrench, Droplet, Lightbulb, DoorOpen, Grid3x3, Layers } from "lucide-react";
import kitchenImage from "@/assets/kitchen-service.jpg";
import bathroomImage from "@/assets/bathroom-service.jpg";

export const Services = () => {
  const kitchenServices = [
    { icon: DoorOpen, label: "Doors & Hinges" },
    { icon: Grid3x3, label: "Drawers" },
    { icon: Layers, label: "Worktops" },
    { icon: Droplet, label: "Taps" },
    { icon: Lightbulb, label: "Lighting" },
    { icon: Wrench, label: "General Repairs" },
  ];

  const bathroomServices = [
    { icon: Droplet, label: "Taps & Valves" },
    { icon: Wrench, label: "Resealing" },
    { icon: Layers, label: "System Repairs" },
  ];

  return (
    <section className="py-20 bg-secondary/30">
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">Our Services</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Professional repair services for your home's most important spaces
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Kitchen Services */}
          <Card className="overflow-hidden shadow-soft hover:shadow-medium transition-all duration-300">
            <div className="h-64 overflow-hidden">
              <img 
                src={kitchenImage} 
                alt="Kitchen repair services"
                className="w-full h-full object-cover"
              />
            </div>
            <CardHeader>
              <CardTitle className="text-2xl text-primary">Kitchen Repairs</CardTitle>
              <CardDescription className="text-base">
                Complete kitchen repair solutions to keep your space functional
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {kitchenServices.map((service, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-2 text-sm text-foreground"
                  >
                    <service.icon className="h-5 w-5 text-primary" />
                    <span>{service.label}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Bathroom Services */}
          <Card className="overflow-hidden shadow-soft hover:shadow-medium transition-all duration-300">
            <div className="h-64 overflow-hidden">
              <img 
                src={bathroomImage} 
                alt="Bathroom repair services"
                className="w-full h-full object-cover"
              />
            </div>
            <CardHeader>
              <CardTitle className="text-2xl text-primary">Bathroom Repairs</CardTitle>
              <CardDescription className="text-base">
                Expert bathroom repairs for a seamless, leak-free experience
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4">
                {bathroomServices.map((service, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-2 text-sm text-foreground"
                  >
                    <service.icon className="h-5 w-5 text-primary" />
                    <span>{service.label}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
