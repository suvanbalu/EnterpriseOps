import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { IoChevronBack } from "react-icons/io5";

import { Autocomplete, TextField } from '@mui/material';
import { styled } from '@mui/system';
import CustomButton from '../../components/CustomButton';
import PageTitle from '../../components/PageTitle';

import axios from 'axios';
import { PRODUCT_URL } from '../../API/calls';

const StyledAutocomplete = styled(Autocomplete)`
  .MuiInputBase-root {
    border-radius: 12px;
  }
`;

const UpdateInventoryScreen = () => {
  const navigate = useNavigate();
  const [productID, setProductID] = useState('');
  const [productName, setProductName] = useState('');
  const [piecesPerCase, setPiecesPerCase] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [unit, setUnit] = useState('');
  const [quantity, setQuantity] = useState('');
  const [sgst, setSgst] = useState('');
  const [cgst, setCgst] = useState('');
  const [cess, setCess] = useState('');
  const [edit, setEdit] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      setEdit(true);

      axios.get(`${PRODUCT_URL}/get-product/${id} `)
        .then((res) => {
          setProductID(res.data.p_id);
          setProductName(res.data.productName);
          setPiecesPerCase(res.data.piecesPerCase);
          setCategory(res.data.category);
          setPrice(res.data.price);
          setUnit(res.data.unit);
          setQuantity(res.data.quantity);
          setCess(res.data.CESS);
          setCgst(res.data.CGST);
          setSgst(res.data.SGST);
        })
    }
  }, [id]);

  return (
    <div className='px-8 flex flex-col gap-4 w-full'>
      <div className='flex gap-4 items-center'>
        <CustomButton
          className={'!p-2'}
          onClick={() => {
            navigate('/inventory/')
          }}
          icon={<IoChevronBack />}
        />
        <PageTitle className={'!text-2xl'} title={`${edit ? 'Edit' : 'Add New'} Product`} />
      </div>

      <div className='flex flex-row gap-4'>
        <CustomTextField
          label='Product ID'
          className='w-1/3'
          valueState={[productID, setProductID]}
          type='number'
        />

        <CustomTextField
          label='Product Name'
          className='w-1/3'
          valueState={[productName, setProductName]}
        />

        <CustomTextField
          label='Pieces Per Case'
          className='w-1/3'
          valueState={[piecesPerCase, setPiecesPerCase]}
          type='number'
        />
      </div>

      <div className='flex flex-row gap-4'>
        <StyledAutocomplete
          label='Category'
          value={category}
          onChange={(event, newValue) => {
            setCategory(newValue);
          }}
          options={['CAN', 'TETRA', 'RGP', 'PET']}
          sx={{ width: '25%' }}
          renderInput={(params) => <TextField
            {...params}
            label="Category"
            variant="outlined"
            margin="normal"
          />
          }
        />

        <CustomTextField
          label='Price'
          className='w-1/4'
          valueState={[price, setPrice]}
          type='number'
        />

        <CustomTextField
          label='Quantity'
          className='w-1/4'
          valueState={[quantity, setQuantity]}
          type='number'
        />

        <CustomTextField
          label='Unit'
          className='w-1/4'
          valueState={[unit, setUnit]}
        />
      </div>

      <PageTitle title='Tax Info' className='!text-xl mt-4 -mb-4' />
      <div className='flex flex-row gap-4'>
        <CustomTextField
          label='SGST'
          className='w-1/3'
          valueState={[sgst, setSgst]}
          type='number'
        />

        <CustomTextField
          label='CGST'
          className='w-1/3'
          valueState={[cgst, setCgst]}
          type='number'
        />

        <CustomTextField
          label='CESS'
          className='w-1/3'
          valueState={[cess, setCess]}
          type='number'
        />
      </div>

      <div className='flex justify-end mt-4'>
        <CustomButton
          onClick={() => {
            if (productID === '' || productName === '' || piecesPerCase === '' || category === '' || price === '' || unit === '' || quantity === '' || sgst === '' || cgst === '' || cess === '') {
              return window.alert('Enter all fields in the table');
            }

            if (edit) {
              axios.put(`${PRODUCT_URL}/update-product/${id}`, {
                p_id: productID,
                productName: productName,
                piecesPerCase: piecesPerCase,
                category: category,
                price: price,
                unit: unit,
                quantity: quantity,
                CESS: cess,
                CGST: cgst,
                SGST: sgst,
              })
                .then((res) => {
                  window.alert('Product Updated Successfully');
                  navigate('/inventory/');
                })
                .catch((err) => {
                  console.log(err);
                  window.alert('Error Updating Product');
                })
            } else {
              axios.post(`${PRODUCT_URL}/add-product`, {
                p_id: productID,
                productName: productName,
                piecesPerCase: piecesPerCase,
                category: category,
                price: price,
                unit: unit,
                quantity: quantity,
                CESS: cess,
                CGST: cgst,
                SGST: sgst,
              })
                .then((res) => {
                  window.alert('Product Added Successfully');
                  navigate('/inventory/');
                })
                .catch((err) => {
                  console.log(err);
                  window.alert('Error Adding Product');
                })
            }
          }}
          icon={<IoMdCheckmarkCircleOutline />}
          text={`Confirm & ${edit ? 'Edit' : 'Add'} Product`}
        />
      </div>
    </div>
  )
}

const CustomTextField = ({ label, className, type = 'text', valueState = ["", (e) => { }] }) => {
  const [val, setVal] = valueState;

  return (
    <TextField
      label={label}
      variant="outlined"
      margin="normal"
      // size='small'
      type={type}
      value={val}
      onChange={(e) => { setVal(e.target.value) }}
      className={className}
      InputProps={{
        sx: { borderRadius: 3, },
      }}
    />
  )
}

export default UpdateInventoryScreen