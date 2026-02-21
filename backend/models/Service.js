import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Service title is required'],
    trim: true
  },
  slug: {
    type: String,
    required: [true, 'Service slug is required (e.g. eye-bank, blood-center)'],
    trim: true,
    unique: true
  },
  description: {
    type: String,
    required: [true, 'Service description is required']
  },
  icon: {
    type: String,
    enum: ['Eye', 'Droplet'],
    default: 'Eye'
  },
  linkText: {
    type: String,
    trim: true,
    default: ''
  },
  linkHref: {
    type: String,
    trim: true,
    default: ''
  },
  order: {
    type: Number,
    default: 0
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

serviceSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const Service = mongoose.model('Service', serviceSchema);

export default Service;
