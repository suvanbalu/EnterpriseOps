import React from 'react';
import { Route, Routes } from 'react-router-dom';
import EmployeeScreen from './EmployeeScreen';
import UpdateEmployeeScreen from './UpdateEmployeeScreen';

const EmployeeRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<EmployeeScreen />} />
      <Route path="add" element={<UpdateEmployeeScreen />} />
      <Route path="edit/:id" element={<UpdateEmployeeScreen />} />
    </Routes>
  );
};

export default EmployeeRoutes;