import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errors.js';
import userRoutes from './routes/user.js';

// get json from dummyJSON and write to *data.json file (which is ignored by nodemon when starting the server)
// import dummyJson from './config/dummyjson.js';
// dummyJson();

// config
dotenv.config();
const app = express();
const port = process.env.PORT || 6000;
connectDB();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// routes
app.use('/api/user', userRoutes);

// error handlers
app.use(notFound);
app.use(errorHandler);

// start server
app.listen(port, () => console.log(`Server started on port ${port}`));
