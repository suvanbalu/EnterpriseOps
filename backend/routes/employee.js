import express from 'express';
import Employee from '../models/Employee'; 

const router = express.Router();

router.post('/add', async (req, res) => {
  try {
    const {
      employeeId,
      name,
      empType,
      dateOfJoining,
      dateOfLeaving,
      salary,
    } = req.body;

    
    if (!employeeId || !name || !empType || !dateOfJoining || !salary) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    
    const newEmployee = new Employee({
      employeeId,
      name,
      empType,
      dateOfJoining,
      dateOfLeaving,
      salary,
    });

    
    const savedEmployee = await newEmployee.save();

    res.status(201).json(savedEmployee);
  } catch (error) {
    console.error('Error adding employee:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete('/delete/:employeeId', async (req, res) => {
  try {
    const { employeeId } = req.params;

    
    if (!employeeId) {
      return res.status(400).json({ error: 'Invalid employee ID' });
    }

    
    const deleteResult = await Employee.findOneAndDelete({ employeeId });

    
    if (!deleteResult) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    res.json({ message: 'Employee deleted successfully' });
  } catch (error) {
    console.error('Error deleting employee:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.put('/update/:employeeId', async (req, res) => {
  try {
    const updatedData = req.body;
    const { employeeId } = req.params;

    
    if (!employeeId || Object.keys(updatedData).length === 0) {
      return res.status(400).json({ error: 'Invalid employee ID or no update data provided' });
    }

    
    const updateResult = await Employee.findOneAndUpdate({ employeeId }, updatedData, { new: true });

    
    if (!updateResult) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    res.json({ message: `Employee with ID ${employeeId} updated successfully`, updatedEmployee: updateResult });
  } catch (error) {
    console.error('Error updating employee:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.put('/change-salary/:employeeId', async (req, res) => {
  try {
    const { employeeId } = req.params;
    const { newSalary } = req.body;

    
    if (!employeeId || !newSalary) {
      return res.status(400).json({ error: 'Invalid employee ID or new salary not provided' });
    }

    
    const employee = await Employee.findOne({ employeeId });

    
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    
    employee.salary = newSalary;
    employee.salaryHistory.push({ date: new Date(), salary: newSalary });

    
    const updatedEmployee = await employee.save();

    res.json({ message: `Salary for employee with ID ${employeeId} changed successfully`, updatedEmployee });
  } catch (error) {
    console.error('Error changing salary:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
