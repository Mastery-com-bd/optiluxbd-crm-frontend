"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, MapPin, Phone, Sparkles } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  if (pathname?.startsWith("/dashboard")) return null;

  return (
    <footer className="bg-black text-white">
      {/* CTA Section */}
      <div className="bg-black text-center py-12 px-6 border-b border-orange-500">
        <h2 className="text-2xl sm:text-3xl font-semibold leading-relaxed">
          <span className="text-yellow-500">Discover</span> How Our CRM <br />
          Can <span className="text-orange-400">Transform Your Sales</span>
        </h2>
        <div className="mt-6 flex justify-center">
          <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-2 flex gap-2 items-center">
            Start Free Trial <ArrowRight size={16} />
          </Button>
        </div>
      </div>

      {/* Grid & Contact Section */}
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-10 text-sm">
        {/* Brand */}
        <div>
          <h3 className="flex items-center gap-2 font-semibold text-yellow-400 mb-2">
            <Sparkles size={16} /> SalesSync
          </h3>
          <p className="text-gray-300">
            Manage your sales in one place. Automate tasks, get real-time
            insights, and boost your conversion.
          </p>
        </div>

        {/* About Us */}
        <div>
          <h4 className="font-semibold text-orange-400 mb-2">About Us</h4>
          <ul className="space-y-1 text-gray-300">
            <li>Our Story</li>
            <li>Careers</li>
            <li>Partners</li>
            <li>Blog</li>
            <li>Contact</li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h4 className="font-semibold text-orange-400 mb-2">Resources</h4>
          <ul className="space-y-1 text-gray-300">
            <li>Integrations</li>
            <li>Docs</li>
            <li>Sales Tips</li>
            <li>FAQs</li>
            <li>Help Center</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-semibold text-orange-400 mb-2">Contact</h4>
          <ul className="space-y-2 text-gray-300">
            <li className="flex items-center gap-2">
              <Mail size={16} /> info@salesync.com
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} /> +1 (800) 123-4567
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={16} /> New York, USA
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 py-4 px-6 text-center text-xs sm:flex sm:items-center sm:justify-between text-gray-400">
        <p>© {new Date().getFullYear()} SalesSync. All rights reserved.</p>
        <div className="flex gap-4 justify-center sm:justify-end mt-2 sm:mt-0">
          <a href="#" className="hover:underline">
            Terms of Service
          </a>
          <a href="#" className="hover:underline">
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
}
