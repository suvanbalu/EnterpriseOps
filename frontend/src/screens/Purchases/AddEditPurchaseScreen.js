import { TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { IoChevronBack } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import RealTimeInputTable from './RealTimeInputTable';

const AddEditPurchaseScreen = () => {
  const navigate = useNavigate();
  const [billNo, setBillNo] = useState("");
  const today = dayjs();
  const [date, setDate] = useState(today);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [invalid, setInvalid] = useState(false);

  const [tableData, setTableData] = useState([
    { productId: '', productName: '', quantity: '', rate: '', amount: '' },
  ]);

  useEffect(() => {
    const tot = tableData.reduce((sum, row) => {
      const rowAmount = parseFloat(row.amount);
      return isNaN(rowAmount) ? sum : sum + rowAmount;
    }, 0);

    setTotalAmount(tot.toFixed(2));

    const quant = tableData.reduce((sum, row) => {
      const rowQuantity = parseInt(row.quantity);
      return isNaN(rowQuantity) ? sum : sum + rowQuantity;
    }, 0);

    setTotalQuantity(quant);
  }, [tableData])

  return (
    <div className='px-8 flex flex-col gap-4 w-full'>
      <div className='flex gap-4 items-center'>
        <button
          className='flex flex-row gap-2 items-center text-lg font-semibold rounded-xl text-orange-700 bg-orange-50 w-fit p-2 shadow-md'
          onClick={() => {
            navigate('/purchases/')
          }}
        >
          <IoChevronBack />
        </button>
        <p className='text-2xl text-orange-700 font-semibold'>Add New Purchase</p>
      </div>

      <div className='flex flex-row mt-8 items-center gap-8 w-full'>
        <TextField
          label="Bill Number"
          variant="outlined"
          margin="normal"
          value={billNo}
          onChange={(e) => { setBillNo(e.target.value) }}
          className='w-1/4'
          InputProps={{
            sx: { borderRadius: 3, },
          }}
        />

        <div className='w-1/4'>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
              <DatePicker
                value={date}
                onChange={(newValue) => setDate(newValue)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 3, // Adjust the border radius as needed
                  },
                }}
                label='Date'
                format="DD-MMM-YYYY"
                className='w-full'
              />
            </DemoContainer>
          </LocalizationProvider>
        </div>

        <div className='flex flex-col gap-1 text-center w-1/4'>
          <p className='text-xs text-gray-700'>Total Quantity</p>
          <p className='text-2xl font-semibold'>{totalQuantity}</p>
        </div>

        <div className='flex flex-col gap-1 text-center w-1/4'>
          <p className='text-xs text-gray-700'>Total Amount</p>
          <p className='text-2xl font-semibold'>Rs. {totalAmount}</p>
        </div>

      </div>

      <RealTimeInputTable tableData={tableData} setTableData={setTableData} />

      <div className='flex justify-end mt-4'>
        <button
          className='flex flex-row gap-2 items-center text-lg font-semibold rounded-xl text-orange-700 bg-orange-50 w-fit px-4 py-3 shadow-md'
          onClick={() => {
            let valid = true;

            if (billNo === null || billNo === undefined || billNo === '') {
              valid = false;
              return window.alert('Enter bill number');
            }

            tableData.forEach((item) => {
              Object.values(item).forEach((value) => {
                if (value === null || value === undefined || value === '') {
                  valid = false;
                  return window.alert('Enter all fields in the table');
                }
              });
            });

            if (valid) {
              navigate('/purchases/');
            }
          }}
        >
          <IoMdCheckmarkCircleOutline />
          {'Confirm & Add Purchase'}
        </button>
      </div>
    </div>
  )
}

export default AddEditPurchaseScreen