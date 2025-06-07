// server.js or wherever your express app is defined
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// ✅ FIX: increase limit for large JSON/image data
app.use(express.json({ limit: '5mb' }));
app.use(cors());

// your other routes...
const routes = require('./routes/userRoutes');
app.use('/api', routes);

mongoose.connect('mongodb://localhost:27017/form-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
