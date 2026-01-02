import mongoose from 'mongoose';

const bloodDonationSchema = new mongoose.Schema({
  // Type of submission
  type: {
    type: String,
    enum: ['donor', 'patient'],
    required: [true, 'Type is required']
  },
  
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
  age: {
    type: Number,
    required: [true, 'Age is required']
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: [true, 'Gender is required']
  },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    required: [true, 'Blood group is required']
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
  
  // ========== DONOR SPECIFIC FIELDS ==========
  // Weight (for donors - must be > 45kg)
  weight: {
    type: Number
  },
  
  // Last Donation Date (for donors)
  lastDonationDate: {
    type: Date
  },
  
  // Health Information (for donors)
  hasTattoo: {
    type: Boolean,
    default: false
  },
  tattooDate: {
    type: Date
  },
  hasRecentIllness: {
    type: Boolean,
    default: false
  },
  illnessDetails: {
    type: String,
    trim: true
  },
  takingMedication: {
    type: Boolean,
    default: false
  },
  medicationDetails: {
    type: String,
    trim: true
  },
  hasChronicDisease: {
    type: Boolean,
    default: false
  },
  chronicDiseaseDetails: {
    type: String,
    trim: true
  },
  
  // Availability (for donors)
  availableForEmergency: {
    type: Boolean,
    default: false
  },
  preferredDonationCenter: {
    type: String,
    trim: true
  },
  
  // ========== PATIENT SPECIFIC FIELDS ==========
  // Hospital Details (for patients)
  hospitalName: {
    type: String,
    trim: true
  },
  hospitalAddress: {
    type: String,
    trim: true
  },
  doctorName: {
    type: String,
    trim: true
  },
  doctorPhone: {
    type: String,
    trim: true
  },
  
  // Patient Medical Details
  patientCondition: {
    type: String,
    trim: true
  },
  surgeryDate: {
    type: Date
  },
  unitsRequired: {
    type: Number,
    min: 1
  },
  urgency: {
    type: String,
    enum: ['immediate', 'within_24_hours', 'within_week', 'scheduled'],
    default: 'within_week'
  },
  
  // Attendant/Contact Person (for patients)
  attendant: {
    name: { type: String },
    relationship: { type: String },
    phone: { type: String }
  },
  
  // ========== COMMON FIELDS ==========
  // Request/Registration Details
  requestNumber: {
    type: String,
    unique: true
  },
  requestDate: {
    type: Date,
    default: Date.now
  },
  
  // Status
  status: {
    type: String,
    enum: ['pending', 'verified', 'active', 'fulfilled', 'cancelled', 'expired'],
    default: 'pending'
  },
  
  // For donors - donation tracking
  donationCount: {
    type: Number,
    default: 0
  },
  lastDonatedAt: {
    type: Date
  },
  
  // For patients - fulfillment tracking
  unitsFulfilled: {
    type: Number,
    default: 0
  },
  fulfilledBy: [{
    donorId: { type: mongoose.Schema.Types.ObjectId, ref: 'BloodDonation' },
    units: { type: Number },
    date: { type: Date }
  }],
  
  // Verification
  verifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  verifiedAt: {
    type: Date
  },
  
  // Additional
  howDidYouHear: {
    type: String,
    enum: ['website', 'social_media', 'friend_family', 'newspaper', 'event', 'hospital', 'other'],
    default: 'website'
  },
  additionalNotes: {
    type: String,
    trim: true
  },
  
  // Consent
  hasConsented: {
    type: Boolean,
    required: [true, 'Consent is required'],
    default: false
  }
}, {
  timestamps: true
});

// Generate request number before saving
bloodDonationSchema.pre('save', async function(next) {
  if (!this.requestNumber) {
    const count = await this.constructor.countDocuments({ type: this.type });
    const year = new Date().getFullYear();
    const prefix = this.type === 'donor' ? 'BDD' : 'BDR'; // Blood Donor / Blood Request
    this.requestNumber = `${prefix}-${year}-${String(count + 1).padStart(6, '0')}`;
  }
  next();
});

// Calculate age from DOB before saving
bloodDonationSchema.pre('save', function(next) {
  if (this.dateOfBirth) {
    const today = new Date();
    const birthDate = new Date(this.dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    this.age = age;
  }
  next();
});

// Indexes for faster searches
bloodDonationSchema.index({ type: 1, bloodGroup: 1 });
bloodDonationSchema.index({ email: 1 });
bloodDonationSchema.index({ phone: 1 });
bloodDonationSchema.index({ requestNumber: 1 });
bloodDonationSchema.index({ status: 1 });
bloodDonationSchema.index({ bloodGroup: 1, status: 1 });
bloodDonationSchema.index({ 'address.city': 1, bloodGroup: 1 });
bloodDonationSchema.index({ createdAt: -1 });
bloodDonationSchema.index({ urgency: 1, status: 1 });

const BloodDonation = mongoose.model('BloodDonation', bloodDonationSchema);

export default BloodDonation;

