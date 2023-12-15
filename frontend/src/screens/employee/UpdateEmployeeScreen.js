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
import CustomTextField from '../../components/CustomTextField';
import CustomAutoComplete from '../../components/CustomAutoComplete';

import axios from 'axios';
import { EMPLOYEE_URL } from '../../API/calls';

dayjs.extend(customParseFormat);

const UpdateEmployeeScreen = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [empType, setEmpType] = useState('');
  const [dateOfJoining, setDateOfJoining] = useState(dayjs());
  const [dateOfLeaving, setDateOfLeaving] = useState();
  const [salary, setSalary] = useState(0);
  const [edit, setEdit] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      setEdit(true);

      axios.get(`${EMPLOYEE_URL}/get-employee/${id} `)
        .then((res) => {
          setName(res.data.name);
          setEmpType(res.data.empType);
          setDateOfJoining(dayjs(res.data.dateOfJoining));
          setDateOfLeaving(res.data.dateOfLeaving && dayjs(res.data.dateOfLeaving));
          setSalary(res.data.salary);
        })
    }
  }, [id]);

  return (
    <div className='px-8 flex flex-col gap-4 w-full'>
      <div className='flex gap-4 items-center'>
        <CustomButton
          className={'!p-2'}
          onClick={() => {
            navigate('/employees/')
          }}
          icon={<IoChevronBack />}
        />
        <PageTitle className={'!text-2xl'} title={`${edit ? 'Edit' : 'Add New'} Employee`} />
      </div>

      <div className='flex flex-row gap-8'>
        <CustomTextField
          label='Name'
          valueState={[name, setName]}
          className='w-1/3'
          autoFocus
        />

        <div className='w-1/3 mt-2'>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
              <DatePicker
                value={dateOfJoining}
                onChange={(newValue) => setDateOfJoining(newValue)}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3, }, }}
                label='Date of Joining'
                format="DD-MMM-YYYY"
                className='w-full'
              />
            </DemoContainer>
          </LocalizationProvider>
        </div>

        <div className='w-1/3 mt-2'>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
              <DatePicker
                value={dateOfLeaving}
                onChange={(newValue) => setDateOfLeaving(newValue)}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3, }, }}
                label='Date of Leaving'
                format="DD-MMM-YYYY"
                className='w-full'
              />
            </DemoContainer>
          </LocalizationProvider>
        </div>
      </div>

      <div className='flex flex-row gap-8'>
        <CustomAutoComplete
          label='Employee Type'
          width={'33%'}
          valueState={[empType, setEmpType]}
          options={['PSR1', 'PSR2', 'PSR3', 'PSR4', 'PSR5', 'PSR6', 'Driver', 'Loadman', 'Manager']}
        />

        <CustomTextField
          label='Salary'
          valueState={[salary, setSalary]}
          className='w-1/3'
          type='number'
        />
      </div>

      <div className='flex justify-end mt-4'>
        <CustomButton
          onClick={() => {
            if (name === '' || empType === '' || dateOfJoining === '') {
              return window.alert('Enter all fields');
            }

            if (edit) {
              axios.put(`${EMPLOYEE_URL}/update-employee/${id}`, {
                name: name,
                empType: empType,
                dateOfJoining: dateOfJoining,
                dateOfLeaving: dateOfLeaving,
                salary: salary,
              })
                .then((res) => {
                  window.alert('Employee Updated Successfully');
                  navigate('/employees/');
                })
                .catch((err) => {
                  console.log(err);
                  window.alert('Error Updating Product');
                })
            } else {
              axios.post(`${EMPLOYEE_URL}/add-employees`, [{
                name: name,
                empType: empType,
                dateOfJoining: dateOfJoining,
                dateOfLeaving: dateOfLeaving,
                salary: salary,
              }])
                .then((res) => {
                  window.alert('Employee Added Successfully');
                  navigate('/employees/');
                })
                .catch((err) => {
                  console.log(err);
                  window.alert('Error Adding Employee');
                })
            }
          }}
          icon={<IoMdCheckmarkCircleOutline />}
          text={`Confirm & ${edit ? 'Edit' : 'Add'} Employee`}
        />
      </div>
    </div>
  )
}

export default UpdateEmployeeScreen
