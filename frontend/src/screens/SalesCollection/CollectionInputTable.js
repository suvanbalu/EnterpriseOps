import React, { useState, useEffect } from 'react';
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TextField,
  Paper,
  FormControl,
  Autocomplete
} from '@mui/material';
import { IoMdAdd, IoMdClose } from 'react-icons/io';
import CustomButton from '../../components/CustomButton';
import axios from 'axios';
import { SALE_URL } from '../../API/calls';

const SalesInputTable = ({ tableState = ["", (e) => { }] }) => {
  const [tableData, setTableData] = tableState;
  const [bills, setBills] = useState([]);
  const [billNumbers, setBillNumbers] = useState([]);

  const handleInputChange = (index, field, value) => {
    const newData = [...tableData];
    newData[index][field] = value;

    if (field === 'billno') {
      const element = bills.filter((item) => item._id === value)[0];
      newData[index].route = element?.route;
      newData[index].partyName = element?.party_name;
      newData[index].remainingCredit = element?.credit;
    }

    setTableData(newData);
  };

  useEffect(() => {
    axios.get(`${SALE_URL}/get-sales`)
      .then((res) => {
        setBills(res.data);
        setBillNumbers(res.data.map((item) => item._id))
      })
  }, [])

  const handleAddRow = () => {
    setTableData([
      ...tableData,
      { billno: '', route: '', psrName: '', partyName: '', remainingCredit: '', amountCollected: '', type: '' }
    ]);
  };

  const handleRemoveRow = (index) => {
    const newData = [...tableData];
    newData.splice(index, 1);
    setTableData(newData);
  };

  return (
    <TableContainer component={Paper}>
      <Table size="small" dense>
        <TableHead>
          <TableRow>
            <TableCell style={{ fontWeight: "bold" }}>Bill Number</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>Route</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>PSR Name</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>Party Name</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>Previously Remaining Credit</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>Amount Collected</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>Type</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((row, index) => (
            <TableRow key={index}>
              <TableCell>
                <FormControl fullWidth>
                  <Autocomplete
                    value={row.billno}
                    onChange={(event, newValue) => {
                      handleInputChange(index, 'billno', newValue);
                    }}
                    options={billNumbers}
                    sx={{ width: 150 }}
                    renderInput={(params) => <TextField
                      {...params}
                      variant="standard"
                      size="small"
                    />}
                  />
                </FormControl>
              </TableCell>
              <TableCell>
                <p>{row.route}</p>
              </TableCell>
              <TableCell>
                <FormControl fullWidth>
                  <Autocomplete
                    value={row.psrName}
                    onChange={(event, newValue) => {
                      handleInputChange(index, 'psrName', newValue);
                    }}
                    options={billNumbers}
                    sx={{ width: 150 }}
                    renderInput={(params) => <TextField
                      {...params}
                      variant="standard"
                      size="small"
                    />}
                  />
                </FormControl>
              </TableCell>
              <TableCell>
                <p>{row.partyName}</p>
              </TableCell>
              <TableCell>
                <p>{row.remainingCredit}</p>
              </TableCell>
              <TableCell>
                <TextField
                  InputProps={{ disableUnderline: true }}
                  type="number"
                  value={row.amountCollected}
                  onChange={(e) => handleInputChange(index, 'amountCollected', e.target.value)}
                  variant="standard"
                  size="small"
                />
              </TableCell>
              <TableCell>
                <FormControl fullWidth>
                  <Autocomplete
                    value={row.type}
                    onChange={(event, newValue) => {
                      handleInputChange(index, 'type', newValue);
                    }}
                    options={['Cash', 'Cheque', 'UPI', 'Others']}
                    sx={{ width: 150 }}
                    renderInput={(params) => <TextField
                      {...params}
                      variant="standard"
                      size="small"
                    />}
                  />
                </FormControl>
              </TableCell>
              <TableCell>
                <button
                  onClick={() => handleRemoveRow(index)}
                  className='text-xl hover:text-red-500'>
                  <IoMdClose />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <CustomButton
        className={'!text-sm m-4'}
        onClick={handleAddRow}
        icon={<IoMdAdd />}
        text={'Add Row'}
      />
    </TableContainer>
  );
};

export default SalesInputTable;