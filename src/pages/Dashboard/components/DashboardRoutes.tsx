import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Overview from './Overview';
import Classes from './Classes';
import Settings from './Settings';

const DashboardRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Overview />} />
      <Route path="/classes" element={<Classes />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
};

export default DashboardRoutes;