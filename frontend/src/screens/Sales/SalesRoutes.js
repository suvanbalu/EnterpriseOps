import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SalesScreen from './SalesScreen';
import AddEditSalesScreen from './AddEditSalesScreen';

const SalesRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<SalesScreen />} />
      <Route path="add" element={<AddEditSalesScreen />} />
      <Route path="edit/:id" element={<AddEditSalesScreen />} />
    </Routes>
  );
};

export default SalesRoutes;