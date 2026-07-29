require('dotenv').config();
const express = require('express');
const { sequelize, ensureDatabaseExists } = require('./models');

const authRoutes = require('./routes/authRoutes');
const genreRoutes = require('./routes/genreRoutes');
const komikRoutes = require('./routes/komikRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routing API
app.use('/api', authRoutes);
app.use('/api/genre', genreRoutes);
app.use('/api/komik', komikRoutes);

// Root Endpoint
app.get('/', (req, res) => {
  res.json({
    status: 'success',
    message: 'Welcome to 118 API Komik & Genre RESTful Web Service'
  });
});

// Start Server Routine
const startServer = async () => {
  try {
    await ensureDatabaseExists();
    await sequelize.sync();
    console.log('Database synced successfully.');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to sync database:', err.message);
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT} (Database pending connection)`);
    });
  }
};

startServer();

module.exports = app;
