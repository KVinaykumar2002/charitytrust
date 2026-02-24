import mongoose from 'mongoose';

const awardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Award name is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Award description is required']
  },
  image: {
    type: String,
    trim: true,
    default: ''
  },
  bgColor: {
    type: String,
    trim: true,
    default: '#fdf5e6'
  },
  order: {
    type: Number,
    default: 0
  },
  link: {
    type: String,
    trim: true,
    default: ''
  },
  active: {
    type: Boolean,
    default: true
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

awardSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const Award = mongoose.model('Award', awardSchema);

export default Award;
