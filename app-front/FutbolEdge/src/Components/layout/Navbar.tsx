import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-blue-500 p-4 flex justify-center">
      <ul className="flex gap-16 ">
        <li className='text-white hover:text-gray-400'>
          <Link to="/" className="">Home</Link>
        </li>
        <li  className='text-white hover:text-gray-400'>
          <Link to="/live" className="">Live Matches</Link>
        </li>
        <li   className='text-white hover:text-gray-400' >
          <Link to="/data" className="">Data Visualization</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
