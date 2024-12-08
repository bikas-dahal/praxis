"use client";

import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About Praxis</h3>
            <div className="text-muted-foreground">
              Empowering Nepal&apos; future professionals through comprehensive exam preparation
              and continuous learning support.
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/courses" className="text-muted-foreground hover:text-primary transition-colors">
                  Courses
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-5 w-5" />
                <span>Kathmandu, Nepal</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-5 w-5" />
                <span>+977 1234567890</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-5 w-5" />
                <span>info@praxis.edu.np</span>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <FaFacebook className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <FaTwitter className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <FaInstagram className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <FaLinkedinIn className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-muted-foreground text-sm">
              © {2024} Praxis. All rights reserved.
            </div>
            <div className="flex gap-4 text-sm">
              <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}