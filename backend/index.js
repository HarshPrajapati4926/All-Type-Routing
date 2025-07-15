const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const app = express();
const PORT = 5000;
const JWT_SECRET = 'Harsh';

app.use(cors());
app.use(express.json());

// In-memory users DB (replace with real DB in production)
const users = [];

// Signup
app.post('/api/signup', async (req, res) => {
  const { email, password } = req.body;
  const existingUser = users.find(u => u.email === email);
  if (existingUser) return res.status(400).json({ message: 'User already exists' });

  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ email, password: hashedPassword });
  res.status(201).json({ message: 'User created' });
});

// Login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
   if (!user) return res.status(400).json({ message: 'Invalid credentials' });

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return res.status(400).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
  
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
