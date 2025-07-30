import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { GlamBotLogo } from "@/components/icons";
import { AppointmentScheduler } from "@/components/appointment-scheduler";
import Chatbot from "@/components/chatbot";
import { Scissors, Smile, Hand, Heart, Wind, Eye, Droplet, Sun, Facebook, Twitter, Instagram } from "lucide-react";
import Image from "next/image";

const services = [
  {
    icon: <Scissors className="size-8 text-primary" />,
    title: "Haircuts",
    description: "Modern styles and classic cuts from our expert stylists.",
  },
  {
    icon: <Smile className="size-8 text-primary" />,
    title: "Facials",
    description: "Rejuvenate your skin with our range of custom facials.",
  },
  {
    icon: <Hand className="size-8 text-primary" />,
    title: "Manicures",
    description: "Perfect nails, from simple polish to intricate designs.",
  },
  {
    icon: <Heart className="size-8 text-primary" />,
    title: "Bridal Makeup",
    description: "Look your absolute best on your special day.",
  },
  {
    icon: <Wind className="size-8 text-primary" />,
    title: "Massage",
    description: "Relax and unwind with our therapeutic massage services.",
  },
  {
    icon: <Eye className="size-8 text-primary" />,
    title: "Threading",
    description: "Expert threading for perfectly shaped brows.",
  },
  {
    icon: <Droplet className="size-8 text-primary" />,
    title: "Waxing",
    description: "Smooth, flawless skin with our professional waxing.",
  },
  {
    icon: <Sun className="size-8 text-primary" />,
    title: "Skin Treatments",
    description: "Advanced treatments to target your specific skin concerns.",
  },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <a href="#" className="flex items-center gap-2">
            <GlamBotLogo className="size-8 text-primary" />
            <span className="font-headline text-2xl font-bold text-foreground">Glow Haus</span>
          </a>
          <a href="#book-appointment">
            <Button>Book Now</Button>
          </a>
        </div>
      </header>

      <main className="flex-1">
        <section id="hero" className="relative w-full py-20 md:py-32 lg:py-40">
           <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent z-10" />
           <Image 
              src="https://placehold.co/1600x900.png" 
              alt="Woman with beautiful hair" 
              layout="fill"
              objectFit="cover"
              className="opacity-20"
              data-ai-hint="salon serene"
            />
          <div className="container relative z-20 mx-auto text-center">
            <h1 className="font-headline text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Experience Beauty, Redefined.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
              Discover personalized salon services with our AI-powered assistant. Your perfect look is just a conversation away.
            </p>
            <div className="mt-8 flex justify-center gap-4">
               <a href="#book-appointment"><Button size="lg">Book an Appointment</Button></a>
               <a href="#services"><Button size="lg" variant="outline">Explore Services</Button></a>
            </div>
          </div>
        </section>

        <section id="services" className="w-full py-12 md:py-24 lg:py-32 bg-card">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">Our Services</h2>
              <p className="mt-4 text-muted-foreground">
                From classic cuts to luxurious treatments, we offer a full range of services to make you look and feel your best.
              </p>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {services.map((service) => (
                <Card key={service.title} className="transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                  <CardHeader className="flex flex-col items-center text-center">
                    <div className="mb-4 rounded-full bg-secondary p-4">
                      {service.icon}
                    </div>
                    <CardTitle className="font-headline">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center text-muted-foreground">
                    <p>{service.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="book-appointment" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">Book an Appointment</h2>
              <p className="mt-4 text-muted-foreground">
                Select your preferred service and time. Let us take care of the rest.
              </p>
            </div>
            <AppointmentScheduler />
          </div>
        </section>
      </main>

      <footer className="w-full bg-card">
        <div className="container py-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div>
              <a href="#" className="flex items-center gap-2">
                <GlamBotLogo className="size-8 text-primary" />
                <span className="font-headline text-2xl font-bold text-foreground">Glow Haus</span>
              </a>
              <p className="mt-4 text-muted-foreground">The future of salon experiences.</p>
              <div className="mt-4 flex gap-4">
                <Button variant="ghost" size="icon"><Facebook className="size-5" /></Button>
                <Button variant="ghost" size="icon"><Twitter className="size-5" /></Button>
                <Button variant="ghost" size="icon"><Instagram className="size-5" /></Button>
              </div>
            </div>
            <div>
              <h3 className="font-headline text-lg font-semibold">Operating Hours</h3>
              <ul className="mt-4 space-y-2 text-muted-foreground">
                <li>Monday - Saturday: 10AM - 8PM</li>
                <li>Sunday: Closed</li>
              </ul>
            </div>
            <div>
              <h3 className="font-headline text-lg font-semibold">Contact</h3>
               <ul className="mt-4 space-y-2 text-muted-foreground">
                <li>123 Beauty Lane, Toronto, ON</li>
                <li>(416) 123-4567</li>
                <li>contact@glowhaus.com</li>
              </ul>
            </div>
          </div>
          <Separator className="my-8" />
          <p className="text-center text-sm text-muted-foreground">© {new Date().getFullYear()} Glow Haus. All rights reserved.</p>
        </div>
      </footer>
      
      <Chatbot />
    </div>
  );
}
