import React from 'react';
import { Route, Routes } from 'react-router-dom';
import InventoryScreen from './InventoryScreen';
import UpdateInventoryScreen from './UpdateInventoryScreen';

const InventoryRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<InventoryScreen />} />
      <Route path="add" element={<UpdateInventoryScreen />} />
      <Route path="edit/:id" element={<UpdateInventoryScreen />} />
    </Routes>
  );
};

export default InventoryRoutes;