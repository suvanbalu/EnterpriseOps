import React from 'react';
import { useNavigate, Outlet } from 'react-router-dom';

const Navigation = () => {
  const navigate = useNavigate();

  return (
    <div className='flex flex-row gap-8 p-12 w-screen'>
      <div className='flex flex-col gap-4 p-4 overflow-auto bg-orange-100 rounded-xl'>
        <button className='text-xl font-semibold'>Purchases</button>
        <button className='text-xl font-semibold'>Sales</button>
        <button className='text-xl font-semibold'>Inventory</button>
        <button className='text-xl font-semibold'>Financials</button>
        <button className='text-xl font-semibold'>Parties</button>
        <button className='text-xl font-semibold'>Sales Collection</button>
        <button className='text-xl font-semibold'>Yearly Summary</button>
      </div>

      <div className='p-4 bg-orange-200 rounded-xl'>
        <Outlet />
      </div>
    </div>
  );
};

export default Navigation;