import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { IoChevronBack } from "react-icons/io5";

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import customParseFormat from 'dayjs/plugin/customParseFormat.js';
import dayjs from 'dayjs';

import CustomButton from '../../components/CustomButton';
import PageTitle from '../../components/PageTitle';

import axios from 'axios';
import { SALE_URL, SALES_COLLECTION_URL } from '../../API/calls';
import CustomTextField from '../../components/CustomTextField';
import CustomAutoComplete from '../../components/CustomAutoComplete';

dayjs.extend(customParseFormat);

const EditSalesCollection = () => {
  const navigate = useNavigate();

  const [bills, setBills] = useState([]);
  const [currentBill, setCurrentBill] = useState();
  const [billNumbers, setBillNumbers] = useState([]);

  const [billno, setBillno] = useState("");
  const [date, setDate] = useState();
  const [psr, setPsr] = useState("");
  const [amountCollected, setAmountCollected] = useState("")
  const [type, setType] = useState("");

  const { id } = useParams();

  useEffect(() => {
    axios.get(`${SALE_URL}/get-sales`)
      .then((res) => {
        setBills(res.data);
        setBillNumbers(res.data.map((item) => item._id))
      })
  }, [])

  useEffect(() => {
    if (billno) {
      const element = bills.filter((item) => item._id === billno)[0];
      setCurrentBill(element);
    }
  }, [billno, bills])

  useEffect(() => {
    if (id) {
      axios.get(`${SALES_COLLECTION_URL}/get-collection-by-id/${id}`)
        .then((res) => {
          console.log(res.data.s_billNo);
          setBillno(res.data.s_billNo);
          setDate(dayjs(res.data.date));
          setPsr(res.data.psr);
          setAmountCollected(res.data.amountCollected);
          setType(res.data.type);
        })
    }
  }, [id])

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
        <PageTitle className={'!text-2xl'} title={`Edit Collection ${id}`} />
      </div>

      <div className='flex flex-row items-center gap-8 w-full mt-4'>
        <div className='w-1/3'>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
              <DatePicker
                value={date}
                onChange={(newValue) => setDate(newValue)}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3, }, }}
                label='Date'
                format="DD-MMM-YYYY"
                className='w-full'
                autoFocus
              />
            </DemoContainer>
          </LocalizationProvider>
        </div>

        <CustomTextField
          label='Amount Collected'
          valueState={[amountCollected, setAmountCollected]}
          type='number'
          className='w-1/3'
        />

        <CustomAutoComplete
          label='Type'
          valueState={[type, setType]}
          options={['Cash', 'Cheque', 'UPI', 'Others']}
          width={'33%'}
        />
      </div>

      <div className='flex flex-row items-center gap-8 w-full'>
        <CustomAutoComplete
          label='Bill Number'
          valueState={[billno, setBillno]}
          options={billNumbers}
          width={'33%'}
        />

        <CustomTextField
          label='PSR'
          valueState={[psr, setPsr]}
          className='w-1/3'
        />
      </div>

      <div className='flex flex-col gap-2 w-full'>
        <PageTitle title='Bill Details' className='!text-xl' />

        <p className='text-sm'>Route: <span className='font-semibold'>{currentBill?.route}</span></p>
        <p className='text-sm'>Party Name: <span className='font-semibold'>{currentBill?.party_name}</span></p>
        <p className='text-sm'>Total Amount: <span className='font-semibold'>{currentBill?.totalAmount}</span></p>
        <p className='text-sm'>Current Remaining Credit: <span className='font-semibold'>{currentBill?.credit}</span></p>

      </div>

      <div className='flex justify-end mt-4'>
        <CustomButton
          onClick={() => {
            if (date === '' || billno === '' || psr === '' || amountCollected === '' || type === '') {
              return window.alert('Enter all the fields');
            }

            axios.put(`${SALES_COLLECTION_URL}/update-collection/${id}`, {
              s_billNo: billno,
              date: date,
              psr: psr,
              amountCollected: amountCollected,
              type: type,
            })
              .then((res) => {
                console.log(res)
                navigate('/collection/');
              })
              .catch((err) => {
                console.log(err);
              })
          }}
          icon={<IoMdCheckmarkCircleOutline />}
          text={`Edit Collection`}
        />
      </div>
    </div>
  )
}

export default EditSalesCollection