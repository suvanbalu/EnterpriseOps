import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PurchasesScreen from './PurchasesScreen';
import AddEditPurchaseScreen from './AddEditPurchaseScreen';

const PurchasesRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PurchasesScreen />} />
      <Route path="add" element={<AddEditPurchaseScreen />} />
      <Route path="edit/:id" element={<AddEditPurchaseScreen />} />
    </Routes>
  );
};

export default PurchasesRoutes;