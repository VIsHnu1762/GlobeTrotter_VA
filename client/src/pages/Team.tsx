import { Github, Linkedin, Mail } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function Team() {
  const team = [
    {
      name: "Vishnu Dharshan",
      role: "Co-Creator & Developer",
      bio: "Passionate about building intuitive user interfaces and solving real-world problems through code.",
      initials: "VD",
      color: "bg-blue-500"
    },
    {
      name: "Amalraajan",
      role: "Co-Creator & Designer",
      bio: "Focused on creating seamless user experiences and visual storytelling.",
      initials: "AM",
      color: "bg-emerald-500"
    }
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 text-center max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">Meet the Team</h1>
        <p className="text-xl text-muted-foreground mb-16">
          The duo behind GlobeTrotter, working together to reimagine travel planning.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {team.map((member) => (
            <Card key={member.name} className="overflow-hidden hover:shadow-xl transition-shadow border-0 shadow-lg group">
              <div className={`h-32 ${member.color} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
              </div>
              <CardContent className="pt-0 relative">
                <div className="absolute -top-12 left-1/2 -translate-x-1/2">
                  <div className="h-24 w-24 rounded-full border-4 border-background bg-muted flex items-center justify-center text-2xl font-bold text-muted-foreground shadow-sm">
                    {member.initials}
                  </div>
                </div>
                
                <div className="mt-16 text-center">
                  <h2 className="text-2xl font-heading font-bold mb-1">{member.name}</h2>
                  <p className="text-primary font-medium mb-4">{member.role}</p>
                  <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                    {member.bio}
                  </p>
                  
                  <div className="flex justify-center gap-4">
                    <ButtonIcon icon={<Github className="h-5 w-5" />} />
                    <ButtonIcon icon={<Linkedin className="h-5 w-5" />} />
                    <ButtonIcon icon={<Mail className="h-5 w-5" />} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

function ButtonIcon({ icon }: { icon: React.ReactNode }) {
  return (
    <button className="p-2 rounded-full bg-muted/50 hover:bg-primary/10 hover:text-primary transition-colors">
      {icon}
    </button>
  );
}
