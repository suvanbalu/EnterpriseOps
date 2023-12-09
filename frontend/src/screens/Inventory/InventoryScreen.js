import React from 'react'
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import dummyData from './dummydata.js';
import PageTitle from '../../components/PageTitle';
import CustomButton from '../../components/CustomButton';
import CollapsibleTable from '../../components/CollapsibleTable.js';
import { PRODUCT_URL } from '../../API/calls';

const InventoryScreen = () => {
  const navigate = useNavigate();

  const OuterTable = {
    'Product ID': ['p_id', '15vw'],
    'Product Name': ['productName', '15vw'],
    'Pieces Per Case': ['piecesPerCase', '10vw'],
    'Category': ['category', '10vw'],
    'Price': ['price', '10vw'],
    'Quantity': ['quantity', '10vw'],
    'Unit': ['unit', '5vw'],
    'SGST': ['SGST', '5vw'],
    'CGST': ['CGST', '5vw'],
    'CESS': ['CESS', '5vw'],
  }

  return (
    <div className='pl-4 pr-12 flex flex-col gap-4 w-full'>
      <div className='flex justify-between items-center'>
        <PageTitle title={'All Products'} />
        <CustomButton
          onClick={() => { navigate('/inventory/add') }}
          icon={<IoMdAdd />}
          text={'Add New Product'}
        />
      </div>

      <CollapsibleTable
        data={dummyData}
        OuterTable={OuterTable}
        editUrl={'/products/edit'}
        deleteUrl={`${PRODUCT_URL}/deleteentry`}
      />

    </div>
  )
}

export default InventoryScreen