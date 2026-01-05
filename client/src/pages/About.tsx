import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">Built for Planners.</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            We believe that the best trips are the ones that are thoughtfully designed, not just booked.
          </p>
        </motion.div>

        <div className="space-y-12 text-lg leading-relaxed text-foreground/80">
          <section>
            <h2 className="text-2xl font-heading font-bold mb-4 text-foreground">The Problem</h2>
            <p>
              Traditional travel platforms are transaction-obsessed. They want you to book a flight, book a hotel, and move on. 
              But they skip the most important part: <strong>The Plan</strong>. Where are you going? How do the locations connect? 
              Does the flow make sense?
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-bold mb-4 text-foreground">Our Solution</h2>
            <p>
              GlobeTrotter puts the itinerary first. We provide a visual canvas where you can plot your journey, see the connections, 
              and understand the geography of your trip. It's about clarity, structure, and the joy of anticipation.
            </p>
          </section>

          <section className="bg-muted/30 p-8 rounded-2xl border">
            <h2 className="text-2xl font-heading font-bold mb-4 text-foreground">Hackathon Origins</h2>
            <p className="mb-4">
              This project was born out of a hackathon, driven by a simple frustration: "Why is it so hard to just map out a trip?"
            </p>
            <p>
              We built this to solve our own problem, and we hope it solves yours too.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
