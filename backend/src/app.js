import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import  supabase  from './config/supabaseClient.js';

const app = express();

app.use(cors());
app.use(express.json());

// Health check route
app.get('/', (req, res) => {
  res.send('✅ Backend API is running!');
});

// Test Supabase connection
app.get('/test-supabase', async (req, res) => {
  try {
    const { data, error } = await supabase.from('users').select('*').limit(1);
    if (error) throw error;
    res.json({ message: 'Supabase connected ✅', data });
  } catch (err) {
    res.status(500).json({ message: 'Supabase connection failed ❌', error: err.message });
  }
});

// API routes
app.use("/api/users", userRoutes);

export default app;
