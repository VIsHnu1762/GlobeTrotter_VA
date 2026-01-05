import { Link, useLocation } from "wouter";
import { Globe, LayoutDashboard, MapPin, Share2, User, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function Navbar() {
  const [location] = useLocation();

  const NavItem = ({ href, icon: Icon, label }: { href: string; icon: any; label: string }) => {
    const isActive = location === href;
    return (
      <Link href={href}>
        <button
          className={cn(
            "group relative flex flex-col items-center gap-1.5 px-4 py-2 rounded-xl transition-all duration-300",
            "hover:bg-white/5",
            isActive && "bg-white/8"
          )}
        >
          <Icon
            className={cn(
              "h-5 w-5 stroke-[1.5] transition-all duration-300",
              isActive ? "text-white" : "text-neutral-400",
              !isActive && "group-hover:text-neutral-200"
            )}
          />
          <span
            className={cn(
              "text-[10px] font-medium tracking-wide uppercase transition-all duration-300",
              isActive ? "text-white" : "text-neutral-500",
              !isActive && "group-hover:text-neutral-300"
            )}
          >
            {label}
          </span>
          {isActive && (
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-white/40 rounded-full" />
          )}
        </button>
      </Link>
    );
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4">
      <div className="w-full max-w-6xl bg-neutral-900/90 backdrop-blur-xl rounded-[24px] shadow-2xl shadow-black/40 border border-white/5">
        <div className="flex items-center justify-between px-6 py-3">
          {/* Left: Brand */}
          <Link href="/">
            <button className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-neutral-700 to-neutral-800 flex items-center justify-center ring-1 ring-white/10 group-hover:ring-white/20 transition-all">
                <Globe className="h-4 w-4 text-neutral-300 stroke-[1.5]" />
              </div>
              <span className="font-heading font-semibold text-base text-white tracking-tight">
                GlobeTrotter
              </span>
            </button>
          </Link>

          {/* Center: Navigation */}
          <div className="hidden md:flex items-center gap-1">
            <NavItem href="/dashboard" icon={LayoutDashboard} label="Dashboard" />
            <NavItem href="/create-trip" icon={MapPin} label="Planner" />
            <NavItem href="/trip/1" icon={Share2} label="Shared" />
          </div>

          {/* Right: User */}
          <div className="flex items-center gap-3">
            <button className="group flex items-center gap-3 px-3 py-1.5 rounded-full hover:bg-white/5 transition-all duration-300">
              <Avatar className="h-8 w-8 ring-1 ring-white/10 group-hover:ring-white/20 transition-all">
                <AvatarFallback className="bg-gradient-to-br from-neutral-700 to-neutral-800 text-neutral-300 text-xs font-medium">
                  VD
                </AvatarFallback>
              </Avatar>
              <div className="hidden lg:flex flex-col items-start">
                <span className="text-xs font-medium text-white leading-none">Vishnu</span>
                <span className="text-[10px] text-neutral-500 leading-none mt-0.5">Traveler</span>
              </div>
              <ChevronDown className="h-3.5 w-3.5 text-neutral-500 group-hover:text-neutral-400 transition-colors" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
