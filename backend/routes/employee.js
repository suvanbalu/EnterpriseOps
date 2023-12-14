import express from 'express';
import Employee from '../models/Employee.js';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat.js';

dayjs.extend(customParseFormat);
const router = express.Router();

router.post("/add-employees", async (req, res) => {
  try {

    if (!req.body || !Array.isArray(req.body) || req.body.length === 0) {
      return res.status(400).json({ error: "Invalid or empty request body" });
    }


    const addedEmployees = await Employee.insertMany(req.body);


    if (addedEmployees.length === 0) {
      return res.status(500).json({ error: "No employees were added" });
    }

    res.status(201).json(addedEmployees);
  } catch (error) {

    if (error.code === 11000 && error.keyPattern && error.keyPattern.employeeId) {
      return res.status(409).json({ error: "Employee with the same ID already exists" });
    }

    console.error("Error adding employees:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


router.delete('/delete-employee/:_id', async (req, res) => {
  try {
    const { _id } = req.params;

    if (!_id) {
      return res.status(400).json({ error: 'Invalid employee ID' });
    }

    const deleteResult = await Employee.findByIdAndDelete(_id);

    if (!deleteResult) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    res.json({ message: 'Employee deleted successfully' });
  } catch (error) {
    console.error('Error deleting employee:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.put('/update-employee/:Id', async (req, res) => {
  try {
    const updatedData = req.body;
    const { Id } = req.params;


    if (!Id || Object.keys(updatedData).length === 0) {
      return res.status(400).json({ error: 'Invalid employee ID or no update data provided' });
    }


    const updateResult = await Employee.findByIdAndUpdate(Id, updatedData, { new: true });


    if (!updateResult) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    res.json({ message: `Employee with ID ${Id} updated successfully`, updatedEmployee: updateResult });
  } catch (error) {
    console.error('Error updating employee:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/get-employees', async (req, res) => {
  try {
    const employees = await Employee.find();
    // const updated = employees.map((item) => ({
    //   ...item._doc,
    //   "dateOfJoining": dayjs(item.dateOfJoining).format("MM-DD-YYYY"),
    //   "dateOfLeaving": item.dateOfLeaving ? dayjs(item.dateOfLeaving).format("MM-DD-YYYY") : "",
    // }));
    res.status(200).json(employees);
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/get-employee/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findById(id);

    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    // const updatedEmployee = {
    //   ...employee._doc,
    //   dateOfJoining: dayjs(employee.dateOfJoining).format("MM-DD-YYYY"),
    //   dateOfLeaving: employee.dateOfLeaving ? dayjs(employee.dateOfLeaving).format("MM-DD-YYYY") : "",
    // };

    res.status(200).json(employee);
  } catch (error) {
    console.error('Error fetching employee:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/get-employees-by-psr/:psr', async (req, res) => {
  try {
    const psr = req.params.psr;
    const employees = await Employee.find({
      empType: { $in: [psr, 'Driver'] },
      $or: [
        { dateOfLeaving: null },
        { dateOfLeaving: { $gte: new Date() } },
      ],
    });

    if (employees.length === 0) {
      return res.status(404).json({ error: 'Employees not found' });
    }

    employees.sort((a, b) => {
      if (a.empType === 'Driver') {
        return 1;
      } else if (b.empType === 'Driver') {
        return -1;
      } else {
        return 0;
      }
    });

    res.status(200).json(employees);
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
