/**
 * Admin Content Management Routes
 * All routes require admin authentication and authorization
 * Changes made here reflect in user dashboard automatically
 */

import express from 'express';
import { authenticate, authorizeAdmin } from '../middleware/auth.js';
import Program from '../models/Program.js';
import Project from '../models/Project.js';
import Event from '../models/Event.js';
import Testimonial from '../models/Testimonial.js';
import HeroImage from '../models/HeroImage.js';
import Timeline from '../models/Timeline.js';
import EyeDonationPledge from '../models/EyeDonationPledge.js';
import BloodDonation from '../models/BloodDonation.js';

const router = express.Router();

// All routes require admin authentication
router.use(authenticate);
router.use(authorizeAdmin);

// ==================== PROGRAMS CRUD ====================

// Get all programs
router.get('/programs', async (req, res) => {
  try {
    const programs = await Program.find().sort({ createdAt: -1 });
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
    const program = await Program.findById(req.params.id);
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

// Create program
router.post('/programs', async (req, res) => {
  try {
    const program = new Program(req.body);
    await program.save();
    res.status(201).json({
      success: true,
      message: 'Program created successfully',
      data: program
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating program',
      error: error.message
    });
  }
});

// Update program
router.put('/programs/:id', async (req, res) => {
  try {
    const program = await Program.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: new Date() },
      { new: true, runValidators: true }
    );
    if (!program) {
      return res.status(404).json({
        success: false,
        message: 'Program not found'
      });
    }
    res.json({
      success: true,
      message: 'Program updated successfully',
      data: program
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating program',
      error: error.message
    });
  }
});

// Delete program
router.delete('/programs/:id', async (req, res) => {
  try {
    const program = await Program.findByIdAndDelete(req.params.id);
    if (!program) {
      return res.status(404).json({
        success: false,
        message: 'Program not found'
      });
    }
    res.json({
      success: true,
      message: 'Program deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting program',
      error: error.message
    });
  }
});

// ==================== PROJECTS CRUD ====================

// Get all projects
router.get('/projects', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
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
    const project = await Project.findById(req.params.id);
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

// Create project
router.post('/projects', async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: project
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating project',
      error: error.message
    });
  }
});

// Update project
router.put('/projects/:id', async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: new Date() },
      { new: true, runValidators: true }
    );
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }
    res.json({
      success: true,
      message: 'Project updated successfully',
      data: project
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating project',
      error: error.message
    });
  }
});

// Delete project
router.delete('/projects/:id', async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }
    res.json({
      success: true,
      message: 'Project deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting project',
      error: error.message
    });
  }
});

// ==================== EVENTS CRUD ====================

// Get all events
router.get('/events', async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
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
    const event = await Event.findById(req.params.id);
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

// Create event
router.post('/events', async (req, res) => {
  try {
    const eventData = { ...req.body };
    
    // Store only imageBase64, remove other image fields
    if (eventData.imageBase64 || eventData.image) {
      eventData.imageBase64 = eventData.imageBase64 || eventData.image;
      delete eventData.image;
      delete eventData.imageUrl;
    }
    
    const event = new Event(eventData);
    await event.save();
    
    res.status(201).json({
      success: true,
      message: 'Event created successfully',
      data: event
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating event',
      error: error.message
    });
  }
});

// Update event
router.put('/events/:id', async (req, res) => {
  try {
    const updateData = { ...req.body, updatedAt: new Date() };
    
    // Store only imageBase64, remove other image fields
    if (updateData.imageBase64 || updateData.image) {
      updateData.imageBase64 = updateData.imageBase64 || updateData.image;
      delete updateData.image;
      delete updateData.imageUrl;
    }
    
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Event updated successfully',
      data: event
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating event',
      error: error.message
    });
  }
});

// Delete event
router.delete('/events/:id', async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }
    res.json({
      success: true,
      message: 'Event deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting event',
      error: error.message
    });
  }
});

// ==================== TESTIMONIALS CRUD ====================

// Get all testimonials
router.get('/testimonials', async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
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

// Get single testimonial
router.get('/testimonials/:id', async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: 'Testimonial not found'
      });
    }
    res.json({
      success: true,
      data: testimonial
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching testimonial',
      error: error.message
    });
  }
});

// Create testimonial
router.post('/testimonials', async (req, res) => {
  try {
    const testimonialData = { ...req.body };
    
    // Store only imageBase64, remove other image fields
    if (testimonialData.imageBase64 || testimonialData.image) {
      testimonialData.imageBase64 = testimonialData.imageBase64 || testimonialData.image;
      delete testimonialData.image;
    }
    
    const testimonial = new Testimonial(testimonialData);
    await testimonial.save();
    res.status(201).json({
      success: true,
      message: 'Testimonial created successfully',
      data: testimonial
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating testimonial',
      error: error.message
    });
  }
});

// Update testimonial
router.put('/testimonials/:id', async (req, res) => {
  try {
    const updateData = { ...req.body, updatedAt: new Date() };
    
    // Store only imageBase64, remove other image fields
    if (updateData.imageBase64 || updateData.image) {
      updateData.imageBase64 = updateData.imageBase64 || updateData.image;
      delete updateData.image;
    }
    
    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );
    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: 'Testimonial not found'
      });
    }
    res.json({
      success: true,
      message: 'Testimonial updated successfully',
      data: testimonial
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating testimonial',
      error: error.message
    });
  }
});

// Delete testimonial
router.delete('/testimonials/:id', async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: 'Testimonial not found'
      });
    }
    res.json({
      success: true,
      message: 'Testimonial deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting testimonial',
      error: error.message
    });
  }
});

// Approve/reject testimonial
router.patch('/testimonials/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    if (!['pending', 'approved', 'rejected'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be pending, approved, or rejected'
      });
    }
    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      { status, updatedAt: new Date() },
      { new: true }
    );
    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: 'Testimonial not found'
      });
    }
    res.json({
      success: true,
      message: `Testimonial ${status} successfully`,
      data: testimonial
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating testimonial status',
      error: error.message
    });
  }
});

// ==================== HERO IMAGES CRUD ====================

// Get all hero images
router.get('/hero-images', async (req, res) => {
  try {
    const heroImages = await HeroImage.find().sort({ order: 1, createdAt: -1 });
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

// Get single hero image
router.get('/hero-images/:id', async (req, res) => {
  try {
    const heroImage = await HeroImage.findById(req.params.id);
    if (!heroImage) {
      return res.status(404).json({
        success: false,
        message: 'Hero image not found'
      });
    }
    res.json({
      success: true,
      data: heroImage
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching hero image',
      error: error.message
    });
  }
});

// Create hero image
router.post('/hero-images', async (req, res) => {
  try {
    const heroImageData = { ...req.body };
    
    // Store only imageBase64, remove other image fields
    if (heroImageData.imageBase64 || heroImageData.image) {
      heroImageData.imageBase64 = heroImageData.imageBase64 || heroImageData.image;
      delete heroImageData.image;
      delete heroImageData.imageUrl;
    }
    
    const heroImage = new HeroImage(heroImageData);
    await heroImage.save();
    
    res.status(201).json({
      success: true,
      message: 'Hero image created successfully',
      data: heroImage
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating hero image',
      error: error.message
    });
  }
});

// Update hero image
router.put('/hero-images/:id', async (req, res) => {
  try {
    const updateData = { ...req.body, updatedAt: new Date() };
    
    // Store only imageBase64, remove other image fields
    if (updateData.imageBase64 || updateData.image) {
      updateData.imageBase64 = updateData.imageBase64 || updateData.image;
      delete updateData.image;
      delete updateData.imageUrl;
    }
    
    const heroImage = await HeroImage.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );
    if (!heroImage) {
      return res.status(404).json({
        success: false,
        message: 'Hero image not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Hero image updated successfully',
      data: heroImage
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating hero image',
      error: error.message
    });
  }
});

// Delete hero image
router.delete('/hero-images/:id', async (req, res) => {
  try {
    const heroImage = await HeroImage.findByIdAndDelete(req.params.id);
    if (!heroImage) {
      return res.status(404).json({
        success: false,
        message: 'Hero image not found'
      });
    }
    res.json({
      success: true,
      message: 'Hero image deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting hero image',
      error: error.message
    });
  }
});

// ==================== TIMELINE CRUD ====================

// Get all timeline entries
router.get('/timeline', async (req, res) => {
  try {
    const timeline = await Timeline.find().sort({ order: 1, createdAt: 1 });
    res.json({
      success: true,
      data: timeline
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching timeline entries',
      error: error.message
    });
  }
});

// Get single timeline entry
router.get('/timeline/:id', async (req, res) => {
  try {
    const entry = await Timeline.findById(req.params.id);
    if (!entry) {
      return res.status(404).json({
        success: false,
        message: 'Timeline entry not found'
      });
    }
    res.json({
      success: true,
      data: entry
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching timeline entry',
      error: error.message
    });
  }
});

// Create timeline entry
router.post('/timeline', async (req, res) => {
  try {
    const timelineData = { ...req.body };
    
    // Process images array - keep base64 data
    if (timelineData.images && Array.isArray(timelineData.images)) {
      timelineData.images = timelineData.images.map(img => ({
        base64: img.base64 || img.url,
        alt: img.alt || 'Timeline image'
      }));
    }
    
    const entry = new Timeline(timelineData);
    await entry.save();
    
    res.status(201).json({
      success: true,
      message: 'Timeline entry created successfully',
      data: entry
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating timeline entry',
      error: error.message
    });
  }
});

// Update timeline entry
router.put('/timeline/:id', async (req, res) => {
  try {
    const updateData = { ...req.body, updatedAt: new Date() };
    
    // Process images array - keep base64 data
    if (updateData.images && Array.isArray(updateData.images)) {
      updateData.images = updateData.images.map(img => ({
        base64: img.base64 || img.url,
        alt: img.alt || 'Timeline image'
      }));
    }
    
    const entry = await Timeline.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );
    if (!entry) {
      return res.status(404).json({
        success: false,
        message: 'Timeline entry not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Timeline entry updated successfully',
      data: entry
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating timeline entry',
      error: error.message
    });
  }
});

// Delete timeline entry
router.delete('/timeline/:id', async (req, res) => {
  try {
    const entry = await Timeline.findByIdAndDelete(req.params.id);
    if (!entry) {
      return res.status(404).json({
        success: false,
        message: 'Timeline entry not found'
      });
    }
    res.json({
      success: true,
      message: 'Timeline entry deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting timeline entry',
      error: error.message
    });
  }
});

// Reorder timeline entries
router.patch('/timeline/reorder', async (req, res) => {
  try {
    const { orderedIds } = req.body;
    
    if (!Array.isArray(orderedIds)) {
      return res.status(400).json({
        success: false,
        message: 'orderedIds must be an array'
      });
    }
    
    // Update order for each entry
    const updatePromises = orderedIds.map((id, index) => 
      Timeline.findByIdAndUpdate(id, { order: index, updatedAt: new Date() })
    );
    
    await Promise.all(updatePromises);
    
    res.json({
      success: true,
      message: 'Timeline reordered successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error reordering timeline',
      error: error.message
    });
  }
});

// ==================== EYE DONATION PLEDGES ====================

// Get all eye donation pledges
router.get('/eye-donation-pledges', async (req, res) => {
  try {
    const { status, search, page = 1, limit = 20 } = req.query;
    
    const query = {};
    if (status) query.status = status;
    if (search) {
      query.$or = [
        { fullName: new RegExp(search, 'i') },
        { email: new RegExp(search, 'i') },
        { phone: new RegExp(search, 'i') },
        { pledgeNumber: new RegExp(search, 'i') }
      ];
    }
    
    const pledges = await EyeDonationPledge.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .select('-__v');
    
    const total = await EyeDonationPledge.countDocuments(query);
    
    res.json({
      success: true,
      data: pledges,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching eye donation pledges',
      error: error.message
    });
  }
});

// Get single eye donation pledge
router.get('/eye-donation-pledges/:id', async (req, res) => {
  try {
    const pledge = await EyeDonationPledge.findById(req.params.id);
    if (!pledge) {
      return res.status(404).json({
        success: false,
        message: 'Eye donation pledge not found'
      });
    }
    res.json({
      success: true,
      data: pledge
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching eye donation pledge',
      error: error.message
    });
  }
});

// Update eye donation pledge status
router.patch('/eye-donation-pledges/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    if (!['pending', 'verified', 'active', 'cancelled'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status'
      });
    }
    
    const updateData = { 
      status, 
      updatedAt: new Date() 
    };
    
    if (status === 'verified' || status === 'active') {
      updateData.verifiedBy = req.user.id;
      updateData.verifiedAt = new Date();
    }
    
    const pledge = await EyeDonationPledge.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    
    if (!pledge) {
      return res.status(404).json({
        success: false,
        message: 'Eye donation pledge not found'
      });
    }
    
    res.json({
      success: true,
      message: `Pledge ${status} successfully`,
      data: pledge
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating pledge status',
      error: error.message
    });
  }
});

// Issue card for eye donation pledge
router.patch('/eye-donation-pledges/:id/issue-card', async (req, res) => {
  try {
    const pledge = await EyeDonationPledge.findByIdAndUpdate(
      req.params.id,
      { 
        cardIssued: true, 
        cardIssuedDate: new Date(),
        status: 'active',
        updatedAt: new Date() 
      },
      { new: true }
    );
    
    if (!pledge) {
      return res.status(404).json({
        success: false,
        message: 'Eye donation pledge not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Card issued successfully',
      data: pledge
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error issuing card',
      error: error.message
    });
  }
});

// Delete eye donation pledge
router.delete('/eye-donation-pledges/:id', async (req, res) => {
  try {
    const pledge = await EyeDonationPledge.findByIdAndDelete(req.params.id);
    if (!pledge) {
      return res.status(404).json({
        success: false,
        message: 'Eye donation pledge not found'
      });
    }
    res.json({
      success: true,
      message: 'Eye donation pledge deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting eye donation pledge',
      error: error.message
    });
  }
});

// Get eye donation stats
router.get('/eye-donation-pledges/stats/overview', async (req, res) => {
  try {
    const total = await EyeDonationPledge.countDocuments();
    const pending = await EyeDonationPledge.countDocuments({ status: 'pending' });
    const verified = await EyeDonationPledge.countDocuments({ status: 'verified' });
    const active = await EyeDonationPledge.countDocuments({ status: 'active' });
    const cancelled = await EyeDonationPledge.countDocuments({ status: 'cancelled' });
    const cardsIssued = await EyeDonationPledge.countDocuments({ cardIssued: true });
    
    res.json({
      success: true,
      data: {
        total,
        pending,
        verified,
        active,
        cancelled,
        cardsIssued
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching stats',
      error: error.message
    });
  }
});

// ==================== BLOOD DONATION ====================

// Get all blood donation entries (donors and patients)
router.get('/blood-donations', async (req, res) => {
  try {
    const { type, status, bloodGroup, search, page = 1, limit = 20 } = req.query;
    
    const query = {};
    if (type) query.type = type;
    if (status) query.status = status;
    if (bloodGroup) query.bloodGroup = bloodGroup;
    if (search) {
      query.$or = [
        { fullName: new RegExp(search, 'i') },
        { email: new RegExp(search, 'i') },
        { phone: new RegExp(search, 'i') },
        { requestNumber: new RegExp(search, 'i') }
      ];
    }
    
    const entries = await BloodDonation.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .select('-__v');
    
    const total = await BloodDonation.countDocuments(query);
    
    res.json({
      success: true,
      data: entries,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching blood donation entries',
      error: error.message
    });
  }
});

// Get single blood donation entry
router.get('/blood-donations/:id', async (req, res) => {
  try {
    const entry = await BloodDonation.findById(req.params.id);
    if (!entry) {
      return res.status(404).json({
        success: false,
        message: 'Blood donation entry not found'
      });
    }
    res.json({
      success: true,
      data: entry
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching blood donation entry',
      error: error.message
    });
  }
});

// Update blood donation status
router.patch('/blood-donations/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    if (!['pending', 'verified', 'active', 'fulfilled', 'cancelled', 'expired'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status'
      });
    }
    
    const updateData = { 
      status, 
      updatedAt: new Date() 
    };
    
    if (status === 'verified' || status === 'active') {
      updateData.verifiedBy = req.user.id;
      updateData.verifiedAt = new Date();
    }
    
    const entry = await BloodDonation.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    
    if (!entry) {
      return res.status(404).json({
        success: false,
        message: 'Blood donation entry not found'
      });
    }
    
    res.json({
      success: true,
      message: `Entry ${status} successfully`,
      data: entry
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating entry status',
      error: error.message
    });
  }
});

// Update patient request fulfillment
router.patch('/blood-donations/:id/fulfill', async (req, res) => {
  try {
    const { units, donorId } = req.body;
    
    const entry = await BloodDonation.findById(req.params.id);
    if (!entry || entry.type !== 'patient') {
      return res.status(404).json({
        success: false,
        message: 'Patient request not found'
      });
    }
    
    const fulfillment = {
      units: parseInt(units),
      date: new Date()
    };
    if (donorId) fulfillment.donorId = donorId;
    
    entry.fulfilledBy.push(fulfillment);
    entry.unitsFulfilled += parseInt(units);
    
    if (entry.unitsFulfilled >= entry.unitsRequired) {
      entry.status = 'fulfilled';
    }
    
    await entry.save();
    
    res.json({
      success: true,
      message: 'Request updated successfully',
      data: entry
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating request',
      error: error.message
    });
  }
});

// Delete blood donation entry
router.delete('/blood-donations/:id', async (req, res) => {
  try {
    const entry = await BloodDonation.findByIdAndDelete(req.params.id);
    if (!entry) {
      return res.status(404).json({
        success: false,
        message: 'Blood donation entry not found'
      });
    }
    res.json({
      success: true,
      message: 'Blood donation entry deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting blood donation entry',
      error: error.message
    });
  }
});

// Get blood donation stats
router.get('/blood-donations/stats/overview', async (req, res) => {
  try {
    const totalDonors = await BloodDonation.countDocuments({ type: 'donor' });
    const activeDonors = await BloodDonation.countDocuments({ type: 'donor', status: 'active' });
    const totalRequests = await BloodDonation.countDocuments({ type: 'patient' });
    const pendingRequests = await BloodDonation.countDocuments({ type: 'patient', status: 'pending' });
    const fulfilledRequests = await BloodDonation.countDocuments({ type: 'patient', status: 'fulfilled' });
    const urgentRequests = await BloodDonation.countDocuments({ 
      type: 'patient', 
      status: { $in: ['pending', 'verified'] },
      urgency: { $in: ['immediate', 'within_24_hours'] }
    });
    
    // Blood group distribution for donors
    const bloodGroupDistribution = await BloodDonation.aggregate([
      { $match: { type: 'donor', status: 'active' } },
      { $group: { _id: '$bloodGroup', count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);
    
    res.json({
      success: true,
      data: {
        totalDonors,
        activeDonors,
        totalRequests,
        pendingRequests,
        fulfilledRequests,
        urgentRequests,
        bloodGroupDistribution
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching stats',
      error: error.message
    });
  }
});

export default router;

