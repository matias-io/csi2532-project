import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-blue-600 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          e-Hôtels
        </Link>
        <div className="space-x-4">
          <Link href="/customer" className="hover:text-blue-200">
            Customer
          </Link>
          <Link href="/employee" className="hover:text-blue-200">
            Employee
          </Link>
        </div>
      </div>
    </nav>
  );
}