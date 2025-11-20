import express from 'express';
import { authenticate, authorizeUser } from '../middleware/auth.js';
import Donation from '../models/Donation.js';
import Event from '../models/Event.js';

const router = express.Router();

// All user routes require authentication
router.use(authenticate);

// User dashboard data - fetches real data from MongoDB
router.get('/dashboard', authorizeUser, async (req, res) => {
  try {
    const userEmail = req.user.email;
    
    // Calculate user's total donations
    const donationStats = await Donation.aggregate([
      { 
        $match: { 
          donorEmail: userEmail,
          status: 'completed' 
        } 
      },
      {
        $group: {
          _id: null,
          totalDonated: { $sum: '$amount' },
          donationsCount: { $sum: 1 }
        }
      }
    ]);

    // Count events user has registered for (if you have event registration model)
    // For now, we'll use a placeholder
    const eventsAttended = 0; // TODO: Implement event registration tracking
    
    // Calculate impact points (based on donations)
    const totalDonated = donationStats[0]?.totalDonated || 0;
    const donationsCount = donationStats[0]?.donationsCount || 0;
    const impactPoints = totalDonated / 100; // 1 point per ₹100 donated

    res.json({
      success: true,
      message: 'User dashboard data',
      data: {
        stats: {
          totalDonated,
          donationsCount,
          eventsAttended,
          impactPoints
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching user dashboard data',
      error: error.message
    });
  }
});

// Get user's donations
router.get('/donations', authorizeUser, async (req, res) => {
  try {
    const donations = await Donation.find({ 
      donorEmail: req.user.email 
    })
      .sort({ createdAt: -1 })
      .select('-__v');
    
    res.json({
      success: true,
      data: donations
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching donations',
      error: error.message
    });
  }
});

// Get user's events (upcoming events they can see)
router.get('/events', authorizeUser, async (req, res) => {
  try {
    const events = await Event.find({
      status: { $in: ['upcoming', 'ongoing'] }
    })
      .sort({ date: 1 })
      .limit(10)
      .select('-__v');
    
    res.json({
      success: true,
      data: events
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching events',
      error: error.message
    });
  }
});

// User profile
router.get('/profile', authorizeUser, (req, res) => {
  res.json({
    success: true,
    message: 'User profile data',
    data: {
      user: req.user
    }
  });
});

export default router;

