import bcrypt from "bcrypt";
import supabase from "../config/supabaseClient.js";

export const createUser = async (username, email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const { error } = await supabase.from("users").insert([
    {
      username,
      email,
      password_hash: hashedPassword,
      created_at: new Date(),
    },
  ]);

  if (error) throw error;
};

export const findUserByEmail = async (email) => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (error && error.code !== "PGRST116") throw error; // Ignore "no rows found"
  return data;
};
