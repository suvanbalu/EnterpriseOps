import React, { useState } from 'react';
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Collapse,
  Box,
  Typography,
  Paper,
  IconButton,
  TextField,
  InputAdornment,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import SearchIcon from '@mui/icons-material/Search';


const CollapsibleTable = ({ data }) => {
  const [openRows, setOpenRows] = useState([]);
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [innerSortBy, setInnerSortBy] = useState('');
  const [innerSortOrder, setInnerSortOrder] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleToggleCollapse = (index) => {
    const isOpen = openRows.includes(index);
    const newOpenRows = isOpen
      ? openRows.filter((rowIndex) => rowIndex !== index)
      : [...openRows, index];
    setOpenRows(newOpenRows);
  };

  const handleSort = (column, isInnerTable = false) => {
    const currentSortBy = isInnerTable ? innerSortBy : sortBy;
    const currentSortOrder = isInnerTable ? innerSortOrder : sortOrder;

    if (currentSortBy === column) {
      isInnerTable
        ? setInnerSortOrder(currentSortOrder === 'asc' ? 'desc' : 'asc')
        : setSortOrder(currentSortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      isInnerTable ? setInnerSortBy(column) : setSortBy(column);
      isInnerTable ? setInnerSortOrder('asc') : setSortOrder('asc');
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredData = data
    .filter((row) => {
      if (!searchQuery) return true;
      const searchString = searchQuery.toLowerCase();
      return (
        row.billNumber.toLowerCase().includes(searchString) ||
        row.date.toLowerCase().includes(searchString) ||
        String(row.totalAmount).includes(searchString) ||
        row.details.some((detail) =>
          Object.values(detail).some((value) =>
            String(value).toLowerCase().includes(searchString)
          )
        )
      );
    })
    .sort((a, b) => {
      if (!sortBy) return 0;

      const compareValueA = a[sortBy];
      const compareValueB = b[sortBy];

      if (compareValueA < compareValueB) {
        return sortOrder === 'asc' ? -1 : 1;
      } else if (compareValueA > compareValueB) {
        return sortOrder === 'asc' ? 1 : -1;
      } else {
        return 0;
      }
    });

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex flex-row gap-2 justify-between items-end'>
        <TextField
          label="Search"
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
            sx: { borderRadius: 3 }
          }}
        />

        <div className='flex flex-col gap-1 text-right w-1/4'>
          <p className='text-xs text-gray-700'>Total Entries</p>
          <p className='text-2xl font-semibold'>{Object.keys(data).length}</p>
        </div>
      </div>
      <TableContainer component={Paper}>
        <Table size="small" dense>
          <TableHead>
            <TableRow>
              <TableCell>S.No.</TableCell>
              <TableCell onClick={() => handleSort('billNumber')}>
                Bill Number
                {sortBy === 'billNumber' && (
                  <span>&nbsp;{sortOrder === 'asc' ? '↑' : '↓'}</span>
                )}
              </TableCell>
              <TableCell onClick={() => handleSort('date')}>Date</TableCell>
              <TableCell onClick={() => handleSort('totalAmount')}>
                Total Amount
                {sortBy === 'totalAmount' && (
                  <span>&nbsp;{sortOrder === 'asc' ? '↑' : '↓'}</span>
                )}
              </TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((row, index) => {
              const filteredRow = row.details
                .sort((a, b) => {
                  if (!innerSortBy) return 0;

                  const compareValueA = a[innerSortBy];
                  const compareValueB = b[innerSortBy];

                  if (compareValueA < compareValueB) {
                    return innerSortOrder === 'asc' ? -1 : 1;
                  } else if (compareValueA > compareValueB) {
                    return innerSortOrder === 'asc' ? 1 : -1;
                  } else {
                    return 0;
                  }
                });

              return (
                <React.Fragment key={index}>
                  <TableRow>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{row.billNumber}</TableCell>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>{row.totalAmount}</TableCell>
                    <TableCell>
                      <IconButton
                        size="small"
                        onClick={() => handleToggleCollapse(index)}
                      >
                        {openRows.includes(index) ? (
                          <KeyboardArrowUpIcon />
                        ) : (
                          <KeyboardArrowDownIcon />
                        )}
                      </IconButton>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={5} className='bg-gray-50'>
                      <Collapse
                        in={openRows.includes(index)}
                        timeout="auto"
                        unmountOnExit
                      >
                        <Box sx={{ margin: 1 }}>
                          <Typography
                            variant="h6"
                            gutterBottom
                            component="div"
                          >
                            Purchase Details
                          </Typography>
                          <Table
                            size="small"
                            aria-label="purchase-details"
                            dense
                          >
                            <TableHead>
                              <TableRow>
                                <TableCell>S.No.</TableCell>
                                <TableCell
                                  onClick={() => handleSort('productId', true)}
                                >
                                  Product ID
                                  {innerSortBy === 'productId' && (
                                    <span>&nbsp;{innerSortOrder === 'asc' ? '↑' : '↓'}</span>
                                  )}
                                </TableCell>
                                <TableCell
                                  onClick={() => handleSort('productName', true)}
                                  className={``}
                                >
                                  Product Name
                                  {innerSortBy === 'productName' && (
                                    <span>&nbsp;{innerSortOrder === 'asc' ? '↑' : '↓'}</span>
                                  )}
                                </TableCell>
                                <TableCell
                                  onClick={() => handleSort('quantity', true)}
                                >
                                  Quantity
                                  {innerSortBy === 'quantity' && (
                                    <span>&nbsp;{innerSortOrder === 'asc' ? '↑' : '↓'}</span>
                                  )}
                                </TableCell>
                                <TableCell
                                  onClick={() => handleSort('rate', true)}
                                >
                                  Rate
                                  {innerSortBy === 'rate' && (
                                    <span>&nbsp;{innerSortOrder === 'asc' ? '↑' : '↓'}</span>
                                  )}
                                </TableCell>
                                <TableCell
                                  onClick={() => handleSort('amount', true)}
                                >
                                  Amount
                                  {innerSortBy === 'amount' && (
                                    <span>&nbsp;{innerSortOrder === 'asc' ? '↑' : '↓'}</span>
                                  )}
                                </TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {filteredRow.map((detail, detailIndex) => (
                                <TableRow key={detailIndex}>
                                  <TableCell>{detailIndex + 1}</TableCell>
                                  <TableCell>{detail.productId}</TableCell>
                                  <TableCell>{detail.productName}</TableCell>
                                  <TableCell>{detail.quantity}</TableCell>
                                  <TableCell>{detail.rate}</TableCell>
                                  <TableCell>{detail.amount}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              )
            }
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CollapsibleTable;
