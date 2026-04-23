import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/MongoDbConfig.js';
import AdminRouter from './Routes/adminRoutes.js';
import BlogRouter from './Routes/blogRoute.js';

const app = express();
connectDB();
dotenv.config();

// Middleware
app.use(cors());
app.use(express.json());


// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the Blog API!');
});
app.use("/api/admin", AdminRouter)
app.use("/api/blog", BlogRouter)



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;