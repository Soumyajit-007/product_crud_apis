require('dotenv').config();
const express = require('express');
const DBConnect = require('./src/config/dbcon');
const app = express();

app.use(express.json());

const productRoute = require('./src/routes/products.api');
app.use('/api/v1/products', productRoute);

const port = process.env.PORT || 3009;

DBConnect();

app.listen(port, () => {
  console.log(`server is running on port http://localhost:${port}`);
});