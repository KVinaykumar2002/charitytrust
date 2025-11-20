import mongoose from 'mongoose';

const donationSchema = new mongoose.Schema({
  donorName: {
    type: String,
    required: [true, 'Donor name is required'],
    trim: true
  },
  donorEmail: {
    type: String,
    required: [true, 'Donor email is required'],
    trim: true,
    lowercase: true
  },
  amount: {
    type: Number,
    required: [true, 'Donation amount is required'],
    min: [0, 'Amount must be positive']
  },
  programId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Program',
    default: null
  },
  programName: {
    type: String,
    trim: true
  },
  paymentMethod: {
    type: String,
    enum: ['online', 'cash', 'cheque', 'bank_transfer'],
    default: 'online'
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'completed'
  },
  notes: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Donation = mongoose.model('Donation', donationSchema);

export default Donation;

