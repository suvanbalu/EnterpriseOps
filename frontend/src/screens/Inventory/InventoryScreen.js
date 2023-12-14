import React, { useEffect, useState } from 'react'
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import PageTitle from '../../components/PageTitle';
import CustomButton from '../../components/CustomButton';
import CollapsibleTable from '../../components/CollapsibleTable.js';
import { PRODUCT_URL } from '../../API/calls';
import axios from 'axios';

const InventoryScreen = () => {
  const navigate = useNavigate();
  const [fetchedData, setFetchedData] = useState([]);

  useEffect(() => {
    axios.get(`${PRODUCT_URL}/get-products`)
      .then((res) => {
        setFetchedData(res.data);
      })
  }, [])

  const OuterTable = {
    'Product ID': ['p_id', '15vw'],
    'Product Name': ['productName', '15vw'],
    'Pieces Per Case': ['piecesPerCase', '10vw'],
    'Category': ['category', '10vw'],
    'Sales Rate': ['salesRate', '5vw'],
    'MRP': ['price', '5vw'],
    'Quantity': ['quantity', '5vw'],
    'Unit': ['unit', '5vw'],
    'GST': ['GST', '5vw'],
    'CESS': ['CESS', '5vw'],
  }

  return (
    <div className='pl-4 pr-12 flex flex-col gap-4 w-full -mt-16'>
      <div className='flex justify-between'>
        <PageTitle title={'All Products'} className={'w-1/2 text-right'} />
        <CustomButton
          onClick={() => { navigate('/inventory/add') }}
          icon={<IoMdAdd />}
          text={'Add New Product'}
        />
      </div>

      <CollapsibleTable
        data={fetchedData}
        OuterTable={OuterTable}
        editUrl={'/inventory/edit'}
        deleteUrl={`${PRODUCT_URL}/delete-product`}
      />

    </div>
  )
}

export default InventoryScreen