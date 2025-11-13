import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const AVAILABLE_DAYS = [2, 3, 5]; // Tuesday, Wednesday, Friday
const SLOTS = [
  { id: "morning", label: "9:30 - 11:30" },
  { id: "afternoon", label: "12:30 - 2:30" },
];

export const BookingCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [details, setDetails] = useState("");

  const isAvailableDay = (date: Date) => {
    return AVAILABLE_DAYS.includes(date.getDay());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDate || !selectedSlot || !name || !email || !phone) {
      toast.error("Please fill in all required fields");
      return;
    }

    toast.success("Booking request submitted! We'll confirm your appointment shortly.", {
      description: `${name} - ${selectedDate.toLocaleDateString()} at ${SLOTS.find(s => s.id === selectedSlot)?.label}`,
    });

    // Reset form
    setSelectedDate(undefined);
    setSelectedSlot(null);
    setName("");
    setEmail("");
    setPhone("");
    setDetails("");
  };

  return (
    <section id="booking" className="py-20 bg-background">
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">Book an Appointment</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Select an available date and time slot. We're available Tuesday, Wednesday, and Friday.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle>Choose Your Appointment</CardTitle>
              <CardDescription>
                Pick a date and time that works for you
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Calendar Section */}
                  <div className="space-y-4">
                    <Label className="text-base font-semibold">Select Date</Label>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) => {
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);
                        return date < today || !isAvailableDay(date);
                      }}
                      className="rounded-md border shadow-soft mx-auto"
                      classNames={{
                        day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
                        day_disabled: "text-muted-foreground opacity-50",
                      }}
                    />
                    <p className="text-sm text-muted-foreground text-center">
                      Available: Tuesday, Wednesday, Friday
                    </p>
                  </div>

                  {/* Time Slots & Form */}
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <Label className="text-base font-semibold">Select Time Slot</Label>
                      <div className="grid grid-cols-2 gap-4">
                        {SLOTS.map((slot) => (
                          <Button
                            key={slot.id}
                            type="button"
                            variant="outline"
                            onClick={() => setSelectedSlot(slot.id)}
                            disabled={!selectedDate}
                            className={cn(
                              "h-auto py-4 text-base transition-all",
                              selectedSlot === slot.id && "bg-primary text-primary-foreground hover:bg-primary/90"
                            )}
                          >
                            {slot.label}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="John Smith"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="john@example.com"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="07XXX XXXXXX"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="details">Repair Details (Optional)</Label>
                        <Textarea
                          id="details"
                          value={details}
                          onChange={(e) => setDetails(e.target.value)}
                          placeholder="Tell us about the repair needed..."
                          rows={3}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center pt-4">
                  <Button
                    type="submit"
                    size="lg"
                    className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold shadow-medium min-w-48"
                  >
                    Submit Booking Request
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
