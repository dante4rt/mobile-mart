import { Link } from "react-router-dom";
import { Smartphone } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold flex items-center">
          <Smartphone className="mr-2 h-8 w-8" /> MobileMart
        </Link>
      </div>
    </nav>
  );
}
