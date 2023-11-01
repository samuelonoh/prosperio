import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config()



// const connectDB = async ()=> {
//   try {

//       console.log('MongoDB URI:', process.env.MONGODB_URI);

//       const conn = await mongoose.connect(process.env.MONGODB_URI);
//       console.log(`Database Connected:  ${conn.connection.host}`);
//   } catch (error) {  
//       console.error(error);
//   }
// }

const connectDB = async () => {
  try {
    console.log('MongoDB URI:', process.env.MONGO_URI);

    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`.yellow.underline);
    return conn; // Make sure to return the connection object
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export default connectDB;