"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Facebook, Instagram, Twitter, Linkedin, Youtube } from "lucide-react";
import FooterLight from "@/components/svgIcon/FooterLight";

export default function Footer() {
  const pathname = usePathname();

  if (
    pathname?.startsWith("/dashboard") ||
    pathname?.startsWith("/login") ||
    pathname?.startsWith("/register")
  )
    return null;

  const footerLinks = {
    company: [
      { name: "Homepage", href: "/" },
      { name: "Contact Us", href: "/contact" },
      { name: "Sign In", href: "/login" },
      { name: "Sign Up", href: "/register" },
    ],
    solutions: [
      { name: "Advanced Prompts", href: "#" },
      { name: "Documentation", href: "#" },
      { name: "How It Works", href: "#" },
      { name: "Media Kit", href: "#" },
    ],
    resources: [
      { name: "Blog", href: "#" },
      { name: "Blog Single", href: "#" },
      { name: "Case Studies", href: "#" },
      { name: "Case Studies Single", href: "#" },
    ],
    aboutUs: [
      { name: "Our Patents", href: "#" },
      { name: "Our Services", href: "#" },
      { name: "Our Story", href: "#" },
      { name: "Our Team", href: "#" },
    ],
  };

  return (
    <footer className=" text-white pt-20 pb-10 px-6 md:px-12 lg:px-20 relative overflow-hidden">
      <FooterLight />
      <div className="max-w-[1440px] mx-auto relative z-10">

        {/* Main Grid Section */}
        <div className="flex justify-between gap-12 mb-16">
          {/* Brand & Contact Info */}
          <div className="lg:col-span-1 space-y-6 w-[30%]">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-orange-400 rounded-lg flex items-center justify-center">
                {/* Logo Icon */}
                <div className="w-4 h-4 border-2 border-white rotate-45" />
              </div>
              <span className="text-2xl font-bold tracking-tight">Optilux</span>
            </div>

            <div className="space-y-4 text-[#9B98AE] text-sm leading-relaxed">
              <div>
                <p className="font-semibold text-white mb-1">Address:</p>
                <p >3760 West Drive, Chicago, IL 60606</p>
              </div>
              <div>
                <p className="font-semibold text-white mb-1">Contact:</p>
                <p>319-270-8254</p>
                <p>contact@synthmind.com</p>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex gap-4 text-[#9B98AE]">
              <Facebook size={20} className="hover:text-white cursor-pointer transition-colors" />
              <Instagram size={20} className="hover:text-white cursor-pointer transition-colors" />
              <Twitter size={20} className="hover:text-white cursor-pointer transition-colors" />
              <Linkedin size={20} className="hover:text-white cursor-pointer transition-colors" />
              <Youtube size={20} className="hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Links Sections */}
          <div className="lg:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-8 w-[70%] justify-end">
            {/* Company */}
            <div className="">
              <h4 className="text-sm font-bold uppercase tracking-widest mb-6 text-gray-200">Company</h4>
              <ul className="space-y-4 text-sm text-[#9B98AE]">
                {footerLinks.company.map((link) => (
                  <li key={link.name}><Link href={link.href} className="hover:text-white transition-colors">{link.name}</Link></li>
                ))}
              </ul>
            </div>

            {/* Solutions */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-widest mb-6 text-gray-200">Solutions</h4>
              <ul className="space-y-4 text-sm text-[#9B98AE]">
                {footerLinks.solutions.map((link) => (
                  <li key={link.name}><Link href={link.href} className="hover:text-white transition-colors">{link.name}</Link></li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-widest mb-6 text-gray-200">Resources</h4>
              <ul className="space-y-4 text-sm text-[#9B98AE]">
                {footerLinks.resources.map((link) => (
                  <li key={link.name}><Link href={link.href} className="hover:text-white transition-colors">{link.name}</Link></li>
                ))}
              </ul>
            </div>

            {/* About Us */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-widest mb-6 text-gray-200">About Us</h4>
              <ul className="space-y-4 text-sm text-[#9B98AE]">
                {footerLinks.aboutUs.map((link) => (
                  <li key={link.name}><Link href={link.href} className="hover:text-white transition-colors">{link.name}</Link></li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8   flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Optilux BD. All rights reserved</p>
          <div className="flex gap-8">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}