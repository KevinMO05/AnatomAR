import React, { useRef } from 'react';
import Navbar from './components/navbar';
import HeroSection from './components/hero_section';
import AnatomyViewer from './components/anatom_viewer';

function App() {
  const exploracionRef = useRef(null);

  const scrollToExploration = () => {
    exploracionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <HeroSection onExplorarClick={scrollToExploration} />
      <div ref={exploracionRef}>
        <AnatomyViewer />
      </div>
    </div>
  );
}

export default App;
