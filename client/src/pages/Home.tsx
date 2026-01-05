import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Map, Calendar, Compass, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import heroImg from "@assets/generated_images/abstract_3d_travel_route_illustration.png";
import flatlayImg from "@assets/generated_images/aesthetic_travel_planning_flatlay_with_map_and_notebook.png";

export default function Home() {
  return (
    <div className="min-h-screen relative">
      {/* Blended Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/90 via-background/95 to-purple-50/90" />
        <div
          className="absolute inset-0 opacity-[0.15] bg-center bg-no-repeat bg-cover mix-blend-multiply"
          style={{
            backgroundImage: `url(/travel-landmarks-3d.png)`,
            backgroundSize: '1400px auto',
            backgroundPosition: 'center 20%'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 overflow-hidden pt-20 pb-32 lg:pt-32">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6">
                <Compass className="h-4 w-4" />
                <span>Planner-First Travel Platform</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-heading font-bold leading-[1.1] mb-6 text-foreground">
                Plan Your <span className="text-primary">Journey</span>,<br />
                Not Just Your Bookings.
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-lg leading-relaxed">
                Visualize your route, structure your itinerary, and design the perfect trip before you spend a dime.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/create-trip">
                  <Button size="lg" className="h-14 px-8 text-lg rounded-full shadow-xl shadow-primary/20 hover:scale-105 transition-transform">
                    Start Planning <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button variant="outline" size="lg" className="h-14 px-8 text-lg rounded-full hover:bg-muted/50 border-soft">
                    View Demo Trip
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-full blur-3xl opacity-50" />
              <img
                src={heroImg}
                alt="Travel Planning Visual"
                className="relative z-10 w-full h-auto drop-shadow-2xl rounded-3xl transform rotate-1 hover:rotate-0 transition-transform duration-700"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-24 bg-muted/30 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Why GlobeTrotter?</h2>
            <p className="text-muted-foreground text-lg">
              Most tools focus on booking flights and hotels. We focus on the experience in between.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Map className="h-8 w-8 text-primary" />}
              title="Visual Planning"
              description="See your trip on a map. Understand distances, routes, and logical flows instantly."
            />
            <FeatureCard
              icon={<Calendar className="h-8 w-8 text-secondary" />}
              title="Structured Itineraries"
              description="Build day-by-day plans that make sense. Drag, drop, and organize effortlessly."
            />
            <FeatureCard
              icon={<Compass className="h-8 w-8 text-accent" />}
              title="Stress-Free Exploration"
              description="Plan first, book later. Experiment with different routes without commitment."
            />
          </div>
        </div>
      </section>

      {/* Visual Section */}
      <section className="relative z-10 py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={flatlayImg} alt="Planning Background" className="w-full h-full object-cover opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="glass-panel p-8 md:p-12 rounded-container-lg max-w-4xl mx-auto text-center shadow-2xl">
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6">Ready to design your next adventure?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of explorers who plan smarter with GlobeTrotter.
            </p>
            <Link href="/create-trip">
              <Button size="lg" className="h-14 px-10 text-lg rounded-full bg-primary text-white hover:bg-primary/90 shadow-lg">
                Create Your First Trip
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="card-elevated p-8 hover-border-soft">
      <div className="mb-6 bg-muted/50 w-16 h-16 rounded-2xl flex items-center justify-center ring-1 ring-border/50">
        {icon}
      </div>
      <h3 className="text-xl font-heading font-bold mb-3">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  );
}
