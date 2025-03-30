import Link from 'next/link';
import { Input } from '@/components/ui/input'; // Adjust the path based on your project structure
import { Button } from '@/components/ui/button'; // Adjust the path based on your project structure

export default function Footer() {
  return (
      <footer className="bg-muted py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">HotelConnect</h3>
              <p className="text-muted-foreground text-sm">
                Connecting travelers with the best hotel chains across North America with real-time availability and
                seamless booking.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/hotels" className="text-muted-foreground hover:text-foreground">
                    Browse Hotels
                  </Link>
                </li>
                <li>
                  <Link href="/chains" className="text-muted-foreground hover:text-foreground">
                    Hotel Chains
                  </Link>
                </li>
                <li>
                  <Link href="/deals" className="text-muted-foreground hover:text-foreground">
                    Special Deals
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-muted-foreground hover:text-foreground">
                    About Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/help" className="text-muted-foreground hover:text-foreground">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-muted-foreground hover:text-foreground">
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-muted-foreground hover:text-foreground">
                    Terms & Conditions
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Newsletter</h4>
              <p className="text-sm text-muted-foreground mb-2">Subscribe for special offers and updates</p>
              <div className="flex gap-2">
                <Input placeholder="Your email" className="max-w-[220px]" />
                <Button variant="secondary" size="sm">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} HotelConnect. All rights reserved.</p>
          </div>
        </div>
      </footer>
  );
}