import React, { useEffect, useState } from 'react'
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import CollapsibleTable from '../../components/CollapsibleTable';
import PageTitle from '../../components/PageTitle';
import CustomButton from '../../components/CustomButton';
import axios from 'axios';
import { SALES_COLLECTION_URL } from '../../API/calls';

const SalesCollectionScreen = () => {
  const navigate = useNavigate();
  const [fetchedData, setFetchedData] = useState([]);

  useEffect(() => {
    axios.get(`${SALES_COLLECTION_URL}/get-collections`)
      .then((res) => {
        res.data.forEach(element => {
          element?.details?.forEach(item => {
            item['sc_id'] = 'C' + String(item['sc_id']).padStart(3, '0');
          })
        })

        setFetchedData(res.data);
      })
  }, [])

  const OuterTable = {
    'Bill Number': ['_id', '15vw'],
    'PSR': ['psr', '15vw'],
    // 'Total Amount Collected': ['totalAmount', '15vw'],
    // 'Remaining Credit': ['credit', '15vw'],
  }

  const InnerTable = {
    'Collection ID': ['sc_id', '15vw'],
    'Date': ['date', '15vw'],
    'Amount Collected': ['amountCollected', '15vw'],
    'Type': ['type', '15vw'],
  }

  const metadataFunction = (data) => {
    const totalSalesAmount = data.reduce((sum, row) => {
      const rowAmount = parseFloat(row.totalAmount);
      return isNaN(rowAmount) ? sum : sum + rowAmount;
    }, 0);

    return `Rs. ${totalSalesAmount}`;
  }

  const metadataFunction2 = (data) => {
    const totalCredit = data.reduce((sum, row) => {
      const rowAmount = parseFloat(row.credit);
      return isNaN(rowAmount) ? sum : sum + rowAmount;
    }, 0);

    return `Rs. ${totalCredit}`;
  }

  return (
    <div className='pl-4 pr-12 flex flex-col gap-4 w-full -mt-16'>
      <div className='flex justify-between'>
        <PageTitle title={'All Sales Collections'} className={'w-1/2 text-right'} />
        <CustomButton
          onClick={() => { navigate('/sales/add') }}
          icon={<IoMdAdd />}
          text={'Add New Sales Collection'}
        />
      </div>

      <CollapsibleTable
        data={fetchedData}
        OuterTable={OuterTable}
        InnerTable={InnerTable}
        editUrl={'/sale/edit'}
        deleteUrl={`${SALES_COLLECTION_URL}/delete-sale`}
        innerTableTitle={'Sales Details'}
        metadataTitle={'Total Amount Collected'}
        metadataFunction={metadataFunction}
        metadataTitle2={'Remaining Credit'}
        metadataFunction2={metadataFunction2}
      />

    </div>
  )
}

export default SalesCollectionScreen