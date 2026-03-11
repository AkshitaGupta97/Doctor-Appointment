import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';
import doctorRouter from './routes/doctorRoute.js';
import userRouter from './routes/userRoute.js';

const app = express();
const port = process.env.PORT || 4000;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// routes
app.use('/api/admin', adminRouter);
app.use('/api/doctors', doctorRouter);
app.use('/api/user', userRouter);

app.get('/', (req, res) => {
    res.send('API WORKING');
});

// START SERVER AFTER DB CONNECTS
const startServer = async () => {
    try {

        await connectDB();        // wait for MongoDB
        connectCloudinary();      // cloudinary connect

        app.listen(port, () => {
            console.log("🚀 Server is live on", port);
        });

    } catch (error) {
        console.log("Server start failed:", error);
    }
};

startServer();
