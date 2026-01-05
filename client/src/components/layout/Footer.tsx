import { Globe, Github, Twitter } from "lucide-react";
import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-muted/30 border-t mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/">
              <a className="flex items-center gap-2 font-heading font-bold text-xl text-primary mb-4">
                <Globe className="h-6 w-6" />
                <span>GlobeTrotter</span>
              </a>
            </Link>
            <p className="text-muted-foreground max-w-sm">
              A planner-first travel platform designed to help you visualize your journey before you book. Built for explorers, by explorers.
            </p>
          </div>

          <div>
            <h3 className="font-heading font-semibold mb-4">Explore</h3>
            <ul className="space-y-2">
              <li><Link href="/dashboard"><a className="text-muted-foreground hover:text-primary transition-colors">Dashboard</a></Link></li>
              <li><Link href="/create-trip"><a className="text-muted-foreground hover:text-primary transition-colors">Start Planning</a></Link></li>
              <li><Link href="/about"><a className="text-muted-foreground hover:text-primary transition-colors">About</a></Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold mb-4">Connect</h3>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Twitter className="h-5 w-5" /></a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Github className="h-5 w-5" /></a>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              © {new Date().getFullYear()} GlobeTrotter Inc.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
