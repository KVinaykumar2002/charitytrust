import express from 'express';
import { authenticate, authorizeAdmin } from '../middleware/auth.js';
import Donation from '../models/Donation.js';
import Program from '../models/Program.js';
import Project from '../models/Project.js';
import Event from '../models/Event.js';
import Testimonial from '../models/Testimonial.js';
import Volunteer from '../models/Volunteer.js';

const router = express.Router();

// All admin routes require authentication and admin role
//router.use(authenticate);
//router.use(authorizeAdmin);

// Admin dashboard data
router.get('/dashboard', async (req, res) => {
  try {
    // Calculate total donations
    const totalDonationsResult = await Donation.aggregate([
      { $match: { status: 'completed' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    const totalDonations = totalDonationsResult[0]?.total || 0;

    // Calculate monthly donations (current month)
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const monthlyDonationsResult = await Donation.aggregate([
      { 
        $match: { 
          status: 'completed',
          createdAt: { $gte: startOfMonth }
        }
      },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    const monthlyDonations = monthlyDonationsResult[0]?.total || 0;

    // Count programs
    const totalPrograms = await Program.countDocuments({ status: 'active' });

    // Count projects
    const totalProjects = await Project.countDocuments();

    // Count upcoming events
    const totalEvents = await Event.countDocuments({ 
      status: { $in: ['upcoming', 'ongoing'] } 
    });

    // Count testimonials
    const totalTestimonials = await Testimonial.countDocuments({ status: 'approved' });

    // Count active volunteers
    const activeVolunteers = await Volunteer.countDocuments({ status: 'active' });

    res.json({
      success: true,
      message: 'Admin dashboard data',
      data: {
        stats: {
          totalDonations,
          totalPrograms,
          totalProjects,
          totalEvents,
          totalTestimonials,
          monthlyDonations,
          activeVolunteers
        }
      }
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching dashboard stats',
      error: error.message
    });
  }
});

// Monthly donations data for chart
router.get('/dashboard/monthly-donations', async (req, res) => {
  try {
    const now = new Date();
    const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 5, 1);
    
    const monthlyData = await Donation.aggregate([
      {
        $match: {
          status: 'completed',
          createdAt: { $gte: sixMonthsAgo }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          amount: { $sum: '$amount' }
        }
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1 }
      }
    ]);

    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const chartData = monthlyData.map(item => ({
      month: monthNames[item._id.month - 1],
      amount: item.amount
    }));

    res.json({
      success: true,
      data: chartData
    });
  } catch (error) {
    console.error('Monthly donations error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching monthly donations',
      error: error.message
    });
  }
});

// Program distribution data for pie chart
router.get('/dashboard/program-distribution', async (req, res) => {
  try {
    const distribution = await Donation.aggregate([
      {
        $match: { status: 'completed' }
      },
      {
        $group: {
          _id: '$programName',
          total: { $sum: '$amount' }
        }
      },
      {
        $sort: { total: -1 }
      }
    ]);

    // If no program-specific donations, get by category from programs
    if (distribution.length === 0) {
      const categoryData = await Program.aggregate([
        {
          $group: {
            _id: '$category',
            count: { $sum: 1 }
          }
        }
      ]);

      const chartData = categoryData.map(item => ({
        name: item._id || 'Other',
        value: item.count
      }));

      return res.json({
        success: true,
        data: chartData
      });
    }

    // Calculate percentages
    const total = distribution.reduce((sum, item) => sum + item.total, 0);
    const chartData = distribution.map(item => ({
      name: item._id || 'General',
      value: total > 0 ? Math.round((item.total / total) * 100) : 0
    }));

    res.json({
      success: true,
      data: chartData
    });
  } catch (error) {
    console.error('Program distribution error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching program distribution',
      error: error.message
    });
  }
});

// Recent activity
router.get('/dashboard/recent-activity', async (req, res) => {
  try {
    const activities = [];

    // Recent donations
    const recentDonations = await Donation.find({ status: 'completed' })
      .sort({ createdAt: -1 })
      .limit(5)
      .select('amount donorName createdAt programName');

    recentDonations.forEach(donation => {
      activities.push({
        type: 'donation',
        action: 'New donation received',
        amount: donation.amount,
        details: donation.programName || 'General',
        time: donation.createdAt
      });
    });

    // Recent events
    const recentEvents = await Event.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('title createdAt');

    recentEvents.forEach(event => {
      activities.push({
        type: 'event',
        action: 'Event created',
        details: event.title,
        time: event.createdAt
      });
    });

    // Recent programs
    const recentPrograms = await Program.find()
      .sort({ updatedAt: -1 })
      .limit(5)
      .select('title updatedAt');

    recentPrograms.forEach(program => {
      activities.push({
        type: 'program',
        action: 'Program updated',
        details: program.title,
        time: program.updatedAt
      });
    });

    // Recent testimonials
    const recentTestimonials = await Testimonial.find({ status: 'approved' })
      .sort({ createdAt: -1 })
      .limit(5)
      .select('name createdAt');

    recentTestimonials.forEach(testimonial => {
      activities.push({
        type: 'testimonial',
        action: 'New testimonial added',
        details: `From ${testimonial.name}`,
        time: testimonial.createdAt
      });
    });

    // Sort by time and limit to 10 most recent
    activities.sort((a, b) => new Date(b.time) - new Date(a.time));
    const recentActivity = activities.slice(0, 10).map(activity => ({
      action: activity.action,
      amount: activity.amount ? `₹${activity.amount.toLocaleString()}` : undefined,
      details: activity.details,
      time: getTimeAgo(activity.time)
    }));

    res.json({
      success: true,
      data: recentActivity
    });
  } catch (error) {
    console.error('Recent activity error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching recent activity',
      error: error.message
    });
  }
});

// Helper function to calculate time ago
function getTimeAgo(date) {
  const now = new Date();
  const diff = now - new Date(date);
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 60) {
    return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
  } else if (hours < 24) {
    return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
  } else {
    return `${days} ${days === 1 ? 'day' : 'days'} ago`;
  }
}

// Admin protected route example
router.get('/users', (req, res) => {
  res.json({
    success: true,
    message: 'Admin can access this route',
    data: {
      users: []
    }
  });
});

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

// Create program - POST /api/admin/programs
router.post('/programs', async (req, res) => {
  try {
    const { title, description, category, featured, image, imageBase64, link, ...otherFields } = req.body;

    // Validate required fields
    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: 'Title and description are required'
      });
    }

    // Map incoming data to Program model
    const programData = {
      title: title.trim(),
      description: description.trim(),
      category: category || 'Other', // Default to 'Other' if category not provided
      imageBase64: imageBase64 || image || '', // Store base64 image
      image: imageBase64 || image || '', // Also store in image field for compatibility
      imageUrl: imageBase64 || image || '', // Also store in imageUrl for backward compatibility
      link: link || '', // Store link if provided
      featured: featured !== undefined ? featured : false, // Store featured flag
      status: 'active', // Default status
      ...otherFields // Include any other fields
    };

    // Create new program
    const program = new Program(programData);
    await program.save();

    res.status(201).json({
      success: true,
      message: 'Program created successfully',
      data: program
    });
  } catch (error) {
    console.error('Error creating program:', error);
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
    const { title, description, category, featured, image, imageBase64, link, ...otherFields } = req.body;

    // Map incoming data
    const updateData = {
      ...otherFields,
      updatedAt: new Date()
    };

    if (title) updateData.title = title.trim();
    if (description) updateData.description = description.trim();
    if (category) updateData.category = category;
    
    // Handle base64 image
    if (imageBase64 !== undefined || image !== undefined) {
      const imageData = imageBase64 || image;
      updateData.imageBase64 = imageData; // Store base6
    }
    
    if (link !== undefined) updateData.link = link;
    if (featured !== undefined) updateData.featured = featured;

    const program = await Program.findByIdAndUpdate(
      req.params.id,
      updateData,
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
    console.error('Error updating program:', error);
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

// Create project - POST /api/admin/projects
router.post('/projects', async (req, res) => {
  try {
    const { title, description, category, location, image, imageBase64, status, startDate, endDate, programId, ...otherFields } = req.body;

    // Validate required fields
    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: 'Title and description are required'
      });
    }

    // Map incoming data to Project model
    const projectData = {
      title: title.trim(),
      description: description.trim(),
      category: category || 'Other',
      location: location || '',
      imageBase64: imageBase64 || image || '',
      image: imageBase64 || image || '',
      imageUrl: imageBase64 || image || '',
      status: status || 'planning',
      startDate: startDate ? new Date(startDate) : undefined,
      endDate: endDate ? new Date(endDate) : undefined,
      programId: programId || null,
      ...otherFields
    };

    // Create new project
    const project = new Project(projectData);
    await project.save();

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: project
    });
  } catch (error) {
    console.error('Error creating project:', error);
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
    const { title, description, category, location, image, imageBase64, status, startDate, endDate, programId, ...otherFields } = req.body;

    // Map incoming data
    const updateData = {
      ...otherFields,
      updatedAt: new Date()
    };

    if (title) updateData.title = title.trim();
    if (description) updateData.description = description.trim();
    if (category !== undefined) updateData.category = category;
    if (location !== undefined) updateData.location = location;
    
    // Handle base64 image
    if (imageBase64 !== undefined || image !== undefined) {
      const imageData = imageBase64 || image;
      updateData.imageBase64 = imageData;
      updateData.image = imageData;
      updateData.imageUrl = imageData;
    }
    
    if (status !== undefined) updateData.status = status;
    if (startDate !== undefined) updateData.startDate = startDate ? new Date(startDate) : undefined;
    if (endDate !== undefined) updateData.endDate = endDate ? new Date(endDate) : undefined;
    if (programId !== undefined) updateData.programId = programId || null;

    const project = await Project.findByIdAndUpdate(
      req.params.id,
      updateData,
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
    console.error('Error updating project:', error);
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

export default router;

