import mongoose from 'mongoose';

const volunteerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Volunteer name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    trim: true
  },
  address: {
    type: String,
    trim: true
  },
  skills: [{
    type: String,
    trim: true
  }],
  status: {
    type: String,
    enum: ['active', 'inactive', 'pending'],
    default: 'active'
  },
  eventsAttended: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event'
  }],
  hoursContributed: {
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

volunteerSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Volunteer = mongoose.model('Volunteer', volunteerSchema);

export default Volunteer;

