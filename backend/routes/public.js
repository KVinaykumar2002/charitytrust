/**
 * Public Routes (No Authentication Required)
 * For public-facing pages like homepage
 */

import express from 'express';
import Program from '../models/Program.js';
import Project from '../models/Project.js';
import Event from '../models/Event.js';
import FanEvent from '../models/FanEvent.js';
import Testimonial from '../models/Testimonial.js';
import HeroImage from '../models/HeroImage.js';
import Timeline from '../models/Timeline.js';
import TeamCategory from '../models/TeamCategory.js';
import EyeDonationPledge from '../models/EyeDonationPledge.js';
import BloodDonation from '../models/BloodDonation.js';

const router = express.Router();

// ==================== PUBLIC PROGRAMS ====================

// Get all active programs (public - no auth required)
router.get('/programs', async (req, res) => {
  try {
    // Optimize query with lean() for faster performance
    const programs = await Program.find({ status: 'active' })
      .sort({ startDate: -1, createdAt: -1 })
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
      .sort({ startDate: -1, createdAt: -1 })
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

// ==================== PUBLIC FAN EVENTS ====================

// Submit fan event (public - no auth required)
router.post('/fan-events', async (req, res) => {
  try {
    const { title, eventDate, eventBy, photos, videoBase64, videoUrl } = req.body;

    if (!title || !eventDate || !eventBy) {
      return res.status(400).json({
        success: false,
        message: 'Event title, date, and organizer (Event By) are required'
      });
    }

    const fanEvent = new FanEvent({
      title,
      eventDate: new Date(eventDate),
      eventBy,
      photos: Array.isArray(photos) ? photos.slice(0, 5) : [],
      videoBase64: videoBase64 || undefined,
      videoUrl: videoUrl || undefined,
      status: 'pending'
    });

    await fanEvent.save();

    res.status(201).json({
      success: true,
      message: 'Your fan event has been submitted for review. It will appear on the website once approved by our team.',
      data: { id: fanEvent._id }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error submitting fan event',
      error: error.message
    });
  }
});

// Get approved fan events (public - no auth required)
router.get('/fan-events', async (req, res) => {
  try {
    const fanEvents = await FanEvent.find({ status: 'approved' })
      .sort({ eventDate: -1 })
      .select('-__v')
      .limit(50)
      .lean();

    res.json({
      success: true,
      data: fanEvents
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching fan events',
      error: error.message
    });
  }
});

// ==================== PUBLIC TESTIMONIALS ====================

// Get approved testimonials (public)
router.get('/testimonials', async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ status: 'approved' })
      .sort({ featured: -1, order: 1, createdAt: -1 })
      .select('-__v -email')
      .limit(20)
      .lean();
    
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

// ==================== PUBLIC TIMELINE ====================

// Get active timeline entries (public - no auth required)
router.get('/timeline', async (req, res) => {
  try {
    const timeline = await Timeline.find({ active: true })
      .sort({ order: 1, createdAt: 1 })
      .select('-__v')
      .lean();
    
    res.json({
      success: true,
      data: timeline
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching timeline',
      error: error.message
    });
  }
});

// ==================== PUBLIC TEAM (Our Team section) ====================

// Ensure default Our Organizers and Government Hospitals categories exist (same logic as admin)
async function ensurePublicTeamSectionCategories() {
  const organizers = await TeamCategory.findOne({ sectionType: 'organizers' });
  if (!organizers) {
    await TeamCategory.create({
      name: 'Our Organizers',
      role: '',
      description: 'Our organizers are the backbone of Chiranjeevi Charitable Trust. They plan and execute blood donation camps, eye donation drives, and community programs—bringing our mission to life across the region.',
      icon: 'UsersRound',
      sectionType: 'organizers',
      order: 1000,
      members: [],
    });
  }
  const hospitals = await TeamCategory.findOne({ sectionType: 'government_hospitals' });
  if (!hospitals) {
    await TeamCategory.create({
      name: 'Government Hospitals',
      role: '',
      description: 'We work with government hospitals and related institutions to extend blood and eye donation services, support public health initiatives, and reach more beneficiaries in need.',
      icon: 'Building2',
      sectionType: 'government_hospitals',
      order: 1001,
      members: [],
    });
  }
}

// Get all team categories with members (public - no auth required)
router.get('/team', async (req, res) => {
  try {
    await ensurePublicTeamSectionCategories();
    const categories = await TeamCategory.find()
      .sort({ order: 1, createdAt: 1 })
      .select('-__v')
      .lean();
    res.json({
      success: true,
      data: categories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching team',
      error: error.message,
    });
  }
});

// ==================== EYE DONATION PLEDGE ====================

// Submit eye donation pledge (public - no auth required)
router.post('/eye-donation-pledge', async (req, res) => {
  try {
    const {
      fullName,
      dateOfBirth,
      gender,
      bloodGroup,
      email,
      phone,
      alternatePhone,
      address,
      nextOfKin,
      wearingSpectacles,
      hadEyeSurgery,
      eyeSurgeryDetails,
      hasEyeDisease,
      eyeDiseaseDetails,
      hasConsented,
      familyAware,
      howDidYouHear,
      additionalNotes
    } = req.body;

    // Validate required fields
    if (!fullName || !dateOfBirth || !gender || !email || !phone || !address || !nextOfKin || !hasConsented) {
      return res.status(400).json({
        success: false,
        message: 'Please fill in all required fields'
      });
    }

    // Check if email already registered
    const existingPledge = await EyeDonationPledge.findOne({ 
      email: email.toLowerCase(),
      status: { $nin: ['cancelled'] }
    });
    
    if (existingPledge) {
      return res.status(400).json({
        success: false,
        message: 'An eye donation pledge with this email already exists'
      });
    }

    const pledge = new EyeDonationPledge({
      fullName,
      dateOfBirth,
      gender,
      bloodGroup: bloodGroup || 'unknown',
      email,
      phone,
      alternatePhone,
      address,
      nextOfKin,
      wearingSpectacles,
      hadEyeSurgery,
      eyeSurgeryDetails: hadEyeSurgery ? eyeSurgeryDetails : undefined,
      hasEyeDisease,
      eyeDiseaseDetails: hasEyeDisease ? eyeDiseaseDetails : undefined,
      hasConsented,
      familyAware,
      howDidYouHear,
      additionalNotes,
      status: 'pending'
    });

    await pledge.save();

    res.status(201).json({
      success: true,
      message: 'Thank you for pledging to donate your eyes. Your pledge has been registered successfully.',
      data: {
        pledgeNumber: pledge.pledgeNumber,
        fullName: pledge.fullName,
        email: pledge.email
      }
    });
  } catch (error) {
    console.error('Eye donation pledge error:', error);
    res.status(500).json({
      success: false,
      message: 'Error submitting eye donation pledge',
      error: error.message
    });
  }
});

// ==================== BLOOD DONATION ====================

// Submit blood donor registration (public - no auth required)
router.post('/blood-donation/donor', async (req, res) => {
  try {
    const {
      fullName,
      dateOfBirth,
      gender,
      bloodGroup,
      email,
      phone,
      alternatePhone,
      address,
      weight,
      lastDonationDate,
      hasTattoo,
      tattooDate,
      hasRecentIllness,
      illnessDetails,
      takingMedication,
      medicationDetails,
      hasChronicDisease,
      chronicDiseaseDetails,
      availableForEmergency,
      preferredDonationCenter,
      howDidYouHear,
      additionalNotes,
      hasConsented
    } = req.body;

    // Validate required fields
    if (!fullName || !dateOfBirth || !gender || !bloodGroup || !email || !phone || !address || !hasConsented) {
      return res.status(400).json({
        success: false,
        message: 'Please fill in all required fields'
      });
    }

    // Validate age (must be 18-65)
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    if (age < 18 || age > 65) {
      return res.status(400).json({
        success: false,
        message: 'Blood donors must be between 18 and 65 years old'
      });
    }

    // Validate weight (must be > 45kg)
    if (weight && weight < 45) {
      return res.status(400).json({
        success: false,
        message: 'Blood donors must weigh at least 45 kg'
      });
    }

    // Check if donor already registered with same email/phone
    const existingDonor = await BloodDonation.findOne({ 
      type: 'donor',
      $or: [{ email: email.toLowerCase() }, { phone }],
      status: { $nin: ['cancelled'] }
    });
    
    if (existingDonor) {
      return res.status(400).json({
        success: false,
        message: 'A blood donor registration with this email or phone already exists'
      });
    }

    const donor = new BloodDonation({
      type: 'donor',
      fullName,
      dateOfBirth,
      age,
      gender,
      bloodGroup,
      email,
      phone,
      alternatePhone,
      address,
      weight,
      lastDonationDate,
      hasTattoo,
      tattooDate: hasTattoo ? tattooDate : undefined,
      hasRecentIllness,
      illnessDetails: hasRecentIllness ? illnessDetails : undefined,
      takingMedication,
      medicationDetails: takingMedication ? medicationDetails : undefined,
      hasChronicDisease,
      chronicDiseaseDetails: hasChronicDisease ? chronicDiseaseDetails : undefined,
      availableForEmergency,
      preferredDonationCenter,
      howDidYouHear,
      additionalNotes,
      hasConsented,
      status: 'pending'
    });

    await donor.save();

    res.status(201).json({
      success: true,
      message: 'Thank you for registering as a blood donor. Your registration has been submitted successfully.',
      data: {
        requestNumber: donor.requestNumber,
        fullName: donor.fullName,
        bloodGroup: donor.bloodGroup,
        email: donor.email
      }
    });
  } catch (error) {
    console.error('Blood donor registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Error submitting blood donor registration',
      error: error.message
    });
  }
});

// Submit blood request for patient (public - no auth required)
router.post('/blood-donation/patient', async (req, res) => {
  try {
    const {
      fullName,
      dateOfBirth,
      gender,
      bloodGroup,
      email,
      phone,
      alternatePhone,
      address,
      hospitalName,
      hospitalAddress,
      doctorName,
      doctorPhone,
      patientCondition,
      surgeryDate,
      unitsRequired,
      urgency,
      attendant,
      howDidYouHear,
      additionalNotes,
      hasConsented
    } = req.body;

    // Validate required fields
    if (!fullName || !dateOfBirth || !gender || !bloodGroup || !email || !phone || !address || !hasConsented) {
      return res.status(400).json({
        success: false,
        message: 'Please fill in all required fields'
      });
    }

    if (!hospitalName || !unitsRequired) {
      return res.status(400).json({
        success: false,
        message: 'Hospital name and units required are mandatory'
      });
    }

    const patientRequest = new BloodDonation({
      type: 'patient',
      fullName,
      dateOfBirth,
      gender,
      bloodGroup,
      email,
      phone,
      alternatePhone,
      address,
      hospitalName,
      hospitalAddress,
      doctorName,
      doctorPhone,
      patientCondition,
      surgeryDate,
      unitsRequired,
      urgency: urgency || 'within_week',
      attendant,
      howDidYouHear,
      additionalNotes,
      hasConsented,
      status: 'pending'
    });

    await patientRequest.save();

    res.status(201).json({
      success: true,
      message: 'Your blood request has been submitted successfully. We will contact you shortly.',
      data: {
        requestNumber: patientRequest.requestNumber,
        fullName: patientRequest.fullName,
        bloodGroup: patientRequest.bloodGroup,
        unitsRequired: patientRequest.unitsRequired,
        urgency: patientRequest.urgency
      }
    });
  } catch (error) {
    console.error('Blood request submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Error submitting blood request',
      error: error.message
    });
  }
});

// Get available blood donors by blood group (public - for matching)
router.get('/blood-donation/donors', async (req, res) => {
  try {
    const { bloodGroup, city } = req.query;
    
    const query = {
      type: 'donor',
      status: 'active',
      availableForEmergency: true
    };
    
    if (bloodGroup) {
      query.bloodGroup = bloodGroup;
    }
    
    if (city) {
      query['address.city'] = new RegExp(city, 'i');
    }

    // Only return count and general availability, not personal details
    const donorCount = await BloodDonation.countDocuments(query);
    
    res.json({
      success: true,
      data: {
        availableDonors: donorCount,
        bloodGroup: bloodGroup || 'all',
        city: city || 'all'
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching donor availability',
      error: error.message
    });
  }
});

export default router;

