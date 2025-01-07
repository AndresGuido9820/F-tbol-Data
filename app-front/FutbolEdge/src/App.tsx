import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/layout/Navbar';
import Home from './Components/layout/Home';
import LiveMatches from './Components/layout/Livematch';
import DataVisualization from './Components/layout/Data';

const App: React.FC = () => {
  return (
    <Router>
      <div className='overflow-hidden'>
        <Navbar />
        <div className="">
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

