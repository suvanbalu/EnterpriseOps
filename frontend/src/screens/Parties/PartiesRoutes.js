import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PartiesScreen from './PartiesScreen';
import UpdatePartiesScreen from './UpdatePartiesScreen';

const PartiesRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PartiesScreen />} />
      <Route path="add" element={<UpdatePartiesScreen />} />
      <Route path="edit/:id" element={<UpdatePartiesScreen />} />
    </Routes>
  );
};

export default PartiesRoutes;