import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import { connectToDatabase } from './db';
import usersRoutes from './routes/users';
import authRoutes from './routes/auth';
import productsRoutes from './routes/products';
import cartsRoutes from './routes/carts';
import RolesRouter from './routes/roles';
import categoriesRoutes from './routes/categories';
import { errorHandler } from './middlewares/error';
const app = express();
const port: number = +(process.env.PORT as string) || 3000;


// Middlewares
app.use(cors());
app.use(express.json());
app.use('/api/users', usersRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/carts', cartsRoutes);
app.use('/api/roles', RolesRouter);
// Connect to database
connectToDatabase()

// ROUTES
app.get('/', (req: Request, res: Response): void => {
  res.send('Hello World!');
});

// General error handler
app.use(errorHandler);

app.listen(port, (): void => {
  console.log(`Server is running on port ${port}`);
});
