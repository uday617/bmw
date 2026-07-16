import { Facebook, Instagram, Youtube, Linkedin, Twitter } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/Useauth";

function Footer() {
  const { user, logout } = useAuth();

  return (
    <footer className="bg-[hsl(0,0%,100%)] text-black pt-16 pb-10 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">

        {/* Top Newsletter Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pb-10 border-b border-gray-300">
          <div className="flex items-center gap-4">
            <img src="/logo.svg" alt="BMW" className="w-10 h-8 object-contain" />
            <p className="text-lg font-light">
              Stay up to date with the latest news from BMW
            </p>
          </div>

          {user ? (
            <button
              onClick={logout}
              className="mt-6 md:mt-0 flex items-center gap-2 text-lg font-medium hover:underline"
            >
              Logout →
            </button>
          ) : (
            <Link to="/signup" className="mt-6 md:mt-0 flex items-center gap-2 text-lg font-medium hover:underline">
              Sign up →
            </Link>
          )}
        </div>

        {/* Main Grid */}
        <div className="grid md:grid-cols-3 gap-16 py-16">
          <div>
            <h3 className="text-2xl font-light mb-6">Contact & Info</h3>
            <ul className="space-y-4 text-gray-700">
              <li>Customer support</li>
              <li>Online Genius (FAQ)</li>
              <li>Accident Support</li>
              <li>Request for Offer</li>
            </ul>
            <h3 className="text-2xl font-light mt-12 mb-6">Experience BMW</h3>
            <ul className="space-y-4 text-gray-700">
              <li>About us</li>
              <li>BMW careers</li>
              <li>BMW.com</li>
              <li>BMW Group</li>
              <li>BMW Chennai Plant</li>
            </ul>
          </div>

          <div>
            <h3 className="text-2xl font-light mb-6">Assistance & Services</h3>
            <ul className="space-y-4 text-gray-700">
              <li>Book a Service Appointment</li>
              <li>MY BMW App</li>
              <li>Connected Drive</li>
              <li>Warranties</li>
              <li>Remote Software Upgrades</li>
            </ul>
            <h3 className="text-2xl font-light mt-12 mb-6">Choose & Buy</h3>
            <ul className="space-y-4 text-gray-700">
              <li>Build your Own</li>
              <li>New Cars Search</li>
              <li>BMW Financial Services</li>
              <li>Finance & Leasing</li>
              <li>BMW Offers</li>
              <li>Book a Test Drive</li>
            </ul>
          </div>

          <div>
            <h3 className="text-2xl font-light mb-6">Models</h3>
            <ul className="space-y-4 text-gray-700">
              <li>BMW X series</li>
              <li>BMW 7 series</li>
              <li>BMW 5 series</li>
              <li>BMW 3 series</li>
              <li>BMW 2 series</li>
              <li>BMW M series</li>
              <li>BMW Concept Cars</li>
              <li>BMW Protection Vehicles</li>
              <li>GKL Cars</li>
            </ul>
            <h3 className="text-2xl font-light mt-12 mb-6">BMW Electric Cars</h3>
            <ul className="space-y-4 text-gray-700">
              <li>BMW Electric Vehicles</li>
            </ul>
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex justify-end gap-6 pt-6 border-t border-gray-300">
          <Facebook className="w-5 h-5 cursor-pointer hover:opacity-70" />
          <Instagram className="w-5 h-5 cursor-pointer hover:opacity-70" />
          <Youtube className="w-5 h-5 cursor-pointer hover:opacity-70" />
          <Linkedin className="w-5 h-5 cursor-pointer hover:opacity-70" />
          <Twitter className="w-5 h-5 cursor-pointer hover:opacity-70" />
        </div>

      </div>
    </footer>
  );
}

export default Footer;