import { useState } from 'react';
import './App.css';
import { LeftComp, RightComp } from './components';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div 
      className="w-screen h-screen bg-zinc-800 flex p-10 gap-10 justify-center items-center relative overflow-hidden"
    >
      <div 
        className="
          absolute top-10 left-1/3 w-[400px] h-[400px] 
          bg-purple-400/30 rounded-full blur-3xl opacity-50
          animate-float
        "
      />

      <div 
        className="
          absolute bottom-10 right-10 w-[200px] h-[200px] 
          bg-pink-300/20 rounded-full blur-2xl opacity-30 
          animate-pulse-slow
        "
      />

      <div 
        className="
          w-1/2 h-full 
          bg-white/10 backdrop-blur-lg border border-white/20 
          rounded-2xl p-10 flex flex-col items-center gap-10 
          shadow-2xl transition-all duration-500 ease-in-out 
          hover:scale-105 hover:shadow-3xl sm:w-full
          animate-slide-in
        "
      >
        <LeftComp />
      </div>

      <div 
        className="
          w-1/2 h-full 
          bg-white/10 backdrop-blur-lg border border-white/20 
          rounded-2xl p-10 flex flex-col items-center gap-10 
          shadow-2xl transition-all duration-500 ease-in-out 
          hover:scale-105 hover:shadow-3xl sm:w-full
          animate-slide-in
        "
      >
        <RightComp />
      </div>
    </div>

  );
}

export default App;
