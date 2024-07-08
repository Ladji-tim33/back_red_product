const mongoose = require('mongoose');

export default async function dbConnect() {
  if (mongoose.connection.readyState >= 1) {
    return;
  }


  try {
    const db = await mongoose.connect('mongodb+srv://ladjitimera:Mpintey98@cluster0.xqlz4oz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
    return db;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

