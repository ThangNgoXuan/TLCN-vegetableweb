import mongoose from 'mongoose';
import { env } from './environment.js';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(env.MONGODB_URL_ONLINE, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
}

export default connectDB;