import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Overview from './Overview';
import Inbox from './Inbox';

const ParentDashboardRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Overview />} />
      <Route path="/inbox" element={<Inbox />} />
    </Routes>
  );
};

export default ParentDashboardRoutes;