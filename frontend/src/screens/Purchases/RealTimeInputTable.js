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
  buttonBaseClasses,
} from '@mui/material';

const RealTimeInputTable = () => {
  const [tableData, setTableData] = useState([{ productId: '', productName: '', quantity: '', rate: '', amount: '' }]);

  const handleInputChange = (index, field, value) => {
    const newData = [...tableData];
    newData[index][field] = value;
    setTableData(newData);
  };

  const handleAddRow = () => {
    setTableData([...tableData, { productId: '', quantity: '', amount: '' }]);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow >
            <TableCell style={{fontWeight:"bold"}}>Product ID</TableCell>
            <TableCell style={{fontWeight:"bold"}}>Quantity</TableCell>
            <TableCell style={{fontWeight:"bold"}}>Amount</TableCell>
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
                  value={row.quantity}
                  onChange={(e) => handleInputChange(index, 'quantity', e.target.value)}
                />
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
