import React from 'react';
import Navbar from '../../components/common/Navbar/Navbar';
import Columns from './components/Columns'

interface PricingProps {
  themeChange: () => void;
  theme: string | null;
}

const Pricing: React.FC<PricingProps> = ({ themeChange, theme }) => {

  return (
    <>
      <Navbar themeChange={themeChange} theme={theme} />
      <Columns />
    </>
  );
}

export default Pricing;