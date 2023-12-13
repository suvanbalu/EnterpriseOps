import React, { useEffect, useState } from 'react'
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import PageTitle from '../../components/PageTitle';
import CustomButton from '../../components/CustomButton';
import CollapsibleTable from '../../components/CollapsibleTable.js';
import { EMPLOYEE_URL } from '../../API/calls';
import axios from 'axios';


const EmployeeScreen = () => {
  const navigate = useNavigate();
  const [fetchedData, setFetchedData] = useState([]);

  useEffect(() => {
    axios.get(`${EMPLOYEE_URL}/get-employees`)
      .then((res) => {
        setFetchedData(res.data);
      })
  }, [])

  const OuterTable = {
    'Name': ['name', '20vw'],
    'Employee Type': ['empType', '15vw'],
    'Date of Joining': ['dateOfJoining', '15vw'],
    'Date of Leaving': ['dateOfLeaving', '15vw'],
    'Salary': ['salary', '15vw'],
  };
  
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
        editUrl={'/employees/edit'}
        deleteUrl={`${EMPLOYEE_URL}/delete-employee`}
      />
    </div>
  )
}

export default EmployeeScreen
