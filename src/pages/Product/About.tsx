import React from 'react';
import Navbar from '../../components/common/Navbar/Navbar';
import Documentation from './components/Documentation'

interface AboutProps {
  themeChange: () => void;
  theme: string | null;
}

const About: React.FC<AboutProps> = ({ themeChange, theme }) => {

  return (
    <>
      <Navbar themeChange={themeChange} theme={theme} />
      <Documentation />
    </>
  );
}

export default About;
