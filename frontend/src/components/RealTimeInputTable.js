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
import CustomButton from './CustomButton';
import axios from 'axios';
import { PRODUCT_URL } from '../API/calls';

const RealTimeInputTable = ({ tableState = ["", (e) => { }] }) => {
  const [tableData, setTableData] = tableState;
  const [products, setProducts] = useState([]);
  const [productNames, setProductNames] = useState([]);

  const handleInputChange = (index, field, value) => {
    const newData = [...tableData];
    newData[index][field] = value;

    if (field === 'productName') {
      const element = products.filter((item) => item.productName === value)[0]
      console.log(element)
      newData[index].p_id = element?.p_id;
      newData[index].rateOfProduct = element?.price;
    }

    // Update the 'amount' field based on changes in 'quantity' or 'rate'
    if (field === 'quantity' || field === 'rateOfProduct') {
      newData[index].amount = calculateAmount(newData[index].quantity, newData[index].rateOfProduct);
    }

    setTableData(newData);
  };

  useEffect(() => {
    axios.get(`${PRODUCT_URL}/getproducts`)
      .then((res) => {
        setProducts(res.data);
        setProductNames(res.data.map((item) => item.productName))
      })
  }, [])

  useEffect(() => {
    const newData = [...tableData];

    newData.forEach((item) => {
      item.amount = calculateAmount(item.quantity, item.rateOfProduct);
    })
  }, [tableState])

  const handleAddRow = () => {
    setTableData([
      ...tableData,
      { p_id: '', productName: '', quantity: '', rateOfProduct: '', amount: '' },
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
            <TableCell style={{ fontWeight: "bold" }}>Product Name</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>Product ID</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>Quantity</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>Rate</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((row, index) => (
            <TableRow key={index}>
              <TableCell>
                <FormControl fullWidth>
                  <Autocomplete
                    value={row.productName}
                    onChange={(event, newValue) => {
                      handleInputChange(index, 'productName', newValue);
                    }}
                    options={productNames}
                    sx={{ width: 400 }}
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
                  value={row.p_id}
                  onChange={(e) => handleInputChange(index, 'p_id', e.target.value)}
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
                  value={row.rateOfProduct}
                  onChange={(e) => handleInputChange(index, 'rateOfProduct', e.target.value)}
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
      <CustomButton
        className={'!text-sm m-4'}
        onClick={handleAddRow}
        icon={<IoMdAdd />}
        text={'Add Row'}
      />
    </TableContainer>
  );
};

export default RealTimeInputTable;

// import React, { useState } from 'react';
// import {
//   Table,
//   TableContainer,
//   TableHead,
//   TableBody,
//   TableRow,
//   TableCell,
//   TextField,
//   Paper,
//   Button,
//   buttonBaseClasses,
// } from '@mui/material';

// const RealTimeInputTable = ({shared, setShared}) => {
//   const [tableData, setTableData] = useState([{ productId: '', productName: '', quantity: '', rate: '', amount: '' }]);

//   const handleInputChange = (index, field, value) => {
//     const newData = [...tableData];
//     newData[index][field] = value;
//     setTableData(newData);
//     setShared(newData);
//   };

//   const handleAddRow = () => {
//     setTableData([...tableData, { productId: '', quantity: '', amount: '' }]);
//   };

//   return (
//     <TableContainer component={Paper}>
//       <Table>
//         <TableHead>
//           <TableRow >
//             <TableCell style={{fontWeight:"bold"}}>Product ID</TableCell>
//             <TableCell style={{fontWeight:"bold"}}>Quantity</TableCell>
//             <TableCell style={{fontWeight:"bold"}}>Amount</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {tableData.map((row, index) => (
//             <TableRow key={index}>
//               <TableCell>
//                 <TextField
//                   value={row.productId}
//                   onChange={(e) => handleInputChange(index, 'productId', e.target.value)}
//                 />
//               </TableCell>
//               <TableCell>
//                 <TextField
//                   value={row.quantity}
//                   onChange={(e) => handleInputChange(index, 'quantity', e.target.value)}
//                 />
//               </TableCell>
//               <TableCell>
//                 <TextField
//                   value={row.amount}
//                   onChange={(e) => handleInputChange(index, 'amount', e.target.value)}
//                 />
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//       <Button onClick={handleAddRow} variant="contained" color="primary">
//         Add Row
//       </Button>
//     </TableContainer>
//   );
// };

// export default RealTimeInputTable;
