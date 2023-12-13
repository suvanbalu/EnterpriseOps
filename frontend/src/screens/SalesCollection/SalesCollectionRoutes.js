import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SalesCollectionScreen from './SalesCollectionScreen';
import AddSalesCollectionScreen from './AddSalesCollectionScreen';
import EditSalesCollection from './EditSalesCollection';

const SalesCollectionRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<SalesCollectionScreen />} />
      <Route path="add" element={<AddSalesCollectionScreen />} />
      <Route path="edit/:id" element={<EditSalesCollection />} />
    </Routes>
  );
};

export default SalesCollectionRoutes;