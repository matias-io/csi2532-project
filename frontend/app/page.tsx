import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to e-Hôtels</h1>
          <p className="text-lg mb-8">Please select your role to continue:</p>
          <div className="space-x-4">
            <a
              href="/login"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Login as Customer
            </a>
            <a
              href="/login"
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition duration-300"
            >
              Login as Employee
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}