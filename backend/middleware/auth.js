import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
import RegularUser from '../models/RegularUser.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Authentication middleware - STRICT SEPARATION: Verifies JWT token and checks correct collection
export const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided.'
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    let user = null;

    // STRICT SEPARATION: Check correct collection based on role
    if (decoded.role === 'admin') {
      // Admin must be in Admin collection
      user = await Admin.findById(decoded.userId);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'Admin account not found'
        });
      }
      // STRICT VALIDATION: Ensure role matches
      if (user.role !== 'admin') {
        return res.status(403).json({
          success: false,
          message: 'Access denied. Invalid admin role.'
        });
      }
    } else if (decoded.role === 'user') {
      // User must be in RegularUser collection
      user = await RegularUser.findById(decoded.userId);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User account not found'
        });
      }
      // STRICT VALIDATION: Ensure role matches
      if (user.role !== 'user') {
        return res.status(403).json({
          success: false,
          message: 'Access denied. Invalid user role.'
        });
      }
    } else {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Invalid role in token.'
      });
    }

    // Attach user info to request
    req.user = {
      id: user._id,
      email: user.email,
      role: user.role,
      name: user.name
    };

    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Invalid token'
      });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token expired'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Error authenticating user'
    });
  }
};

// Authorization middleware - STRICT: Only allows admin role from Admin collection
export const authorizeAdmin = (req, res, next) => {
  // STRICT CHECK: Must be admin role
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Admin privileges required. Only accounts from the Admin collection can access this route.'
    });
  }
  
  // Additional security: Verify admin still exists in Admin collection
  Admin.findById(req.user.id)
    .then(admin => {
      if (!admin || admin.role !== 'admin') {
        return res.status(403).json({
          success: false,
          message: 'Access denied. Admin account not found or invalid.'
        });
      }
      next();
    })
    .catch(() => {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Unable to verify admin account.'
      });
    });
};

// Authorization middleware - STRICT: Only allows user role from RegularUser collection
export const authorizeUser = (req, res, next) => {
  // STRICT CHECK: Must be user role (not admin)
  if (!req.user || req.user.role !== 'user') {
    return res.status(403).json({
      success: false,
      message: 'Access denied. User privileges required. Admin accounts cannot access user routes.'
    });
  }
  
  // Additional security: Verify user still exists in RegularUser collection
  RegularUser.findById(req.user.id)
    .then(user => {
      if (!user || user.role !== 'user') {
        return res.status(403).json({
          success: false,
          message: 'Access denied. User account not found or invalid.'
        });
      }
      next();
    })
    .catch(() => {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Unable to verify user account.'
      });
    });
};

