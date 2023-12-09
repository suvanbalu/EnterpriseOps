import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SalesCollectionScreen from './SalesCollectionScreen';
import AddEditSalesCollectionScreen from './AddEditSalesCollectionScreen';

const SalesCollectionRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<SalesCollectionScreen />} />
      <Route path="add" element={<AddEditSalesCollectionScreen />} />
      <Route path="edit/:id" element={<AddEditSalesCollectionScreen />} />
    </Routes>
  );
};

export default SalesCollectionRoutes;