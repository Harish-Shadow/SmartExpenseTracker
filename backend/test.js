import { supabase } from './src/config/supabaseClient.js';

async function testSupabase() {
  const { data, error } = await supabase
    .from('expenses')
    .select('*')
    .limit(1);

  if (error) console.error("❌ Supabase fetch failed:", error.message);
  else console.log("✅ Supabase connection successful:", data);
}

testSupabase();
