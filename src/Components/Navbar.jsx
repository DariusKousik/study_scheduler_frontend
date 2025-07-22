import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <h1 className="text-xl font-bold text-indigo-600">Study Scheduler</h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-4">
          <Link to="/" className="text-gray-700 hover:text-indigo-500">Dashboard</Link>
          <Link to="/scheduler" className="text-gray-700 hover:text-indigo-500">Scheduler</Link>
          <Link to="/progress" className="text-gray-700 hover:text-indigo-500">Progress</Link>
          <Link to="/profile" className="text-gray-700 hover:text-indigo-500">Profile</Link>
        </div>

        {/* Hamburger Icon */}
        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white px-6 pb-4 space-y-2 shadow">
          <Link to="/" className="block text-gray-700 hover:text-indigo-500">Dashboard</Link>
          <Link to="/scheduler" className="block text-gray-700 hover:text-indigo-500">Scheduler</Link>
          <Link to="/progress" className="block text-gray-700 hover:text-indigo-500">Progress</Link>
          <Link to="/profile" className="block text-gray-700 hover:text-indigo-500">Profile</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
