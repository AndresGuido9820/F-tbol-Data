import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/layout/Navbar';
import Home from './Components/layout/home';
import LiveMatches from './components/layout/Livematch';
import DataVisualization from './components/layout/Data';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <div className="p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/live" element={<LiveMatches />} />
            <Route path="/data" element={<DataVisualization />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;

