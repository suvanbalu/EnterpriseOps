// TableComp.js
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  TableRow,
  TableCell,
  IconButton,
  Collapse,
  Box,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableSortLabel,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const innerHeadCells = [
  { id: 'product_name', label: 'Product Name' },
  { id: 'quantity', label: 'Quantity' },
  { id: 'rateOfProduct', label: 'Rate' },
];

function InnerTable({ rows, order, orderBy, onRequestSort }) {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <Table size="small" aria-label="purchase-details">
      <TableHead>
        <TableRow>
          {innerHeadCells.map((headCell) => (
            <TableCell key={headCell.id} style={{fontWeight:"bold"}}>
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row, index) => (
          <TableRow key={index}>
            <TableCell>{row.product_name}</TableCell>
            <TableCell>{row.quantity}</TableCell>
            <TableCell>{row.rateOfProduct}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function TableComp({ row, innerOrder, innerOrderBy, onRequestInnerSort }) {
  const [open, setOpen] = useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{row.pbillno}</TableCell>
        <TableCell>{row.date}</TableCell>
        <TableCell>{row.totalAmount}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4} className='bg-gray-50'>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Purchase Details
              </Typography>
              <InnerTable
                rows={row.details}
                order={innerOrder}
                orderBy={innerOrderBy}
                onRequestSort={onRequestInnerSort}
              />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

TableComp.propTypes = {
  row: PropTypes.shape({
    pbillno: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    totalAmount: PropTypes.number.isRequired,
    details: PropTypes.arrayOf(
      PropTypes.shape({
        product_id: PropTypes.string.isRequired,
        quantity: PropTypes.number.isRequired,
        rateOfProduct: PropTypes.number.isRequired,
      })
    ).isRequired,
  }).isRequired,
  innerOrder: PropTypes.oneOf(['asc', 'desc']).isRequired,
  innerOrderBy: PropTypes.string.isRequired,
  onRequestInnerSort: PropTypes.func.isRequired,
};

export default TableComp;
