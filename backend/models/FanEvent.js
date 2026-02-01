import mongoose from 'mongoose';

const fanEventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Event title is required'],
    trim: true
  },
  eventDate: {
    type: Date,
    required: [true, 'Event date is required']
  },
  eventBy: {
    type: String,
    required: [true, 'Event by (organizer name) is required'],
    trim: true
  },
  photos: [{
    type: String, // base64 or URL
    trim: true
  }],
  videoBase64: {
    type: String,
    trim: true
  },
  videoUrl: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  submittedAt: {
    type: Date,
    default: Date.now
  },
  reviewedAt: {
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

fanEventSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const FanEvent = mongoose.model('FanEvent', fanEventSchema);

export default FanEvent;
