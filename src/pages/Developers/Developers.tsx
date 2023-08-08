import React from 'react';
import Navbar from '../../components/common/Navbar/Navbar';
import Introductions from './components/Introductions'

interface DevelopersProps {
  themeChange: () => void;
  theme: string | null;
}

const Developers: React.FC<DevelopersProps> = ({ themeChange, theme }) => {

  return (
    <>
      <Navbar themeChange={themeChange} theme={theme} />
      <Introductions />
    </>
  );
}

export default Developers;