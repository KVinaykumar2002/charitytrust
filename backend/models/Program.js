import mongoose from 'mongoose';

const programSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Program title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Program description is required']
  },
  category: {
    type: String,
    required: [true, 'Program category is required'],
    trim: true
  },
  imageBase64: {
    type: String,
    trim: true
  },
  link: {
    type: String,
    trim: true,
    default: ''
  },
  featured: {
    type: Boolean,
    default: false
  },
  targetAmount: {
    type: Number,
    default: 0
  },
  currentAmount: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['active', 'completed', 'paused'],
    default: 'active'
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  endDate: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

programSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Program = mongoose.model('Program', programSchema);

export default Program;

