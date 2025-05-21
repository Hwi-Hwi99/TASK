const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const setupSwagger = require('./swagger');

const userRoutes = require('./routes/userRoutes');
const teamRoutes = require('./routes/teamRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
setupSwagger(app);
// 1) MIDDLEWARES
// console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(cors());
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

// 3) ROUTES

app.use('/api/users', userRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/tasks', taskRoutes);

module.exports = app;