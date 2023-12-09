import React, { useEffect, useState } from 'react'
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import CollapsibleTable from '../../components/CollapsibleTable';
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
        res.data.forEach(element => {
          element?.details?.forEach(item => {
            item['amount'] = item?.rateOfProduct * item?.quantity;
          })
        })

        setFetchedData(res.data);
      })
  }, [])

  const OuterTable = {
    'Bill Number': ['billno', '15vw'],
    'Date': ['date', '15vw'],
    'Total Amount': ['totalAmount', '15vw']
  }

  const InnerTable = {
    'Product ID': ['p_id', '15vw'],
    'Product Name': ['productName', '30vw'],
    'Quantity': ['quantity', '10vw'],
    'Rate': ['rateOfProduct', '10vw'],
    'Amount': ['amount', '10vw']
  }


  const metadataFunction = (data) => {
    const totalPurchaseAmount = data.reduce((sum, row) => {
      const rowAmount = parseFloat(row.totalAmount);
      return isNaN(rowAmount) ? sum : sum + rowAmount;
    }, 0);

    return `Rs. ${totalPurchaseAmount}`;
  }

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

      <CollapsibleTable
        data={fetchedData}
        OuterTable={OuterTable}
        InnerTable={InnerTable}
        editUrl={'/purchases/edit'}
        deleteUrl={`${PURCHASE_URL}/deleteentry`}
        innerTableTitle={'Purchase Details'}
        metadataTitle={'Total Purchase Amount'}
        metadataFunction={metadataFunction}
        dateQuery
      />

    </div>
  )
}

export default PurchasesScreen