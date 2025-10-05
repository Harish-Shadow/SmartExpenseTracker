import supabase from '../config/supabaseClient.js';

// Find a user by email
export async function findUserByEmail(email) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();
    return { user: data, error };
}

// Create a new user
export async function createUser({ username, email, password }) {
    const { data, error } = await supabase
      .from('users')
      .insert([{ username, email, password }])
      .single();
    return { user: data, error };
}
