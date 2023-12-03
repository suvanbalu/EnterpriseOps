import React from 'react'
import { IoMdAdd } from "react-icons/io";
import PurchaseTable from './PurchaseTable';
import { useNavigate } from 'react-router-dom';

const PurchasesScreen = () => {
  const navigate = useNavigate();

  return (
    <div className='px-8 flex flex-col gap-4 w-full'>
      <div className='flex justify-between items-center'>
        <p className='text-2xl text-orange-700 font-semibold'>All Purchases</p>
        <button
          className='flex flex-row gap-2 items-center text-lg font-semibold rounded-xl text-orange-700 bg-orange-50 w-fit px-4 py-3 shadow-md'
          onClick={() => {
            navigate('/purchases/add')
          }}
        >
          <IoMdAdd />
          {'Add New Purchase'}
        </button>
      </div>
      <PurchaseTable />
    </div>
  )
}

export default PurchasesScreen