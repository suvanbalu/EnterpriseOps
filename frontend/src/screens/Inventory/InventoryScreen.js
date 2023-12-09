import React from 'react'
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import InventoryTable from './inventoryTable';
import dummyData from './dummydata.js';
import PageTitle from '../../components/PageTitle';
import CustomButton from '../../components/CustomButton';

const InventoryScreen = () => {
  const navigate = useNavigate();

  return (
    <div className='pl-4 pr-12 flex flex-col gap-4 w-full'>
      <div className='flex justify-between items-center'>
        <PageTitle title={'All Purchases'} />
        <CustomButton
          onClick={() => { navigate('/purchases/add') }}
          icon={<IoMdAdd />}
          text={'Add New Purchase'}
        />
      </div>

      <InventoryTable data={dummyData} />

    </div>
  )
}

export default InventoryScreen