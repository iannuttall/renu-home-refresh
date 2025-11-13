import { Phone, Mail, Clock } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container px-4">
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold mb-4">Renu</h3>
            <p className="text-primary-foreground/90 text-sm">
              Professional kitchen and bathroom repair services you can trust.
            </p>
          </div>

          <div className="text-center md:text-left">
            <h4 className="font-semibold mb-4 flex items-center justify-center md:justify-start gap-2">
              <Clock className="h-5 w-5" />
              Availability
            </h4>
            <div className="text-sm text-primary-foreground/90 space-y-1">
              <p>Tuesday: 9:30 - 14:30</p>
              <p>Wednesday: 9:30 - 14:30</p>
              <p>Friday: 9:30 - 14:30</p>
            </div>
          </div>

          <div className="text-center md:text-left">
            <h4 className="font-semibold mb-4">Contact</h4>
            <div className="space-y-2 text-sm text-primary-foreground/90">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <Phone className="h-4 w-4" />
                <span>Coming soon</span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <Mail className="h-4 w-4" />
                <span>Coming soon</span>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-8 pt-8 border-t border-primary-foreground/20 text-sm text-primary-foreground/80">
          <p>&copy; {new Date().getFullYear()} Renu. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
