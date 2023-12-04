import { TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { IoChevronBack } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import dummyData from '../../components/dummyData';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import RealTimeInputTable from '../../components/RealTimeInputTable';
import CustomButton from '../../components/CustomButton';
import HighlightedNumber from '../../components/HighlightedNumber';

const AddEditPurchaseScreen = () => {
  const navigate = useNavigate();
  const [billNo, setBillNo] = useState("");
  const [date, setDate] = useState(dayjs());
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [tableData, setTableData] = useState([
    { productId: '', productName: '', quantity: '', rate: '', amount: '' },
  ]);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (window.location.pathname.split('/')[2] === 'edit') {
      setEdit(true);

      const data = dummyData.filter((item) => item.billNumber === window.location.pathname.split('/')[3])[0];
      console.log(data);

      setBillNo(data.billNumber);
      setDate(dayjs(data.date));
      setTableData(data.details);
    }
  }, []);

  useEffect(() => {
    if (tableData) {
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
    }
  }, [tableData])

  return (
    <div className='px-8 flex flex-col gap-4 w-full'>
      <div className='flex gap-4 items-center'>
        <CustomButton
          className={'!p-2'}
          onClick={() => {
            navigate('/purchases/')
          }}
          icon={<IoChevronBack />}
        />
        <p className='text-2xl text-orange-700 font-semibold'>{`${edit ? 'Edit' : 'Add New'} Purchase`}</p>
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
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3, }, }}
                label='Date'
                format="DD-MMM-YYYY"
                className='w-full'
              />
            </DemoContainer>
          </LocalizationProvider>
        </div>

        <HighlightedNumber
          title={'Total Quantity'}
          value={totalQuantity}
        />

        <HighlightedNumber
          title={'Total Amount'}
          value={`Rs. ${totalAmount}`}
        />

      </div>

      <RealTimeInputTable tableState={[tableData, setTableData]} />

      <div className='flex justify-end mt-4'>
        <CustomButton
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
              console.log(billNo, date, tableData);
              navigate('/purchases/');
            }
          }}
          icon={<IoMdCheckmarkCircleOutline />}
          text={`Confirm & ${edit ? 'Edit' : 'Add'} Purchase`}
        />
      </div>
    </div>
  )
}

export default AddEditPurchaseScreen