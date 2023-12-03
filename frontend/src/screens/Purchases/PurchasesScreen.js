import React from 'react'
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import CollapsibleTable from '../../components/CollapsibleTable';

const PurchasesScreen = () => {
  const navigate = useNavigate();

  const dummyData = [
    {
      billNumber: 'B001',
      date: '2023-04-01',
      totalAmount: 150.75,
      details: [
        {
          productId: 'P001',
          productName: 'Product A',
          quantity: 2,
          rate: 25.50,
          amount: 51.00,
        },
        {
          productId: 'P002',
          productName: 'Product B',
          quantity: 3,
          rate: 12.75,
          amount: 38.25,
        },
      ],
    },
    {
      billNumber: 'B002',
      date: '2023-04-02',
      totalAmount: 120.50,
      details: [
        {
          productId: 'P003',
          productName: 'Product C',
          quantity: 4,
          rate: 18.25,
          amount: 73.00,
        },
        {
          productId: 'P004',
          productName: 'Product D',
          quantity: 1,
          rate: 47.50,
          amount: 47.50,
        },
      ],
    },
    // Add more dummy data as needed
  ];

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