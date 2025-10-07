// src/controllers/expenseController.js
import { addExpense, getExpensesByUser, deleteExpenseById } from '../models/expenseModel.js';

// ➕ Add expense controller
export async function addExpenseController(req, res) {
  try {
    // Accept both "title" and "description" to avoid null errors
    const { user_id, title, description, amount, category, date } = req.body;

    // Ensure title always has a value
    const expenseTitle = title || description || 'Untitled Expense';

    const { expense, error } = await addExpense({
      user_id,
      title: expenseTitle,
      amount,
      category,
      date,
    });

    if (error) throw error;

    res.status(201).json(expense);
  } catch (err) {
    console.error('❌ Error adding expense:', err.message);
    res.status(400).json({ error: err.message });
  }
}

// 📋 Get all expenses for a user
export async function getExpensesController(req, res) {
  try {
    const { user_id } = req.query;
    const { expenses, error } = await getExpensesByUser(user_id);

    if (error) throw error;
    res.status(200).json(expenses);
  } catch (err) {
    console.error('❌ Error fetching expenses:', err.message);
    res.status(400).json({ error: err.message });
  }
}

// ❌ Delete expense
export async function deleteExpenseController(req, res) {
  try {
    const { id } = req.params;
    const { error } = await deleteExpenseById(id);

    if (error) throw error;
    res.status(204).send();
  } catch (err) {
    console.error('❌ Error deleting expense:', err.message);
    res.status(400).json({ error: err.message });
  }
}
