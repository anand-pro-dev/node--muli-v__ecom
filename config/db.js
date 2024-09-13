

const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Configure dotenv to load environment variables
dotenv.config();

const connectDB = async () => {
    try {
        // Log the MONGO_URL to ensure it's being accessed correctly
        console.log('MONGO_URL: ', process.env.MONGO_URL);

        const conn = await mongoose.connect(process.env.MONGO_URL);

        console.log('MongoDB connection: ' + conn.connection.host);

    } catch (error) {
        console.log('MongoDB connection error: ' + error);
        process.exit(1);
    }
}

module.exports = connectDB;







