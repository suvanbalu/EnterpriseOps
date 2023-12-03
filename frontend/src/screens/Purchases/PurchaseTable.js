// PurchaseTable.js
import React, { useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, TextField } from '@mui/material';
import TableComp from '../../components/TableComp';
import { IoSearch } from 'react-icons/io5';

const rows = [
  {
    pbillno: 'PB001',
    date: '2022-12-01',
    totalAmount: 500,
    details: [
      { product_name: 'P001', quantity: 2, rateOfProduct: 200 },
      { product_name: 'P002', quantity: 3, rateOfProduct: 100 },
    ],
  },
  {
    pbillno: 'PB002',
    date: '2023-12-01',
    totalAmount: 700,
    details: [
      { product_name: 'P001', quantity: 2, rateOfProduct: 200 },
      { product_name: 'P002', quantity: 3, rateOfProduct: 100 },
    ],
  },
  // Add more rows as needed
];


function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort, headCells } = props;

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell />
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            style={{ fontWeight: 'bold' }}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.disableSorting ? (
              headCell.label
            ) : (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
              </TableSortLabel>
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const headCells = [
  { id: 'pbillno', label: 'Purchase Bill No.' },
  { id: 'date', label: 'Date' },
  { id: 'totalAmount', label: 'Total Amount' },
];

function PurchaseTable() {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('pbillno');
  const [searchText, setSearchText] = useState('');

  const [innerOrder, setInnerOrder] = useState('asc');
  const [innerOrderBy, setInnerOrderBy] = useState('product_name');

  const handleInnerRequestSort = (event, property) => {
    const isAsc = innerOrderBy === property && innerOrder === 'asc';
    setInnerOrder(isAsc ? 'desc' : 'asc');
    setInnerOrderBy(property);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const filteredRows = rows.filter((row) => {
    // Convert all values to lowercase for case-insensitive comparison
    const searchLower = searchText.toLowerCase();

    // Check if any field matches the search text
    return (
      row.pbillno.toLowerCase().includes(searchLower) ||
      row.date.toLowerCase().includes(searchLower) ||
      row.totalAmount.toString().toLowerCase().includes(searchLower) ||
      row.details.some(detail =>
        detail.product_name.toLowerCase().includes(searchLower) ||
        detail.quantity.toString().toLowerCase().includes(searchLower) ||
        detail.rateOfProduct.toString().toLowerCase().includes(searchLower)
      )
    );
  });


  const sortedRows = stableSort(filteredRows, getComparator(order, orderBy));

  return (
    <div>
      <div className='flex flex-row gap-6 mt-4 mb-8 justify-end'>
        <input
          className='p-3 rounded-xl bg-gray-100 w-1/2 outline-0'
          placeholder='Search'
          value={searchText}
          onChange={handleSearchChange}
        />
        <button
          onClick={() => {

          }}
        >
          <IoSearch className='text-2xl text-gray-500' />
        </button>
      </div>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <EnhancedTableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            headCells={headCells}
            // style={{fontWeight:'bold'}}
          />
          <TableBody>
            {sortedRows.map((row, index) => (
              <TableComp key={index} row={row} onRequestInnerSort={handleInnerRequestSort} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default PurchaseTable;
