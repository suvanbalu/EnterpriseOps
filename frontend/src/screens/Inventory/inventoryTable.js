import React, { useState, useMemo } from 'react';
import {
  Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper, IconButton, TextField, InputAdornment,
} from '@mui/material';
import { MdOutlineEdit, MdDelete } from "react-icons/md";
import SearchIcon from '@mui/icons-material/Search';
import { FaArrowUpShortWide, FaArrowDownWideShort } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';


const InventoryTable = ({ data }) => {
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const filteredData = useMemo(() => {
    return data
      .filter((product) => {
        return (
          product.productName.toLowerCase().includes(searchQuery) ||
          product.category.toLowerCase().includes(searchQuery) ||
          product.unit.toLowerCase().includes(searchQuery) ||
          String(product.price).includes(searchQuery)||
          String(product.quantity).includes(searchQuery)
        );
      })
      .sort((a, b) => {
        if (!sortBy) return 0;
        if (a[sortBy] < b[sortBy]) {
          return sortOrder === 'asc' ? -1 : 1;
        } else if (a[sortBy] > b[sortBy]) {
          return sortOrder === 'asc' ? 1 : -1;
        } else {
          return 0;
        }
      });
  }, [data, sortBy, sortOrder, searchQuery]);

  return (
    <div className='flex flex-col gap-6'>
      <TextField
        label="Search Products"
        variant="outlined"
        margin="normal"
        className='w-1/3'
        value={searchQuery}
        onChange={handleSearchChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      <TableContainer component={Paper}>
        <Table size="small" dense>
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: "bold", width: 100 }}>S.No.</TableCell>
              <TableCell style={{ fontWeight: "bold", width: 200 }} onClick={() => handleSort('productName')}>Product Name</TableCell>
              <TableCell style={{ fontWeight: "bold", width: 100 }} onClick={() => handleSort('category')}>Category</TableCell>
              <TableCell style={{ fontWeight: "bold", width: 100 }} onClick={() => handleSort('price')}>Price</TableCell>
              <TableCell style={{ fontWeight: "bold", width: 100 }} onClick={() => handleSort('quantity')}>Quantity</TableCell>
              <TableCell style={{ fontWeight: "bold", width: 100 }} onClick={() => handleSort('unit')}>Unit</TableCell>
              <TableCell style={{ fontWeight: "bold", width: 50 }}>SGST</TableCell>
              <TableCell style={{ fontWeight: "bold", width: 50 }}>CGST</TableCell>
              <TableCell style={{ fontWeight: "bold", width: 50 }}>CESS</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((product, index) => (
              <TableRow key={product.p_id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{product.productName}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{`Rs. ${product.price}`}</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>{product.unit}</TableCell>
                <TableCell>{product.taxInfo.SGST} </TableCell>
                <TableCell>{product.taxInfo.CGST}</TableCell>
                <TableCell>{product.taxInfo.CESS}</TableCell>
                <TableCell>
                  <button
                    className='text-lg text-gray-600 hover:bg-gray-100 rounded-full p-2'
                    onClick={() => navigate(`/products/edit/${product.p_id}`)}
                  >
                    <MdOutlineEdit />
                  </button>
                  <button className='text-lg text-gray-600 hover:bg-red-100 rounded-full p-2'
                          onClick={() => {
                            if (window.confirm("Confirm Delete ?")) {
                              data.splice(index, 1);
                              window.location.reload();
                            }
                            // ADD THIS PART AFTER FINISHING BACKEND
                          }}
                        >
                          <MdDelete />
                        </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default InventoryTable;
