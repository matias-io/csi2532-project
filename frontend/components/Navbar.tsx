import Link from 'next/link';
import { Button } from '@/components/ui/button'; // Adjust the path based on your project structure

export default function Navbar() {
  return (
    <header className="bg-primary text-primary-foreground py-6 pb-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">HotelConnected</h1>
            <p className="text-sm md:text-base opacity-90">Book rooms across North America's top hotel chains</p>
          </div>
          <div className="flex gap-4">
            <Button variant="secondary" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20 hover:text-white" asChild>
              <Link href="/register">Register</Link>
            </Button>
            <Button variant="destructive" className="bg-red-900 text-white border-red-600 hover:bg-red-600" asChild>
              <Link href="/register">Staff Login</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
);
}