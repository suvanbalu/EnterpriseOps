import React from 'react';
import { Route, Routes } from 'react-router-dom';
import InventoryScreen from './screens/InventoryScreen';
import UpdateInventoryScreen from './screens/UpdateInventoryScreen';

const InventoryRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<InventoryScreen />} />
      <Route path="update" element={<UpdateInventoryScreen />} />
    </Routes>
  );
};

export default InventoryRoutes;