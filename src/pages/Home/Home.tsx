import React from 'react';
import Navbar from '../../components/common/Navbar/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';


interface HomeProps {
  themeChange: () => void;
  theme: string | null;
}

const Home: React.FC<HomeProps> = ({ themeChange, theme }) => {

  return (
    <>
      {/* Pass the themeChange prop down to the Navbar component */}
      <Navbar themeChange={themeChange} theme={theme} />
      <Hero />
      <Features />
      {/* Other components or content of Home */}
    </>
  );
}

export default Home;