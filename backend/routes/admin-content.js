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
    const testimonial = new Testimonial(req.body);
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
    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: new Date() },
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

export default router;

