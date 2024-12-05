"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <a href="/" className="text-2xl font-bold text-primary">Praxis</a>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <NavLink href="#about">About</NavLink>
            <NavLink href="#features">Features</NavLink>
            <NavLink href="/dashboard/blogs">Blogs</NavLink>
            <NavLink href="#contact">Contact</NavLink>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden pb-4"
          >
            <div className="flex flex-col space-y-4">
              <MobileNavLink href="#about" onClick={() => setIsOpen(false)}>About</MobileNavLink>
              <MobileNavLink href="#features" onClick={() => setIsOpen(false)}>Features</MobileNavLink>
              <MobileNavLink href="/dashboard/blogs" onClick={() => setIsOpen(false)}>Blogs</MobileNavLink>
              <MobileNavLink href="#contact" onClick={() => setIsOpen(false)}>Contact</MobileNavLink>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a 
      href={href}
      className="text-muted-foreground hover:text-primary transition-colors"
    >
      {children}
    </a>
  );
}

function MobileNavLink({ href, onClick, children }: { href: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <a 
      href={href}
      onClick={onClick}
      className="text-muted-foreground hover:text-primary transition-colors block px-4 py-2"
    >
      {children}
    </a>
  );
}