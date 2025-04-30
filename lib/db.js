import mongoose from 'mongoose';

mongoose.connect(process.env.DB)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

export default mongoose;
