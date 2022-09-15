require('dotenv').config({ path: './config/.env' })
require("./config/database.js");
const express = require('express')
const app = express()
const userRoutes = require('./routes/user.route')
const cookieParser = require('cookie-parser');
const {checkUser, requireAuth} = require('./middleware/auth.middleware');
const cors = require("cors");

// cors
const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  'allowedHeaders' : ['sessionId', 'Content-Type'],
  'exposedHeaders' : ['sessionId'],
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false
}
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// jwt
app.get('*', checkUser);
app.get('/jwtid', requireAuth, (request, response) => {
  response.status(200).send(response.locals.user._id)
});

// routes
app.use('/api/user', userRoutes);

// server
app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})