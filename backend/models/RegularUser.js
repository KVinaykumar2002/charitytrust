import mongoose from 'mongoose';

const regularUserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'User name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    // Storing password as-is (no hashing as per requirements)
  },
  role: {
    type: String,
    default: 'user',
    enum: ['user']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const RegularUser = mongoose.model('RegularUser', regularUserSchema);

export default RegularUser;

