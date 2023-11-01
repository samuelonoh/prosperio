import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
import { errorHandler, notFound } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js';
const port = process.env.PORT || 6000;
import userRoutes from './routes/userRoutes.js'
import productRoutes from './routes/productRoutes.js'
import contactRoutes from './routes/contactRoutes.js'
import colors from 'colors'
import { fileURLToPath } from 'url';
import { dirname } from 'path'
import path from 'path';
import cloudinary from 'cloudinary'

connectDB();

const app = express();

//configure cloudinary with your api credentials
cloudinary.config({
    cloud_name:
        process.env.API_NAME,
    api_key:
        process.env.API_KEY,
    api_secret:
        process.env.API_SECRET,

})

//middleware to pass incoming request
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cookieParser());

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename)

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use('/api/users', userRoutes)
app.use('/api/products', productRoutes);
app.use("/api/contactUs", contactRoutes);

app.get('/', (req, res) => res.send('Server is ready for start up'));

app.use(errorHandler)
app.use(notFound)

app.listen(port, () => console.log(`server started on port ${port}`));