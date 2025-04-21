import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import LogWorkout from './pages/LogWorkout';
import Progress from './pages/Progress';
import Settings from './pages/Settings';
import { WorkoutProvider } from './context/WorkoutContext';

function App() {
  return (
    <WorkoutProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/log-workout" element={<LogWorkout />} />
              <Route path="/progress" element={<Progress />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
        </div>
      </Router>
    </WorkoutProvider>
  );
}

export default App; 