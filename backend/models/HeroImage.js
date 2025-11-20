import mongoose from 'mongoose';

const heroImageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Hero image title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Hero image description is required']
  },
  imageBase64: {
    type: String,
    required: [true, 'Hero image is required'],
    trim: true
  },
  badge: {
    type: String,
    trim: true,
    default: ''
  },
  ctaLabel: {
    type: String,
    trim: true,
    default: 'Learn More'
  },
  ctaHref: {
    type: String,
    trim: true,
    default: '/'
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

heroImageSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const HeroImage = mongoose.model('HeroImage', heroImageSchema);

export default HeroImage;

