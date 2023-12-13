import React, { useEffect, useState } from 'react'
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import PageTitle from '../../components/PageTitle';
import CustomButton from '../../components/CustomButton';
import CollapsibleTable from '../../components/CollapsibleTable.js';
import { FINANCIALS_URL } from '../../API/calls';
import axios from 'axios';

const FinancialScreen = () => {
  const navigate = useNavigate();
  const [fetchedData, setFetchedData] = useState([]);

  useEffect(() => {
    axios.get(`${FINANCIALS_URL}/get-financial`)
      .then((res) => {
        setFetchedData(res.data);
      })
  }, [])

  const OuterTable = {
    'Date': ['date', '15vw'],
    'Description': ['description', '20vw'],
    'Amount': ['amount', '10vw'],
    'Category': ['category', '10vw'],
    'Txn Type': ['txn_type', '10vw'],
  }

  return (
    <div className='pl-4 pr-12 flex flex-col gap-4 w-full -mt-16'>
      <div className='flex justify-between'>
        <PageTitle title={'All Records'} className={'w-1/2 text-right'} />
        <CustomButton
          onClick={() => { navigate('/inventory/add') }}
          icon={<IoMdAdd />}
          text={'Add New Data'}
        />
      </div>

      <CollapsibleTable
        data={fetchedData}
        OuterTable={OuterTable}
        editUrl={'/financials/edit'}
        deleteUrl={`${FINANCIALS_URL}/delete-financial`}
      />
    </div>
  )
}

export default FinancialScreen
