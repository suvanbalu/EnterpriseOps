import React from 'react';
import { Route, Routes } from 'react-router-dom';
import FinancialScreen from './FinancialScreen';
import UpdateFinancialScreen from './UpdateFinancialScreen';

const FinancialRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<FinancialScreen />} />
      <Route path="add" element={<UpdateFinancialScreen />} />
      <Route path="edit/:id" element={<UpdateFinancialScreen />} />
    </Routes>
  );
};

export default FinancialRoutes;