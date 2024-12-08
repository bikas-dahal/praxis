"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function HeroSection() {
  return (
    <section id="about" className="relative min-h-screen flex items-center">
      <div 
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1605640840605-14ac1855827b')] bg-cover bg-center opacity-10" 
        style={{ backgroundPosition: "50% 30%" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-background/10" />
      
      <div className="container mx-auto px-4 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block mb-4 px-4 py-2 bg-primary/10 rounded-full">
              <span className="text-primary font-medium">Welcome to Praxis</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Empowering Nepal&apos;s
              <span className="block text-primary">Future Professionals</span>
            </h1>
            <div className="text-xl text-muted-foreground mb-8">
              Join Nepal&apos;s premier platform for professional exam preparation. 
              We combine traditional wisdom with modern technology to help you 
              achieve excellence in your career journey.
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="group" asChild>
              <Link href="/auth/register">
                <span className="flex items-center">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/about">Learn More</Link>
            </Button>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative h-[600px] w-full">
              <Image
                src="https://plus.unsplash.com/premium_photo-1661677961956-719597b56ea0?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Students studying in Nepal"
                fill
                className="object-cover rounded-2xl shadow-2xl"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}