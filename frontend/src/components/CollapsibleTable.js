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
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import SearchIcon from '@mui/icons-material/Search';
import { MdOutlineEdit, MdDelete } from "react-icons/md";
import { FaArrowUpShortWide, FaArrowDownWideShort } from "react-icons/fa6";
import { IoMdClose } from 'react-icons/io';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useNavigate } from 'react-router-dom';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';
import HighlightedNumber from './HighlightedNumber';
import axios from 'axios';
import utc from 'dayjs/plugin/utc';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { styled } from '@mui/system';
import CustomTextField from './CustomTextField';

dayjs.extend(customParseFormat)
dayjs.extend(utc);

const StyledTableContainer = styled(TableContainer)`
  position: relative;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 40px;
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(0, 0, 0, 0.1));
    pointer-events: none;
  }
`;

const CollapsibleTable = ({
  data,
  OuterTable = {},
  InnerTable = {},
  editUrl = '',
  deleteUrl = '',
  innerEditUrl = '',
  innerDeleteUrl = '',
  innerTableTitle = '',
  metadataTitle = '',
  metadataFunction = false,
  metadataTitle2 = '',
  metadataFunction2 = false,
  dateQuery = false,
}) => {
  const [openRows, setOpenRows] = useState([]);
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [innerSortBy, setInnerSortBy] = useState('');
  const [innerSortOrder, setInnerSortOrder] = useState('asc');
  const [searchQuery, setSearchQuery] = useState('');
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const navigate = useNavigate();

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

  const filteredData = data
    .filter((row) => {
      const searchString = searchQuery.toLowerCase();

      if (dateQuery) {
        if (!searchQuery) {
          const isInRange = (!startDate || !endDate || (
            (dayjs(row.date).isSame(startDate) || dayjs(row.date).isAfter(startDate)) &&
            (dayjs(row.date).isSame(endDate) || dayjs(row.date).isBefore(endDate))
          ));
          return isInRange;
        }

        const isInRange = (!startDate || !endDate || (
          (dayjs(row.date).isSame(startDate) || dayjs(row.date).isAfter(startDate)) &&
          (dayjs(row.date).isSame(endDate) || dayjs(row.date).isBefore(endDate))
        ));

        return (
          (isInRange &&
            (Object.values(row)?.some((value) =>
              String(value)?.toLowerCase().includes(searchString)
            ) ||
              row.details?.some((detail) =>
                Object.values(detail)?.some((value) =>
                  String(value)?.toLowerCase().includes(searchString)
                )
              )))
        );

      } else {
        return (
          (Object.values(row)?.some((value) =>
            String(value)?.toLowerCase().includes(searchString)
          ) ||
            row.details?.some((detail) =>
              Object.values(detail)?.some((value) =>
                String(value)?.toLowerCase().includes(searchString)
              )
            ))
        );
      }
    })
    .sort((a, b) => {
      if (!sortBy) return 0;

      const compareValueA =
        sortBy === 'date' ? dayjs(a[sortBy]) : a[sortBy];
      const compareValueB =
        sortBy === 'date' ? dayjs(b[sortBy]) : b[sortBy];

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
      <div className='flex flex-row gap-6 justify-between items-center'>
        <CustomTextField
          label='Search'
          className='w-1/3'
          valueState={[searchQuery, setSearchQuery]}
          icon={<SearchIcon />}
        />

        {dateQuery && (
          <div className='w-1/2 flex flex-row gap-2 items-center'>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker
                  value={startDate}
                  onChange={(newValue) => setStartDate(newValue)}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3, }, }}
                  label='Start Date'
                  format="DD-MMM-YYYY"
                  className='w-1/2'
                />
              </DemoContainer>
            </LocalizationProvider>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker
                  value={endDate}
                  onChange={(newValue) => setEndDate(newValue)}
                  disabled={!startDate}
                  minDate={startDate}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3, }, }}
                  label='End Date'
                  format="DD-MMM-YYYY"
                  className='w-1/2'
                />
              </DemoContainer>
            </LocalizationProvider>

            <div className='w-10'>
              {(startDate || endDate) && (
                <button
                  onClick={() => {
                    setStartDate(null);
                    setEndDate(null);
                  }}
                  className='text-xl hover:text-red-500 mt-2'>
                  <IoMdClose />
                </button>
              )}
            </div>
          </div>
        )}

        {metadataTitle && metadataFunction && (
          <HighlightedNumber
            className={'text-right w-1/6'}
            title={metadataTitle}
            value={metadataFunction(filteredData)}
          />
        )}

        {metadataTitle2 && metadataFunction2 && (
          <HighlightedNumber
            className={'text-right w-1/6'}
            title={metadataTitle2}
            value={metadataFunction2(filteredData)}
          />
        )}

        <HighlightedNumber
          className={'text-right w-1/6'}
          title={'Total Entries'}
          value={Object.keys(filteredData).length}
        />
      </div>

      <StyledTableContainer component={Paper}>
        <div className='max-h-[calc(100vh-14rem)] overflow-y-auto'>
          <Table size="small" dense stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: "bold", width: 50 }}>S.No.</TableCell>
                {
                  Object.keys(OuterTable).map((item) => (
                    <TableCell style={{ fontWeight: "bold", width: OuterTable[item][1] }}
                      onClick={() => handleSort(OuterTable[item][0])}
                      className='group'
                    >
                      {item}
                      {sortBy === OuterTable[item][0] ? (
                        sortOrder === 'asc' ? <FaArrowUpShortWide className='inline-block ml-2' /> : <FaArrowDownWideShort className='inline-block ml-2' />
                      ) : (
                        <FaArrowUpShortWide className='hidden group-hover:inline-block ml-2 text-gray-500' />
                      )}
                    </TableCell>
                  ))
                }
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((row, index) => {
                const filteredRow = row.details && row.details
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

                const firstElementKey = row[OuterTable[Object.keys(OuterTable)[0]][0]];

                return (
                  <React.Fragment key={index}>
                    <TableRow>
                      <TableCell>{index + 1}</TableCell>
                      {Object.keys(OuterTable).map((item) => (
                        <TableCell>{
                          OuterTable[item][0] === 'date' ? dayjs(row.date).format('DD-MMM-YYYY') :
                            OuterTable[item][0] === 'available' ? (row[OuterTable[item][0]] ? 'Yes' : 'No') :
                              OuterTable[item][0] === 'coordinate' ? <button className='hover:text-blue-500' onClick={() => {
                                // window.open(`https://www.google.com/maps/search/?api=1&query=${row[OuterTable[item][0]]}`, '_blank')
                                window.open(`http://www.google.com/maps/place/${row[OuterTable[item][0]]}`, '_blank')
                              }}>
                                {/* {row[OuterTable[item][0]]?.split(' ')[0]?.slice(0, 5)}
                                {'\n'}
                                {row[OuterTable[item][0]]?.split(' ')[1]?.slice(0, 5)} */}
                                {row[OuterTable[item][0]] && <LocationOnIcon />}
                              </button> :

                                row[OuterTable[item][0]]}</TableCell>
                      ))}
                      <TableCell>
                        <div className='flex items-center gap-2'>
                          {InnerTable && Object.keys(InnerTable).length > 0 && (
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
                          )}
                          {editUrl && (
                            <button className='text-lg text-gray-600 hover:bg-gray-100 rounded-full p-2'
                              onClick={() => {
                                navigate(`${editUrl}/${firstElementKey}`)
                              }}
                            >
                              <MdOutlineEdit />
                            </button>
                          )}
                          {deleteUrl && (
                            <button className='text-lg text-gray-600 hover:bg-red-100 rounded-full p-2'
                              onClick={() => {
                                if (window.confirm("Confirm Delete ?")) {

                                  axios.delete(`${deleteUrl}/${firstElementKey}`)
                                    .then((res) => {
                                      console.log(res)
                                      window.location.reload();
                                    })
                                    .catch((err) => {
                                      console.log(err)
                                    })
                                }
                              }}
                            >
                              <MdDelete />
                            </button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>

                    {InnerTable && Object.keys(InnerTable).length > 0 && row.details && (
                      <TableRow>
                        <TableCell colSpan={Object.keys(OuterTable).length + 2} className='bg-gray-50'>
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
                                fontWeight="600"
                              >
                                {innerTableTitle}
                              </Typography>
                              {/* <p className='text-xl font-semibold'>Purchase Details</p> */}
                              <Table
                                size="small"
                                aria-label="details"
                                dense
                              >
                                <TableHead>
                                  <TableRow>
                                    <TableCell style={{ fontWeight: "bold", width: 100 }}>S.No.</TableCell>
                                    {
                                      Object.keys(InnerTable).map((item) => (
                                        <TableCell style={{ fontWeight: "bold", width: InnerTable[item][1] }}
                                          onClick={() => handleSort(InnerTable[item][0], true)}
                                          className='group'
                                        >
                                          {item}
                                          {innerSortBy === InnerTable[item][0] ? (
                                            innerSortOrder === 'asc' ? <FaArrowUpShortWide className='inline-block ml-2' /> : <FaArrowDownWideShort className='inline-block ml-2' />
                                          ) : (
                                            <FaArrowUpShortWide className='hidden group-hover:inline-block ml-2 text-gray-500' />
                                          )}
                                        </TableCell>
                                      ))
                                    }
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {filteredRow.map((detail, detailIndex) => {
                                    const innerElementKey = detail[InnerTable[Object.keys(InnerTable)[0]][0]];

                                    return (
                                      <TableRow key={detailIndex}>
                                        <TableCell>{detailIndex + 1}</TableCell>
                                        {Object.keys(InnerTable).map((item) => (
                                          <TableCell>{InnerTable[item][0] === 'date' ? dayjs(detail[InnerTable[item][0]], 'MM/DD/YYYY').format('DD-MMM-YYYY') : detail[InnerTable[item][0]]}</TableCell>
                                        ))}
                                        <TableCell>
                                          <div className='flex items-center gap-2'>
                                            {innerEditUrl && (
                                              <button className='text-lg text-gray-600 hover:bg-gray-100 rounded-full p-2'
                                                onClick={() => {
                                                  navigate(`${innerEditUrl}/${innerElementKey}`)
                                                }}
                                              >
                                                <MdOutlineEdit />
                                              </button>
                                            )}
                                            {innerDeleteUrl && (
                                              <button className='text-lg text-gray-600 hover:bg-red-100 rounded-full p-2'
                                                onClick={() => {
                                                  if (window.confirm("Confirm Delete ?")) {
                                                    axios.delete(`${innerDeleteUrl}/${innerElementKey}`)
                                                      .then((res) => {
                                                        console.log(res)
                                                        window.location.reload();
                                                      })
                                                      .catch((err) => {
                                                        console.log(err)
                                                      })
                                                  }
                                                }}
                                              >
                                                <MdDelete />
                                              </button>
                                            )}
                                          </div>
                                        </TableCell>
                                      </TableRow>
                                    )
                                  }
                                  )}
                                </TableBody>
                              </Table>
                            </Box>
                          </Collapse>
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                )
              }
              )}
            </TableBody>
          </Table>
        </div>
      </StyledTableContainer>
    </div>
  );
};

export default CollapsibleTable;
