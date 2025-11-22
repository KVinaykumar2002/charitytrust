/**
 * Public Routes (No Authentication Required)
 * For public-facing pages like homepage
 */

import express from 'express';
import Program from '../models/Program.js';
import Project from '../models/Project.js';
import Event from '../models/Event.js';
import Testimonial from '../models/Testimonial.js';
import HeroImage from '../models/HeroImage.js';

const router = express.Router();

// ==================== PUBLIC PROGRAMS ====================

// Get all active programs (public - no auth required)
router.get('/programs', async (req, res) => {
  try {
    // Optimize query with lean() for faster performance
    const programs = await Program.find({ status: 'active' })
      .sort({ createdAt: -1 })
      .select('-__v')
      .limit(20) // Limit to 20 programs for carousel
      .lean(); // Use lean() for faster queries
    
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

// Get single program (public)
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

// ==================== PUBLIC PROJECTS ====================

// Get all projects (public) - shows projects from admin dashboard
router.get('/projects', async (req, res) => {
  try {
    // Optimize query with lean() for faster performance
    // Get all projects except those on hold
    const projects = await Project.find({
      status: { $ne: 'on_hold' } // Exclude projects on hold
    })
      .sort({ createdAt: -1 })
      .select('-__v')
      .limit(20)
      .lean(); // Use lean() for faster queries (returns plain JS objects)
    
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

// ==================== PUBLIC EVENTS ====================

// Get all events (public) - excludes cancelled events
router.get('/events', async (req, res) => {
  try {
    // Optimize query with lean() for faster performance
    // Get all events except cancelled ones
    const events = await Event.find({
      status: { $ne: 'cancelled' }
    })
      .sort({ date: -1 }) // Sort by date descending (newest first)
      .select('-__v')
      .limit(50)
      .lean(); // Use lean() for faster queries
    
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

// ==================== PUBLIC TESTIMONIALS ====================

// Get approved testimonials (public)
router.get('/testimonials', async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ status: 'approved' })
      .sort({ createdAt: -1 })
      .select('-__v')
      .limit(20);
    
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

// ==================== PUBLIC HERO IMAGES ====================

// Get active hero images (public - no auth required)
router.get('/hero-images', async (req, res) => {
  try {
    const heroImages = await HeroImage.find({ active: true })
      .sort({ order: 1, createdAt: -1 })
      .select('-__v');
    
    res.json({
      success: true,
      data: heroImages
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching hero images',
      error: error.message
    });
  }
});

export default router;

