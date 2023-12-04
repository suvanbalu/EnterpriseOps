import React from 'react'
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import CollapsibleTable from '../../components/CollapsibleTable';
import dummyData from '../../components/dummyData';

const PurchasesScreen = () => {
  const navigate = useNavigate();

  return (
    <div className='pl-4 pr-12 flex flex-col gap-4 w-full'>
      <div className='flex justify-between items-center'>
        <p className='text-3xl text-orange-700 font-semibold'>All Purchases</p>
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
      
      <CollapsibleTable data={dummyData} />

    </div>
  )
}

export default PurchasesScreen