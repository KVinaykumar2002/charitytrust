import mongoose from 'mongoose';

const teamMemberSchema = new mongoose.Schema({
  teamNumber: {
    type: String,
    trim: true,
    default: '',
  },
  name: {
    type: String,
    required: [true, 'Member name is required'],
    trim: true,
  },
  position: {
    type: String,
    required: [true, 'Position is required'],
    trim: true,
  },
  imageUrl: {
    type: String,
    trim: true,
    default: '',
  },
  bio: {
    type: String,
    trim: true,
    default: '',
  },
  order: {
    type: Number,
    default: 0,
  },
}, { _id: true });

const teamCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Category name is required'],
    trim: true,
  },
  role: {
    type: String,
    trim: true,
    default: '',
  },
  description: {
    type: String,
    trim: true,
    default: '',
  },
  icon: {
    type: String,
    trim: true,
    default: 'Award',
    enum: ['Award', 'Target', 'Heart', 'Users', 'UsersRound', 'Building2'],
  },
  /** Section on public Our Team page: leadership (grid), organizers (card + members), government_hospitals (card + members) */
  sectionType: {
    type: String,
    trim: true,
    default: 'leadership',
    enum: ['leadership', 'organizers', 'government_hospitals'],
  },
  order: {
    type: Number,
    default: 0,
  },
  members: {
    type: [teamMemberSchema],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

teamCategorySchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const TeamCategory = mongoose.model('TeamCategory', teamCategorySchema);

export default TeamCategory;
