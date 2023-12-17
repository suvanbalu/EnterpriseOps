import express from 'express';
import Employee from '../models/Employee.js';
import Financial from '../models/Financial.js';
import Party from '../models/Party.js';
import Product from '../models/Product.js';
import Purchase from '../models/Purchase.js';
import Sale from '../models/Sale.js';
import SalesCollection from '../models/SalesCollection.js';

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat.js';

dayjs.extend(customParseFormat);
const router = express.Router();

// Route for getting total sales, purchase, credit in sales, credit in financial and debit in financial with respect to the following filters to find the total:
// 1D, 1W, 1M, 3M, 6M, 1Y, All



export default router;