// /storage/emulated/0/Documents/XenonCash/XenonCash/frontend/lib/Supabase.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase URL or Anon Key in .env.local');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const signInWithEmail = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw new Error(error.message);
  return data;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
  localStorage.removeItem('token'); // Synchronise avec ton auth.js si utilisé
  localStorage.removeItem('userId');
  return true;
};

export const getUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};

export const insertData = async (table, data) => {
  const { data: result, error } = await supabase.from(table).insert(data);
  if (error) throw new Error(error.message);
  return result;
};

export const selectData = async (table, query = {}) => {
  const { data, error } = await supabase
    .from(table)
    .select('*')
    .eq('user_id', query.userId || localStorage.getItem('userId'))
    .range(query.start || 0, query.end || 9); // Pagination basique
  if (error) throw new Error(error.message);
  return data;
};

export const updateData = async (table, id, data) => {
  const { data: result, error } = await supabase
    .from(table)
    .update(data)
    .eq('id', id);
  if (error) throw new Error(error.message);
  return result;
};