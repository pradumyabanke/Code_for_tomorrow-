// server.js

const express = require('express');
const bodyParser = require('body-parser');
const db = require('./app/config/db.config');
const authRoutes = require('./app/routes/auth.routes');
const categoryRoutes = require('./app/routes/category.routes');
const serviceRoutes = require('./app/routes/service.routes');

const app = express();

// Parse requests of content-type - application/json
app.use(bodyParser.json());

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', categoryRoutes);
app.use('/api', serviceRoutes);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
