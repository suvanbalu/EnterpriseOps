import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PurchasesScreen from './screens/PurchasesScreen';
import AddEditPurchaseScreen from './screens/AddEditPurchaseScreen';

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