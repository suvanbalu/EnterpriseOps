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
} from '@mui/material';

const RealTimeInputTable = () => {
  const [tableData, setTableData] = useState([{ productId: '', productName: '', quantity: '', rate: '', amount: '' }]);

  const handleInputChange = (index, field, value) => {
    const newData = [...tableData];
    newData[index][field] = value;
    setTableData(newData);
  };

  const handleAddRow = () => {
    setTableData([...tableData, { productId: '', productName: '', quantity: '', rate: '', amount: '' }]);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Product ID</TableCell>
            <TableCell>Product Name</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Rate</TableCell>
            <TableCell>Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((row, index) => (
            <TableRow key={index}>
              <TableCell>
                <TextField
                  value={row.productId}
                  onChange={(e) => handleInputChange(index, 'productId', e.target.value)}
                />
              </TableCell>
              <TableCell>
                <TextField
                  value={row.productName}
                  onChange={(e) => handleInputChange(index, 'productName', e.target.value)}
                />
              </TableCell>
              <TableCell>
                <TextField
                  value={row.quantity}
                  onChange={(e) => handleInputChange(index, 'quantity', e.target.value)}
                />
              </TableCell>
              <TableCell>
                <TextField value={row.rate} onChange={(e) => handleInputChange(index, 'rate', e.target.value)} />
              </TableCell>
              <TableCell>
                <TextField
                  value={row.amount}
                  onChange={(e) => handleInputChange(index, 'amount', e.target.value)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button onClick={handleAddRow} variant="contained" color="primary">
        Add Row
      </Button>
    </TableContainer>
  );
};

export default RealTimeInputTable;
