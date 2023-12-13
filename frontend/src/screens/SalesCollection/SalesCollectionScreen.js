import React, { useEffect, useState } from 'react'
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import CollapsibleTable from '../../components/CollapsibleTable';
import PageTitle from '../../components/PageTitle';
import CustomButton from '../../components/CustomButton';
import { BsCalendar4Week } from "react-icons/bs";
import { FiHash } from "react-icons/fi";
import axios from 'axios';
import { SALES_COLLECTION_URL } from '../../API/calls';

const SalesCollectionScreen = () => {
  const navigate = useNavigate();
  const [fetchedData, setFetchedData] = useState([]);
  const [billViewMode, setBillViewMode] = useState(true);

  useEffect(() => {
    axios.get(`${SALES_COLLECTION_URL}/get-collections`)
      .then((res) => {
        // res.data.forEach(element => {
        //   element?.details?.forEach(item => {
        //     item['sc_id'] = 'C' + String(item['sc_id']).padStart(3, '0');
        //   })
        // })

        res.data.sort((a, b) => {
          return parseInt(b._id.slice(1)) - parseInt(a._id.slice(1));
        })
        setFetchedData(res.data);
      })
  }, [])

  const OuterTable = {
    'Bill Number': ['_id', '15vw'],
    'Total Amount': ['totalAmount', '15vw'],
    'Net Amount Collected': ['netAmountCollected', '15vw'],
    'Remaining Credit': ['remainingCredit', '15vw'],
  }

  const InnerTable = {
    'Collection ID': ['sc_id', '15vw'],
    'Date': ['date', '15vw'],
    'PSR': ['psr', '15vw'],
    'Amount Collected': ['amountCollected', '15vw'],
    'Type': ['type', '15vw'],
  }

  const metadataFunction = (data) => {
    const totalCollectedAmount = data.reduce((sum, row) => {
      const rowAmount = parseFloat(row.netAmountCollected);
      return isNaN(rowAmount) ? sum : sum + rowAmount;
    }, 0);

    return `Rs. ${totalCollectedAmount}`;
  }

  const metadataFunction2 = (data) => {
    const totalCredit = data.reduce((sum, row) => {
      const rowAmount = parseFloat(row.remainingCredit);
      return isNaN(rowAmount) ? sum : sum + rowAmount;
    }, 0);

    return `Rs. ${totalCredit}`;
  }

  return (
    <div className='pl-4 pr-12 flex flex-col gap-4 w-full -mt-16'>
      <div className='flex justify-between'>
        <PageTitle title={'All Sales Collections'} className={'w-1/2 text-right'} />
        <div className='absolute left-4 bottom-4'>
          <div className='flex gap-2 items-center p-1.5 border-2 border-orange-700 rounded-xl relative'>
            <p className='text-orange-700 text-xs absolute -top-2.5 left-4 bg-white px-1 font-medium'>View By</p>
            <CustomButton
              className={`rounded-md !p-2 text-sm ${billViewMode ? 'bg-orange-700 text-white' : ''}`}
              onClick={() => {
                setBillViewMode(true);
              }}
              icon={<FiHash />}
              text={'Bill No.'}
            />
            <CustomButton
              className={`rounded-md !p-2 text-sm ${!billViewMode ? 'bg-orange-700 text-white' : ''}`}
              onClick={() => {
                setBillViewMode(false);
              }}
              icon={<BsCalendar4Week />}
              text={'Date'}
            />
          </div>
        </div>
        <CustomButton
          onClick={() => { navigate('/collection/add') }}
          icon={<IoMdAdd />}
          text={'Add New Sales Collection'}
        />
      </div>

      <CollapsibleTable
        data={fetchedData}
        OuterTable={OuterTable}
        InnerTable={InnerTable}
        innerEditUrl={'/collection/edit'}
        innerDeleteUrl={`${SALES_COLLECTION_URL}/delete-collection`}
        innerTableTitle={'Collection Details'}
        metadataTitle={'Total Amount Collected'}
        metadataFunction={metadataFunction}
        metadataTitle2={'Remaining Credit'}
        metadataFunction2={metadataFunction2}
      />

    </div>
  )
}

export default SalesCollectionScreen