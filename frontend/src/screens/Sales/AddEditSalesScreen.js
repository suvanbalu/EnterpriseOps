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
import HighlightedNumber from '../../components/HighlightedNumber';
import PageTitle from '../../components/PageTitle';
import CustomTextField from '../../components/CustomTextField';
import CustomAutoComplete from '../../components/CustomAutoComplete';

import NumbersIcon from '@mui/icons-material/Numbers';

import axios from 'axios';
import { SALE_URL, PARTY_URL } from '../../API/calls';
import SalesInputTable from './SalesInputTable';

dayjs.extend(customParseFormat);

const AddEditSalesScreen = () => {
  const navigate = useNavigate();
  const [billno, setBillno] = useState("");
  const [date, setDate] = useState(dayjs());
  const [totalAmount, setTotalAmount] = useState(0);
  const [partyID, setPartyID] = useState("");
  const [partyName, setPartyName] = useState("");
  const [parties, setParties] = useState([]);
  const [partyNames, setPartyNames] = useState([]);
  const [route, setRoute] = useState("");
  const [credit, setCredit] = useState(0);
  const [totalPieces, setTotalPieces] = useState(0);
  const [totalCases, setTotalCases] = useState(0);
  const [tableData, setTableData] = useState([
    { p_id: '', productName: '', case: '', piece: '', piecesPerCase: '', saleRate: '', amount: '' },
  ]);
  const [edit, setEdit] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    axios.get(`${PARTY_URL}/get-parties`)
      .then((res) => {
        setParties(res.data);
        setPartyNames(res.data.map((item) => item.partyName));
      })
  }, [])

  useEffect(() => {
    if (partyName) {
      const element = parties.filter((item) => item.partyName === partyName)[0];
      setPartyID(element?.party_id);
      setRoute(element?.route);
    }
  }, [parties, partyName])

  useEffect(() => {
    if (id) {
      setEdit(true);

      axios.get(`${SALE_URL}/get-sale/${id} `)
        .then((res) => {
          setBillno(res.data._id);
          setDate(dayjs(res.data.date));
          setPartyID(res.data.party_id);
          setPartyName(res.data.party_name);
          setRoute(res.data.route);
          setCredit(res.data.credit);
          setTotalAmount(res.data.totalAmount);
          setTableData(res.data.details);
        })
    }
  }, [id]);

  useEffect(() => {
    if (tableData) {
      const tot = tableData.reduce((sum, row) => {
        const rowRate = parseFloat(row.saleRate);
        const rowPiece = parseFloat(row.piece);
        const rowCase = parseFloat(row.case);
        const rowPiecePerCase = parseFloat(row.piecesPerCase);

        const rowAmount = (
          (rowRate * (rowPiece / rowPiecePerCase)) +
          (rowRate * rowCase)
        );

        return isNaN(rowAmount) ? sum : sum + rowAmount;
      }, 0);

      setTotalAmount(tot.toFixed(2));

      const p = tableData.reduce((sum, row) => {
        const rowPieces = parseFloat(row.piece);
        return isNaN(rowPieces) ? sum : sum + rowPieces;
      }, 0);

      setTotalPieces(p);

      const c = tableData.reduce((sum, row) => {
        const rowCases = parseFloat(row.case);
        return isNaN(rowCases) ? sum : sum + rowCases;
      }, 0);

      setTotalCases(c);
    }
  }, [tableData])


  return (
    <div className='px-8 flex flex-col gap-4 w-full'>
      <div className='flex gap-4 items-center'>
        <CustomButton
          className={'!p-2'}
          onClick={() => {
            navigate('/sales/')
          }}
          icon={<IoChevronBack />}
        />
        <PageTitle className={'!text-2xl'} title={`${edit ? 'Edit' : 'Add New'} Sale`} />
      </div>

      <div className='flex flex-row items-center gap-8 w-full'>
        <CustomTextField
          label='Bill Number'
          className='w-1/4'
          valueState={[billno, setBillno]}
          icon={<NumbersIcon />}
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
          title={'Total Cases'}
          value={`${totalCases} `}
        />

        <HighlightedNumber
          title={'Total Pieces'}
          value={`${totalPieces} `}
        />

        <HighlightedNumber
          title={'Total Amount'}
          value={`Rs. ${totalAmount} `}
        />
      </div>

      <div className='flex flex-row items-center gap-8 w-full'>
        <CustomAutoComplete
          label='Party Name'
          width='35%'
          valueState={[partyName, setPartyName]}
          options={partyNames}
        />

        <CustomTextField
          label='Party ID'
          className='w-1/5'
          valueState={[partyID, setPartyID]}
        />

        <CustomTextField
          label='Route'
          className='w-1/4'
          valueState={[route, setRoute]}
        />

        <CustomTextField
          label='Credit'
          className='w-1/4'
          valueState={[credit, setCredit]}
          type='number'
        />
      </div>

      <SalesInputTable tableState={[tableData, setTableData]} />

      <div className='flex justify-end mt-4'>
        <CustomButton
          onClick={() => {
            if (billno === '' || date === '' || partyID === '' || partyName === '' || route === '' || credit === '') {
              return window.alert('Enter all fields');
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

            if (edit) {
              axios.put(`${SALE_URL}/update-sale/${id}`, {
                sbillno: billno,
                party_id: partyID,
                date: date,
                totalAmount: totalAmount,
                credit: credit,
                details: tableData.map((item) => {
                  return {
                    p_id: item.p_id,
                    case: item.case,
                    piece: item.piece,
                    saleRate: item.saleRate,
                  }
                })
              })
                .then((res) => {
                  console.log(res)
                  navigate('/sales/');
                })
                .catch((err) => {
                  console.log(err);
                })
            } else {
              axios.post(`${SALE_URL}/add-sale`, {
                sbillno: billno,
                party_id: partyID,
                date: date,
                totalAmount: totalAmount,
                credit: credit,
                details: tableData.map((item) => {
                  return {
                    p_id: item.p_id,
                    case: item.case,
                    piece: item.piece,
                    saleRate: item.saleRate,
                  }
                })
              })
                .then((res) => {
                  console.log(res)
                  navigate('/sales/');
                })
                .catch((err) => {
                  console.log(err);
                })
            }
          }}
          icon={<IoMdCheckmarkCircleOutline />}
          text={`Confirm & ${edit ? 'Edit' : 'Add'} Sale`}
        />
      </div>
    </div>
  )
}

export default AddEditSalesScreen