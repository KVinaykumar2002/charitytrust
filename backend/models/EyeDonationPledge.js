import mongoose from 'mongoose';

const eyeDonationPledgeSchema = new mongoose.Schema({
  // Personal Information
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true
  },
  dateOfBirth: {
    type: Date,
    required: [true, 'Date of birth is required']
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: [true, 'Gender is required']
  },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'unknown'],
    default: 'unknown'
  },
  
  // Contact Information
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true
  },
  alternatePhone: {
    type: String,
    trim: true
  },
  
  // Address
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true }
  },
  
  // Next of Kin Details
  nextOfKin: {
    name: { type: String, required: true },
    relationship: { type: String, required: true },
    phone: { type: String, required: true }
  },
  
  // Medical Information
  wearingSpectacles: {
    type: Boolean,
    default: false
  },
  hadEyeSurgery: {
    type: Boolean,
    default: false
  },
  eyeSurgeryDetails: {
    type: String,
    trim: true
  },
  hasEyeDisease: {
    type: Boolean,
    default: false
  },
  eyeDiseaseDetails: {
    type: String,
    trim: true
  },
  
  // Consent & Declaration
  hasConsented: {
    type: Boolean,
    required: [true, 'Consent is required'],
    default: false
  },
  familyAware: {
    type: Boolean,
    required: true,
    default: false
  },
  
  // Additional Information
  howDidYouHear: {
    type: String,
    enum: ['website', 'social_media', 'friend_family', 'newspaper', 'event', 'hospital', 'other'],
    default: 'website'
  },
  additionalNotes: {
    type: String,
    trim: true
  },
  
  // Pledge Details
  pledgeNumber: {
    type: String,
    unique: true
  },
  pledgeDate: {
    type: Date,
    default: Date.now
  },
  
  // Status
  status: {
    type: String,
    enum: ['pending', 'verified', 'active', 'cancelled'],
    default: 'pending'
  },
  
  // Verification
  verifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  verifiedAt: {
    type: Date
  },
  
  // Card Issued
  cardIssued: {
    type: Boolean,
    default: false
  },
  cardIssuedDate: {
    type: Date
  }
}, {
  timestamps: true
});

// Generate pledge number before saving
eyeDonationPledgeSchema.pre('save', async function(next) {
  if (!this.pledgeNumber) {
    const count = await this.constructor.countDocuments();
    const year = new Date().getFullYear();
    this.pledgeNumber = `EDP-${year}-${String(count + 1).padStart(6, '0')}`;
  }
  next();
});

// Index for faster searches
eyeDonationPledgeSchema.index({ email: 1 });
eyeDonationPledgeSchema.index({ phone: 1 });
eyeDonationPledgeSchema.index({ pledgeNumber: 1 });
eyeDonationPledgeSchema.index({ status: 1 });
eyeDonationPledgeSchema.index({ createdAt: -1 });

const EyeDonationPledge = mongoose.model('EyeDonationPledge', eyeDonationPledgeSchema);

export default EyeDonationPledge;

