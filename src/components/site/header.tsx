"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Logo } from "@/components/site/logo";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/why-us", label: "Why Us" },
  { href: "/for-creators", label: "For Creators" },
  { href: "/for-brands", label: "For Brands" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check on initial load
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const NavLink = ({ href, label }: { href: string; label: string }) => (
    <Link
      href={href}
      className={cn(
        "relative rounded-md px-3 py-2 text-sm font-medium transition-colors",
        pathname === href
          ? "text-foreground"
          : "text-muted-foreground hover:text-foreground"
      )}
    >
      {label}
       {pathname === href && (
        <span className="absolute bottom-0 left-1/2 h-[2px] w-5 -translate-x-1/2 rounded-full bg-primary transition-all duration-300" />
      )}
    </Link>
  );

  const MobileNavLink = ({ href, label }: { href: string; label: string }) => (
    <SheetClose asChild>
      <Link
        href={href}
        className={cn(
          "block rounded-lg px-4 py-3 text-base font-medium transition-colors",
          pathname === href
            ? "bg-muted text-primary"
            : "text-foreground hover:bg-muted"
        )}
      >
        {label}
      </Link>
    </SheetClose>
  );

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-200",
        isScrolled || isMobileMenuOpen
          ? "border-b bg-background/90 backdrop-blur-sm"
          : "border-b border-transparent"
      )}
    >
      <div className="container flex h-20 items-center justify-between">
        <div className="flex items-center gap-2">
            {/* Desktop Logo */}
            <div className="hidden lg:block">
                <Logo />
            </div>
            {/* This is a spacer to balance the mobile menu button on the right */}
            <div className="w-10 lg:hidden" />
        </div>

        {/* Mobile Logo */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 lg:hidden">
             <Logo />
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex lg:items-center lg:gap-1">
            {navLinks.map((link) => (
              <NavLink key={link.href} {...link} />
            ))}
        </nav>

        {/* Right side items */}
        <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-2">
                <Button variant="secondary" size="sm" asChild>
                  <Link href="/contact?type=brand">I am a Brand</Link>
                </Button>
                <Button
                  size="sm"
                  asChild
                  className="bg-gradient-to-r from-primary to-secondary text-primary-foreground"
                >
                  <Link href="/contact?type=creator">I am a Creator</Link>
                </Button>
            </div>
            
            {/* Mobile Menu */}
            <div className="lg:hidden">
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle Menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-full max-w-xs p-6">
                  <div className="mb-8">
                      <Logo />
                  </div>
                  <nav className="flex flex-col space-y-2">
                    {navLinks.map((link) => (
                      <MobileNavLink key={link.href} {...link} />
                    ))}
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
        </div>
      </div>
    </header>
  );
}
