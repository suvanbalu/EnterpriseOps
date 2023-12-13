import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { IoChevronBack } from "react-icons/io5";

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import customParseFormat from 'dayjs/plugin/customParseFormat.js';
import dayjs from 'dayjs';

import CustomButton from '../../components/CustomButton';
import HighlightedNumber from '../../components/HighlightedNumber';
import PageTitle from '../../components/PageTitle';
import CollectionInputTable from './CollectionInputTable';

import axios from 'axios';
import { SALES_COLLECTION_URL } from '../../API/calls';

dayjs.extend(customParseFormat);

const AddEditSalesCollectionScreen = () => {
  const navigate = useNavigate();

  const [date, setDate] = useState(dayjs());
  const [totalAmount, setTotalAmount] = useState(0);
  const [tableData, setTableData] = useState([
    { billno: '', route: '', psrName: '', partyName: '', remainingCredit: '', amountCollected: '', type: '' }
  ])

  useEffect(() => {
    let total = 0;
    tableData.forEach((item) => {
      total += parseFloat(item.amountCollected) || 0;
    })
    setTotalAmount(total);
  }, [tableData])

  return (
    <div className='px-8 flex flex-col gap-4 w-full'>
      <div className='flex gap-4 items-center'>
        <CustomButton
          className={'!p-2'}
          onClick={() => {
            navigate('/collection/')
          }}
          icon={<IoChevronBack />}
        />
        <PageTitle className={'!text-2xl'} title={`Add New Collection`} />
      </div>

      <div className='flex flex-row items-center gap-8 w-full'>
        <div className='w-1/4'>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
              <DatePicker
                value={date}
                onChange={(newValue) => setDate(newValue)}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3, }, }}
                label='Date'
                format="DD-MMM-YYYY"
                className='w-full'
              />
            </DemoContainer>
          </LocalizationProvider>
        </div>

        <HighlightedNumber
          title={'Total Amount'}
          value={`Rs. ${totalAmount} `}
        />
      </div>

      <CollectionInputTable tableState={[tableData, setTableData]} />

      <div className='flex justify-end mt-4'>
        <CustomButton
          onClick={() => {
            if (date === null || date === undefined || date === '') {
              return window.alert('Enter the date');
            }

            let valid = true;
            tableData.forEach((item) => {
              Object.values(item).forEach((value) => {
                if (value === null || value === undefined || value === '') {
                  valid = false;
                }
              });
            });
            if (!valid) {
              return window.alert('Enter all fields in the table');
            }

            console.log(tableData)

            const addFormat = tableData.map((item) => {
              return {
                s_billNo: item.billno,
                date: date,
                psr: item.psrName,
                amountCollected: item.amountCollected,
                type: item.type,
              }
            })

            console.log(addFormat)

            axios.post(`${SALES_COLLECTION_URL}/add-collections`, addFormat)
              .then((res) => {
                console.log(res)
                navigate('/collection/');
              })
              .catch((err) => {
                console.log(err);
              })
          }}

          icon={<IoMdCheckmarkCircleOutline />}
          text={`Add Collection`}
        />
      </div>

    </div>
  )
}

export default AddEditSalesCollectionScreen