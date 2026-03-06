import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';

// app config
const app = express();
const port = process.env.PORT || 4000
connectDB();
connectCloudinary();
//console.log("CLOUD NAME:", process.env.CLOUDINARY_NAME);
//console.log("API KEY:", process.env.CLOUDINARY_API_KEY);
//console.log("SECRET:", process.env.CLOUDINARY_SECRET);
// MIDDLEWARE
app.use(express.json());
app.use(cors());

// api end points
app.use('/api/admin', adminRouter);



app.get('/', (req, res) => {
    res.send('API WORKING')
});

app.listen(port, ()=> console.log("Server is live on ", port))


