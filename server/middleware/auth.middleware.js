import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/user.model.js';

const isAuth = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1]; //get token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      console.error(error)
      res.status(401)
      throw new Error('Bạn không được quyền truy cập!');
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Không được phép, no token');
  }
});

const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as an admin');
  }
};

const isStaff = (req, res, next) => {
  if (req.user && req.user.role === 'staff') {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as an staff');
  }
};

const isStaffOrAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'staff' || req.user.role === 'admin') {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as an staff or admin');
  }
};

export { isAuth, isAdmin, isStaff, isStaffOrAdmin };