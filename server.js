const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const errorHandler = require('./middleware/error');
const connectDB = require('./config/db');

//Load env vars
dotenv.config({ path: './config/config.env' });

const PORT = process.env.PORT || 6000;
const CURRENT_ENV = process.env.NODE_ENV;

// Connect to database
connectDB();

//Route files
const wallets = require('./routes/wallets');
const auth = require('./routes/auth');

const app = express();

// Body parser
app.use(express.json());

// Dev logging middleware
if (CURRENT_ENV === 'development') {
  app.use(morgan('dev'));
}

//Mount Routes
app.use('/api/v1/wallets', wallets);
app.use('/api/v1/auth', auth);

app.use(errorHandler);

const server = app.listen(PORT, () => {
  console.log(
    `Server running in ${CURRENT_ENV} mode on port ${PORT}!`.yellow.bold
  );
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  // server.close(() => process.exit(1).red);
});
