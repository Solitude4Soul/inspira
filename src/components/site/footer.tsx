import Link from "next/link";
import { Twitter, Instagram, Linkedin } from "lucide-react";
import { Logo } from "@/components/site/logo";
import { Button } from "../ui/button";

const footerNavs = [
  { href: '/about', name: 'About' },
  { href: '/why-us', name: 'Why Us' },
  { href: '/for-creators', name: 'For Creators' },
  { href: '/for-brands', name: 'For Brands' },
  { href: '/contact', name: 'Contact' },
  { href: '/privacy-policy', name: 'Privacy Policy' },
  { href: '/terms-of-service', name: 'Terms of Service' },
]

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="flex flex-col items-center gap-4 md:items-start">
            <Logo />
            <p className="max-w-md text-center text-sm text-muted-foreground md:text-left">
              Building the most trusted creator marketplace.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-3 md:text-left">
            <div>
              <h4 className="font-semibold">Company</h4>
              <ul className="mt-2 space-y-2">
                {footerNavs.slice(0, 5).map(item => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-muted-foreground hover:text-primary">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold">Legal</h4>
              <ul className="mt-2 space-y-2">
                {footerNavs.slice(5).map(item => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-muted-foreground hover:text-primary">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
             <div>
              <h4 className="font-semibold">Follow Us</h4>
              <div className="mt-2 flex justify-center gap-2 md:justify-start">
                <Button variant="ghost" size="icon" asChild>
                  <a href="#" aria-label="Twitter">
                    <Twitter className="h-5 w-5"/>
                  </a>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <a href="#" aria-label="Instagram">
                    <Instagram className="h-5 w-5"/>
                  </a>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <a href="#" aria-label="LinkedIn">
                    <Linkedin className="h-5 w-5"/>
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Inspira. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
