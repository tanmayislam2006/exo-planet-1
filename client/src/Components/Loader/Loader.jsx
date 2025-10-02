import React from 'react';

const Loader = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="relative overflow-hidden outline outline-primary outline-offset-2 rounded-full p-1 w-48 h-4 bg-white">
        <div
          className="absolute top-0 left-0 h-full bg-primary z-10 rounded-full"
          style={{
            animation: 'loading .75s linear infinite'
          }}
        ></div>
        <style>{`
          @keyframes loading {
            0% { width: 0%; }
            100% { width: 100%; }
          }
        `}</style>
      </div>
    </div>
  );
};

export default Loader;