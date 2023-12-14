import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { IoChevronBack } from "react-icons/io5";

import CustomButton from '../../components/CustomButton';
import PageTitle from '../../components/PageTitle';
import CustomTextField from '../../components/CustomTextField';
import CustomAutoComplete from '../../components/CustomAutoComplete';

import NumbersIcon from '@mui/icons-material/Numbers';
import DnsIcon from '@mui/icons-material/Dns';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import CategoryIcon from '@mui/icons-material/Category';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

import axios from 'axios';
import { PRODUCT_URL } from '../../API/calls';

const UpdateInventoryScreen = () => {
  const navigate = useNavigate();
  const [productID, setProductID] = useState('');
  const [productName, setProductName] = useState('');
  const [piecesPerCase, setPiecesPerCase] = useState('');
  const [category, setCategory] = useState('');
  const [salesRate, setSalesRate] = useState('');
  const [price, setPrice] = useState('');
  const [unit, setUnit] = useState('');
  const [quantity, setQuantity] = useState('');
  const [gst, setGst] = useState('');
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
          setSalesRate(res.data.salesRate);
          setPrice(res.data.price);
          setUnit(res.data.unit);
          setQuantity(res.data.quantity);
          setCess(res.data.CESS);
          setGst(res.data.GST);
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

      <div className='flex flex-row gap-8'>
        <CustomTextField
          label='Product ID'
          className='w-1/4'
          valueState={[productID, setProductID]}
          type='number'
          icon={<NumbersIcon />}
        />

        <CustomTextField
          label='Product Name'
          className='w-1/4'
          valueState={[productName, setProductName]}
          icon={<DnsIcon />}
        />

        <CustomTextField
          label='Pieces Per Case'
          className='w-1/4'
          valueState={[piecesPerCase, setPiecesPerCase]}
          type='number'
          icon={<WorkOutlineIcon />}
        />

        <CustomAutoComplete
          label='Category'
          valueState={[category, setCategory]}
          options={['CAN', 'TETRA', 'RGP', 'PET']}
          width='25%'
          icon={<CategoryIcon />}
        />
      </div>

      <div className='flex flex-row gap-8'>
        <CustomTextField
          label='Sales Rate'
          className='w-1/4'
          valueState={[salesRate, setSalesRate]}
          type='number'
          icon={<PointOfSaleIcon />}
        />

        <CustomTextField
          label='MRP'
          className='w-1/4'
          valueState={[price, setPrice]}
          type='number'
          icon={<CurrencyRupeeIcon />}
        />

        <CustomTextField
          label='Quantity'
          className='w-1/4'
          valueState={[quantity, setQuantity]}
          type='number'
          icon={<LocalGroceryStoreIcon />}
        />

        <CustomAutoComplete
          label='Unit'
          valueState={[unit, setUnit]}
          options={['ml', 'L']}
          width='25%'
          icon={<LocalOfferIcon />}
        />
      </div>

      <PageTitle title='Tax Info' className='!text-xl mt-4 -mb-4' />
      <div className='flex flex-row gap-8'>
        <CustomTextField
          label='GST'
          className='w-1/4'
          valueState={[gst, setGst]}
          type='number'
          icon={<ReceiptLongIcon />}
        />

        <CustomTextField
          label='CESS'
          className='w-1/4'
          valueState={[cess, setCess]}
          type='number'
          icon={<ReceiptLongIcon />}
        />
      </div>

      <div className='flex justify-end mt-4'>
        <CustomButton
          onClick={() => {
            if (productID === '' || productName === '' || piecesPerCase === '' || category === '' || price === '' || unit === '' || quantity === '' || gst === '' || salesRate === '' || cess === '') {
              return window.alert('Enter all fields in the table');
            }

            if (edit) {
              axios.put(`${PRODUCT_URL}/update-product/${id}`, {
                p_id: productID,
                productName: productName,
                piecesPerCase: piecesPerCase,
                category: category,
                salesRate: salesRate,
                price: price,
                unit: unit,
                quantity: quantity,
                CESS: cess,
                GST: gst,
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
                salesRate: salesRate,
                price: price,
                unit: unit,
                quantity: quantity,
                CESS: cess,
                GST: gst,
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

export default UpdateInventoryScreen