const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const errorHandler = require('./middleware/error');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors');
const connectDB = require('./config/db');
const swaggerUi = require('swagger-ui-express');
//const swaggerDocument = require('./swagger.json');
const swaggerDocument = require('./specs/swaggerDocuments');
const swaggerJsdoc = require('swagger-jsdoc');

//Load env vars
dotenv.config({ path: './config/config.env' });

const PORT = process.env.PORT || 3000;
const CURRENT_ENV = process.env.NODE_ENV;

// Connect to database
connectDB();

//Route files
const wallets = require('./routes/wallets');
const categories = require('./routes/category');
const budgets = require('./routes/budget');
const auth = require('./routes/auth');
const expenseTypes = require('./routes/expenseType');
const expenses = require('./routes/expense');

const app = express();

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// Dev logging middleware
if (CURRENT_ENV === 'development') {
  app.use(morgan('dev'));
}

// Sanitize data
app.use(mongoSanitize());

// Set security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 100,
});
app.use(limiter);

// Prevent http param pollution
app.use(hpp());

// Enable CORS
app.use(cors());

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//Mount Routes
app.use('/api/v1/wallets', wallets);
app.use('/api/v1/categories', categories);
app.use('/api/v1/budgets', budgets);
app.use('/api/v1/auth', auth);
app.use('/api/v1/expensetypes', expenseTypes);
app.use('/api/v1/expenses', expenses);

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
