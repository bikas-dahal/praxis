"use client";

import { motion } from "framer-motion";
import { BookOpen, Users, MessageCircle, TrendingUp } from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Study Resources",
    description: "Access comprehensive study materials curated by experts"
  },
  {
    icon: Users,
    title: "Community Learning",
    description: "Join study groups and learn together with peers"
  },
  {
    icon: MessageCircle,
    title: "Expert Guidance",
    description: "Get mentorship from experienced professionals"
  },
  {
    icon: TrendingUp,
    title: "Track Progress",
    description: "Monitor your improvement with detailed analytics"
  }
];

export function FeaturesGrid() {
  return (
    <section id="features" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Praxis?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We provide the tools and support you need to excel in your professional journey
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              Icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ Icon, title, description, index }: { 
  Icon: any; 
  title: string; 
  description: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-card p-6 rounded-lg shadow-lg border border-border hover:border-primary/50 transition-all"
    >
      <div className="text-primary mb-4">
        <Icon className="h-8 w-8" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </motion.div>
  );
}