import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { IoChevronBack } from "react-icons/io5";

import CustomButton from '../../components/CustomButton';
import PageTitle from '../../components/PageTitle';
import CustomTextField from '../../components/CustomTextField';
import CustomAutoComplete from '../../components/CustomAutoComplete';

import NumbersIcon from '@mui/icons-material/Numbers';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ForkRightIcon from '@mui/icons-material/ForkRight';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import BusinessIcon from '@mui/icons-material/Business';
import MapIcon from '@mui/icons-material/Map';

import axios from 'axios';
import { PARTY_URL } from '../../API/calls';

const UpdatePartiesScreen = () => {
  const navigate = useNavigate();
  const [partyID, setPartyID] = useState('');
  const [partyName, setPartyName] = useState('');
  const [route, setRoute] = useState('');
  const [available, setAvailable] = useState('Yes');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [edit, setEdit] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      setEdit(true);

      axios.get(`${PARTY_URL}/get-party/${id} `)
        .then((res) => {
          setPartyID(res.data.party_id);
          setPartyName(res.data.partyName);
          setRoute(res.data.route);
          setAvailable(res.data.available);
          setPhoneNumber(res.data.phoneNumber);
          setAddress(res.data.address);
          setLatitude(res.data.coordinate.split(' ')[0]);
          setLongitude(res.data.coordinate.split(' ')[1]);
        })
    }
  }, [id]);

  return (
    <div className='px-8 flex flex-col gap-4 w-full'>
      <div className='flex gap-4 items-center'>
        <CustomButton
          className={'!p-2'}
          onClick={() => {
            navigate('/parties/')
          }}
          icon={<IoChevronBack />}
        />
        <PageTitle className={'!text-2xl'} title={`${edit ? 'Edit' : 'Add New'} Party`} />
      </div>

      <div className='flex flex-row gap-8'>
        <CustomTextField
          label='Party ID'
          className='w-1/3'
          valueState={[partyID, setPartyID]}
          icon={<NumbersIcon />}
          autoFocus
        />

        <CustomTextField
          label='Party Name'
          className='w-2/3'
          valueState={[partyName, setPartyName]}
          icon={<PersonOutlineIcon />}
        />
      </div>

      <div className='flex flex-row gap-8'>
        <CustomAutoComplete
          label='Route'
          valueState={[route, setRoute]}
          options={['PSR1', 'PSR2', 'PSR3', 'PSR4', 'PSR5', 'PSR6']}
          width='25%'
          icon={<ForkRightIcon />}
        />

        <CustomAutoComplete
          label='Available'
          valueState={[available, setAvailable]}
          options={['Yes', 'No']}
          width='25%'
          icon={<EventAvailableIcon />}
        />

        <CustomTextField
          label='Phone Number'
          className='w-1/3'
          valueState={[phoneNumber, setPhoneNumber]}
          icon={<LocalPhoneIcon />}
        />
      </div>

      <div className='flex flex-row gap-8'>
        <CustomTextField
          label='Address'
          className='w-2/3'
          valueState={[address, setAddress]}
          textarea
          icon={<BusinessIcon />}
        />
      </div>

      <PageTitle title='Coordinates' className='!text-xl mt-4 -mb-4' />
      <div className='flex flex-row gap-8'>
        <CustomTextField
          label='Latitude'
          className='w-1/3'
          valueState={[latitude, setLatitude]}
          type='number'
          icon={<MapIcon />}
        />

        <CustomTextField
          label='Longitude'
          className='w-1/3'
          valueState={[longitude, setLongitude]}
          type='number'
          icon={<MapIcon />}
        />

        {latitude && longitude && (
          <iframe
            title='Map'
            className='w-1/3 h-72 -mt-52 rounded-xl'
            src={`https://maps.google.com/maps?q=${latitude},${longitude}&output=embed`}
            style={{ border: 0 }}
            allowFullScreen
            loading='lazy'
          />
        )}
      </div>

      <div className='flex justify-end mt-4'>
        <CustomButton
          onClick={() => {
            if (!partyID || !partyName || !route || !available) {
              return window.alert('Enter all fields in the table');
            }

            if (edit) {
              axios.put(`${PARTY_URL}/update-party/${id}`, {
                party_id: partyID,
                partyName: partyName,
                route: route,
                available: available === 'Yes' ? true : false,
                phoneNumber: phoneNumber,
                address: address,
                coordinate: `${latitude} ${longitude}`,
              })
                .then((res) => {
                  window.alert('Party Updated Successfully');
                  navigate('/parties/');
                })
                .catch((err) => {
                  console.log(err);
                  window.alert('Error Updating Party');
                })
            } else {
              axios.post(`${PARTY_URL}/add-party`, {
                party_id: partyID,
                partyName: partyName,
                route: route,
                available: available === 'Yes' ? true : false,
                phoneNumber: phoneNumber,
                address: address,
                coordinate: `${latitude} ${longitude}`,
              })
                .then((res) => {
                  window.alert('Party Added Successfully');
                  navigate('/parties/');
                })
                .catch((err) => {
                  console.log(err);
                  window.alert('Error Adding Party');
                })
            }
          }}
          icon={<IoMdCheckmarkCircleOutline />}
          text={`Confirm & ${edit ? 'Edit' : 'Add'} Party`}
        />
      </div>
    </div>
  )
}

export default UpdatePartiesScreen