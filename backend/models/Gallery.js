import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema({
  mainCategory: {
    type: String,
    required: [true, 'Main category is required (e.g. Events, Projects, Programs)'],
    trim: true
  },
  subCategory: {
    type: String,
    required: [true, 'Sub-category is required (e.g. Charity, Awareness)'],
    trim: true
  },
  title: {
    type: String,
    trim: true,
    default: ''
  },
  images: {
    type: [String],
    default: []
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

gallerySchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const Gallery = mongoose.model('Gallery', gallerySchema);

export default Gallery;
