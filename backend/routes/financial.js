import express from 'express';
import Financial from '../models/Financial.js'; 

const router = express.Router();


router.post('/add-financial', async (req, res) => {
  try {
    const financialEntries = req.body;

    // Validate the array of financial entries
    if (!Array.isArray(financialEntries) || financialEntries.length === 0) {
      return res.status(400).json({ error: 'Invalid financial entries' });
    }

    // Validate each financial entry in the array
    for (const entry of financialEntries) {
      const { date, description, amount, category, credit_flag } = entry;
      if (!date || !description || !amount || !category || credit_flag === undefined) {
        return res.status(400).json({ error: 'Invalid financial entry' });
      }
    }

    // Use insertMany to add multiple financial entries to the database
    const insertedEntries = await Financial.insertMany(financialEntries);

    res.status(201).json(insertedEntries);
  } catch (error) {
    console.error('Error adding multiple financial entries:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.put('/update-financial/:id', async (req, res) => {
  try {
    const { date, description, amount, category, credit_flag } = req.body;
    const { id } = req.params;

    
    if (!date || !description || !amount || !category || credit_flag === undefined) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    
    const existingEntry = await Financial.findById(id);

    
    if (!existingEntry) {
      return res.status(404).json({ error: 'Entry not found' });
    }

    existingEntry.date = date;
    existingEntry.description = description;
    existingEntry.amount = amount;
    existingEntry.category = category;
    existingEntry.credit_flag = credit_flag;

    const updatedEntry = await existingEntry.save();

    res.status(200).json(updatedEntry);
  } catch (error) {
    console.error('Error updating financial entry:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/get-financial', async (req, res) => {
  try {
    // Retrieve all financial entries from the database
    const allEntries = await Financial.find();

    res.status(200).json(allEntries);
  } catch (error) {
    console.error('Error fetching all financial entries:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router; 