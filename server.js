const express = require('express');
const dotenv = require('dotenv');

//Load env vars
dotenv.config({ path: './config/config.env' });

const app = express();

const PORT = process.env.PORT || 6000;
const CURRENT_ENV = process.env.NODE_ENV;

app.listen(PORT, () => {
  console.log(`Server running in ${CURRENT_ENV} mode on port ${PORT}!`);
});
