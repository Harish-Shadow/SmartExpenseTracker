import  supabase  from '../config/supabaseClient.js';

/**
 * Add a new expense
 */
export async function addExpense({ user_id, title, amount, category, date }) {
  const { data, error } = await supabase
    .from('expenses')
    .insert([
      {
        user_id,
        title,
        amount,
        category,
        date: date || new Date().toISOString().split('T')[0],
      },
    ])
    .select()
    .single();

  if (error) {
    console.error('Error adding expense:', error.message);
    return { expense: null, error };
  }

  return { expense: data, error: null };
}

/**
 * Get all expenses for a user, sorted by latest date
 */
export async function getExpensesByUser(user_id) {
  const { data, error } = await supabase
    .from('expenses')
    .select('*')
    .eq('user_id', user_id)
    .order('date', { ascending: false });

  if (error) {
    console.error('Error fetching expenses:', error.message);
    return { expenses: [], error };
  }

  return { expenses: data, error: null };
}

/**
 * Delete an expense by ID
 */
export async function deleteExpenseById(id) {
  const { error } = await supabase.from('expenses').delete().eq('id', id);

  if (error) {
    console.error('Error deleting expense:', error.message);
    return { success: false, error };
  }

  return { success: true, error: null };
}
