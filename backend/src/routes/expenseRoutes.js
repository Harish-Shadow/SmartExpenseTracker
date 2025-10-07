import express from 'express';
import { addExpenseController, getExpensesController, deleteExpenseController } from '../controllers/expenseController.js';

const router = express.Router();

router.post('/add', addExpenseController);
router.get('/', getExpensesController);
router.delete('/:id', deleteExpenseController);



export default router;
