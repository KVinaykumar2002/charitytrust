import express from 'express';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
import RegularUser from '../models/RegularUser.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Register endpoint - STRICT SEPARATION: Uses separate collections based on role
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and password are required'
      });
    }

    const userRole = role || 'user'; // Default to 'user'
    const emailLower = email.toLowerCase();

    // STRICT SEPARATION: Check appropriate collection
    if (userRole === 'admin') {
      // Check Admin collection
      const existingAdmin = await Admin.findOne({ email: emailLower });
      if (existingAdmin) {
        return res.status(409).json({
          success: false,
          message: 'Admin with this email already exists'
        });
      }

      // Create admin in Admin collection
      const admin = new Admin({
        name,
        email: emailLower,
        password, // Storing password as-is
        role: 'admin' // Fixed role
      });

      await admin.save();

      // Generate JWT token
      const token = jwt.sign(
        { userId: admin._id, email: admin.email, role: admin.role, userType: 'admin' },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      return res.status(201).json({
        success: true,
        message: 'Admin registered successfully',
        data: {
          token,
          user: {
            id: admin._id,
            name: admin.name,
            email: admin.email,
            role: admin.role
          },
          redirectPath: '/admin/dashboard'
        }
      });
    } else {
      // Check RegularUser collection
      const existingUser = await RegularUser.findOne({ email: emailLower });
      if (existingUser) {
        return res.status(409).json({
          success: false,
          message: 'User with this email already exists'
        });
      }

      // Create user in RegularUser collection
      const user = new RegularUser({
        name,
        email: emailLower,
        password, // Storing password as-is
        role: 'user' // Fixed role
      });

      await user.save();

      // Generate JWT token
      const token = jwt.sign(
        { userId: user._id, email: user.email, role: user.role, userType: 'user' },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      return res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: {
          token,
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
          },
          redirectPath: '/'
        }
      });
    }
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Error registering user',
      error: error.message
    });
  }
});

// Login endpoint - STRICT SEPARATION: Checks Admin and RegularUser collections separately
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    let user = null;
    let userType = null;

    // STRICT SEPARATION: First check Admin collection
    const admin = await Admin.findOne({ email: email.toLowerCase() });
    if (admin) {
      // Check password (exact match, no hashing)
      if (admin.password === password) {
        user = admin;
        userType = 'admin';
      } else {
        // Wrong password for admin account
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password'
        });
      }
    } else {
      // Not an admin, check RegularUser collection
      const regularUser = await RegularUser.findOne({ email: email.toLowerCase() });
      if (regularUser) {
        // Check password (exact match, no hashing)
        if (regularUser.password === password) {
          user = regularUser;
          userType = 'user';
        } else {
          // Wrong password for user account
          return res.status(401).json({
            success: false,
            message: 'Invalid email or password'
          });
        }
      } else {
        // User not found in either collection
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password'
        });
      }
    }

    // STRICT ROLE VALIDATION: Ensure role matches collection
    if (userType === 'admin' && user.role !== 'admin') {
      return res.status(500).json({
        success: false,
        message: 'Authentication error: Invalid admin role'
      });
    }
    if (userType === 'user' && user.role !== 'user') {
      return res.status(500).json({
        success: false,
        message: 'Authentication error: Invalid user role'
      });
    }

    // Generate JWT token with role
    const token = jwt.sign(
      { 
        userId: user._id, 
        email: user.email, 
        role: user.role,
        userType: userType // Additional security: track which collection
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // STRICT REDIRECT: Based on verified role
    const redirectPath = user.role === 'admin' ? '/admin/dashboard' : '/';

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        role: user.role,
        redirectPath,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Error during login',
      error: error.message
    });
  }
});

// Verify token endpoint - STRICT SEPARATION: Checks correct collection based on role
router.get('/verify', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided'
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    let user = null;

    // STRICT SEPARATION: Check correct collection based on role
    if (decoded.role === 'admin') {
      // Admin must be in Admin collection
      user = await Admin.findById(decoded.userId).select('-password');
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'Admin account not found'
        });
      }
      // Double-check role
      if (user.role !== 'admin') {
        return res.status(403).json({
          success: false,
          message: 'Invalid admin role'
        });
      }
    } else if (decoded.role === 'user') {
      // User must be in RegularUser collection
      user = await RegularUser.findById(decoded.userId).select('-password');
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User account not found'
        });
      }
      // Double-check role
      if (user.role !== 'user') {
        return res.status(403).json({
          success: false,
          message: 'Invalid user role'
        });
      }
    } else {
      return res.status(403).json({
        success: false,
        message: 'Invalid role in token'
      });
    }

    res.json({
      success: true,
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      }
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Invalid or expired token'
    });
  }
});

export default router;

