// Import express package
const express = require('express');

// initiate express app
const app = express();

// DB connection config
const connectDB = require("./config/db");
connectDB();

// Routes Config
app.use(express.json({ extended: false, limit: '150mb' }));
//parse incoming request body in JSON format.
app.use('/', require('./routes/redirect'));
app.use('/api/shorten', require('./routes/shorten'));

// start server and listen the port
const PORT = process.env.PORT || 5005;
app.listen(PORT, () => console.log(`Server started, listening port ${PORT}`));
