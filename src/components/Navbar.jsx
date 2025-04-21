import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-teal-500 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-white hover:text-blue-100 transition-colors duration-300">
            FitTrack
          </Link>
          
          <div className="flex space-x-4">
            <Link 
              to="/" 
              className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                isActive('/') 
                  ? 'bg-white text-blue-600 shadow-md' 
                  : 'text-white hover:bg-white hover:bg-opacity-20 hover:shadow-sm'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/log-workout" 
              className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                isActive('/log-workout') 
                  ? 'bg-white text-blue-600 shadow-md' 
                  : 'text-white hover:bg-white hover:bg-opacity-20 hover:shadow-sm'
              }`}
            >
              Log Workout
            </Link>
            <Link 
              to="/progress" 
              className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                isActive('/progress') 
                  ? 'bg-white text-blue-600 shadow-md' 
                  : 'text-white hover:bg-white hover:bg-opacity-20 hover:shadow-sm'
              }`}
            >
              Progress
            </Link>
            <Link 
              to="/settings" 
              className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                isActive('/settings') 
                  ? 'bg-white text-blue-600 shadow-md' 
                  : 'text-white hover:bg-white hover:bg-opacity-20 hover:shadow-sm'
              }`}
            >
              Settings
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 