import React, { useState } from 'react';
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TextField,
  Paper,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Autocomplete
} from '@mui/material';
import { IoMdAdd, IoMdClose } from 'react-icons/io';

const RealTimeInputTable = ({ tableData, setTableData }) => {

  const handleInputChange = (index, field, value) => {
    const newData = [...tableData];
    newData[index][field] = value;

    if (field === 'productName') {
      if (value === 'Option 1') {
        newData[index].productId = 'A12BC';
        newData[index].rate = 105;
      }
      if (value === 'Option 2') {
        newData[index].productId = 'X723B';
        newData[index].rate = 78;
      }
    }

    // Update the 'amount' field based on changes in 'quantity' or 'rate'
    if (field === 'quantity' || field === 'rate') {
      newData[index].amount = calculateAmount(newData[index].quantity, newData[index].rate);
    }

    setTableData(newData);
  };

  const handleAddRow = () => {
    setTableData([
      ...tableData,
      { productId: '', productName: '', quantity: '', rate: '', amount: '' },
    ]);
  };

  const handleRemoveRow = (index) => {
    const newData = [...tableData];
    newData.splice(index, 1);
    setTableData(newData);
  };

  const calculateAmount = (quantity, rate) => {
    const parsedQuantity = parseFloat(quantity);
    const parsedRate = parseFloat(rate);
    if (!isNaN(parsedQuantity) && !isNaN(parsedRate)) {
      return (parsedQuantity * parsedRate).toFixed(2);
    }
    return '';
  };

  return (
    <TableContainer component={Paper}>
      <Table size="small" dense>
        <TableHead>
          <TableRow>
            <TableCell>Product Name</TableCell>
            <TableCell>Product ID</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Rate</TableCell>
            <TableCell>Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((row, index) => (
            <TableRow key={index}>
              <TableCell>
                <FormControl fullWidth>
                  {/* <Select
                    disableUnderline
                    value={row.productName}
                    onChange={(e) => handleInputChange(index, 'productName', e.target.value)}
                    variant="standard"
                    size="small"
                  >
                    <MenuItem value="Option 1">Option 1</MenuItem>
                    <MenuItem value="Option 2">Option 2</MenuItem>
                  </Select> */}
                  <Autocomplete
                    disablePortal
                    value={row.productName}
                    onChange={(event, newValue) => {
                      handleInputChange(index, 'productName', newValue);
                    }}
                    options={["Option 1", "Option 2"]}
                    sx={{ width: 275 }}
                    renderInput={(params) => <TextField
                      {...params}
                      variant="standard"
                      size="small"
                    />}
                  />
                </FormControl>
              </TableCell>
              <TableCell>
                <TextField
                  InputProps={{ disableUnderline: true }}
                  value={row.productId}
                  onChange={(e) => handleInputChange(index, 'productId', e.target.value)}
                  variant="standard"
                  size="small"
                />
              </TableCell>
              <TableCell>
                <TextField
                  InputProps={{ disableUnderline: true }}
                  type="number"
                  value={row.quantity}
                  onChange={(e) => handleInputChange(index, 'quantity', e.target.value)}
                  variant="standard"
                  size="small"
                />
              </TableCell>
              <TableCell>
                <TextField
                  InputProps={{ disableUnderline: true }}
                  type="number"
                  value={row.rate}
                  onChange={(e) => handleInputChange(index, 'rate', e.target.value)}
                  variant="standard"
                  size="small"
                />
              </TableCell>
              <TableCell>{row.amount}</TableCell>
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
      <button
        className='flex flex-row gap-2 items-center font-semibold rounded-xl text-orange-700 bg-orange-50 w-fit px-4 py-3 shadow-md m-4'
        onClick={handleAddRow}
      >
        <IoMdAdd />
        {'Add Row'}
      </button>
    </TableContainer>
  );
};

export default RealTimeInputTable;
