import React, { useState, useEffect } from 'react';

const Home: React.FC = () => {
    const [position, setPosition] = useState(0);
    const [isBlue, setIsBlue] = useState(false);
  
    const handleClick = () => {
      setPosition(position === 0 ? 100 : 0); // Mover el cuadrado
      setIsBlue(!isBlue); // Cambiar el color
    };
  
    return (
      <div className="flex items-center justify-center h-screen">
        <div
          className={`w-20 h-20 rounded-full bg-${isBlue ? 'blue-500' : 'red-500'} transition-all duration-500`}
          style={{ transform: `translateX(${position}px)` }}
        ></div>
        <button
          onClick={handleClick}
          className="ml-4 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-600 transition"
        >
          Animate
        </button>
      </div>
    );
};

export default Home;
