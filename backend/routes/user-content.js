/**
 * User Content Routes (Read-Only)
 * Users can view content that admins manage
 * All data comes from the same MongoDB collections
 * Changes made by admins automatically reflect here
 */

import express from 'express';
import { authenticate } from '../middleware/auth.js';
import Program from '../models/Program.js';
import Project from '../models/Project.js';
import Event from '../models/Event.js';
import Testimonial from '../models/Testimonial.js';
import Donation from '../models/Donation.js';

const router = express.Router();

// All routes require authentication (but not admin role)
router.use(authenticate);

// ==================== PROGRAMS (Read-Only) ====================

// Get all active programs (what users see)
router.get('/programs', async (req, res) => {
  try {
    const programs = await Program.find({ status: 'active' })
      .sort({ createdAt: -1 })
      .select('-__v');
    res.json({
      success: true,
      data: programs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching programs',
      error: error.message
    });
  }
});

// Get single program
router.get('/programs/:id', async (req, res) => {
  try {
    const program = await Program.findOne({ 
      _id: req.params.id, 
      status: 'active' 
    }).select('-__v');
    if (!program) {
      return res.status(404).json({
        success: false,
        message: 'Program not found'
      });
    }
    res.json({
      success: true,
      data: program
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching program',
      error: error.message
    });
  }
});

// ==================== PROJECTS (Read-Only) ====================

// Get all projects (what users see)
router.get('/projects', async (req, res) => {
  try {
    const projects = await Project.find()
      .sort({ createdAt: -1 })
      .select('-__v');
    res.json({
      success: true,
      data: projects
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching projects',
      error: error.message
    });
  }
});

// Get single project
router.get('/projects/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).select('-__v');
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }
    res.json({
      success: true,
      data: project
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching project',
      error: error.message
    });
  }
});

// ==================== EVENTS (Read-Only) ====================

// Get all upcoming/ongoing events (what users see)
router.get('/events', async (req, res) => {
  try {
    const events = await Event.find({
      status: { $in: ['upcoming', 'ongoing'] }
    })
      .sort({ date: 1 })
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

// Get single event
router.get('/events/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).select('-__v');
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }
    res.json({
      success: true,
      data: event
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching event',
      error: error.message
    });
  }
});

// ==================== TESTIMONIALS (Read-Only) ====================

// Get all approved testimonials (what users see)
router.get('/testimonials', async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ status: 'approved' })
      .sort({ createdAt: -1 })
      .select('-__v');
    res.json({
      success: true,
      data: testimonials
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching testimonials',
      error: error.message
    });
  }
});

// ==================== USER DONATIONS ====================

// Get user's own donations
router.get('/donations', async (req, res) => {
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

// Get user's donation stats
router.get('/donations/stats', async (req, res) => {
  try {
    const stats = await Donation.aggregate([
      { $match: { donorEmail: req.user.email, status: 'completed' } },
      {
        $group: {
          _id: null,
          totalDonated: { $sum: '$amount' },
          donationsCount: { $sum: 1 }
        }
      }
    ]);

    res.json({
      success: true,
      data: {
        totalDonated: stats[0]?.totalDonated || 0,
        donationsCount: stats[0]?.donationsCount || 0
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching donation stats',
      error: error.message
    });
  }
});

export default router;

