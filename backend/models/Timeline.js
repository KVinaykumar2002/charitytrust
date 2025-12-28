import mongoose from 'mongoose';

const timelineSchema = new mongoose.Schema({
  year: {
    type: String,
    required: [true, 'Year/Period is required'],
    trim: true
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  highlights: [{
    type: String,
    trim: true
  }],
  icon: {
    type: String,
    enum: ['heart', 'eye', 'wind', 'hospital', 'users', 'target', 'award', 'star', 'gift', 'globe', 'building', 'graduation', 'truck', 'shield'],
    default: 'heart'
  },
  iconColor: {
    type: String,
    default: 'red',
    enum: ['red', 'blue', 'green', 'purple', 'orange', 'cyan', 'yellow', 'pink', 'indigo', 'teal']
  },
  images: [{
    url: {
      type: String,
      trim: true
    },
    base64: {
      type: String,
      trim: true
    },
    alt: {
      type: String,
      trim: true,
      default: 'Timeline image'
    }
  }],
  active: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
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

timelineSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Index for sorting by order
timelineSchema.index({ order: 1, createdAt: 1 });

const Timeline = mongoose.model('Timeline', timelineSchema);

export default Timeline;

