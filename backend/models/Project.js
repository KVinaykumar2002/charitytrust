import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Project title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Project description is required']
  },
  imageUrl: {
    type: String,
    trim: true
  },
  image: {
    type: String,
    trim: true
  },
  imageBase64: {
    type: String,
    trim: true
  },
  images: {
    type: [String],
    default: []
  },
  programId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Program',
    default: null
  },
  status: {
    type: String,
    enum: ['planning', 'in_progress', 'completed', 'on_hold'],
    default: 'planning'
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  endDate: {
    type: Date
  },
  location: {
    type: String,
    trim: true
  },
  category: {
    type: String,
    default: 'Floods services',
    trim: true
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

projectSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const Project = mongoose.model('Project', projectSchema);

export default Project;

