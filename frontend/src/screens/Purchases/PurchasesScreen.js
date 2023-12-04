import React, { useEffect, useState } from 'react'
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import CollapsibleTable from '../../components/CollapsibleTable';
import dummyData from '../../components/dummyData';
import PageTitle from '../../components/PageTitle';
import CustomButton from '../../components/CustomButton';
import axios from 'axios';
import { PURCHASE_URL } from '../../API/calls';

const PurchasesScreen = () => {
  const navigate = useNavigate();
  const [fetchedData, setFetchedData] = useState([]);

  useEffect(() => {
    axios.get(`${PURCHASE_URL}/get-all-entry`)
      .then((res) => {
        console.log(res);
        setFetchedData(res.data);
      })
  }, [])

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

      <CollapsibleTable data={fetchedData} />

    </div>
  )
}

export default PurchasesScreen