import { TextField } from '@mui/material';
import React, { useState } from 'react'
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

  const handleClick= ()=>{
    return;
  }
  
  const handleSearchChange = (event) => {
    setBillNo(event.target.value);
  }

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
          onChange={handleSearchChange}
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

        <div className='flex flex-col gap-1 text-right w-1/4'>
          <p className='text-xs text-gray-700'>Total Amount</p>
          <p className='text-2xl font-semibold'>Rs. 5000</p>
        </div>

      </div>

      <RealTimeInputTable />

      <div className='flex items-center justify-center'>
        <button className='rounded-l bg-green-700 text-white px-4 py-2' onClick={handleClick()}>Submit</button>
      </div>
    </div>
  )
}

export default AddEditPurchaseScreen