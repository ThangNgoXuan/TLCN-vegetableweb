import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

// const isAuth2 = async (req, res, next) => {
//   let token;
//   try {

//     if (req.headers.authorization && req.authorization.startsWith('Bearer')) {
//       try {
//         token = req.headers.authorization.split(' ')[1]; //get token
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);

//         req.user = await User.findById(decoded.id).select('-password');

//         next();
//       } catch (error) {
//         console.error(error)
//         res.status(401)
//         throw new Error('Bạn không được quyền truy cập!');
//       }
//     }

//     if (!token) {
//       res.status(401)
//       throw new Error('Không được phép, no token');
//     }
//   } catch (error) {
//     res.json({ message: error.message })
//   }
// };

const isAuth = async (req, res, next) => {
  const authorization = req.headers.authorization;
  console.log(authorization)
  if (authorization) {
    const token = authorization.slice(7, authorization.length); // Bearer XXXXXX

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    req.user = await User.findById(decoded.id).select('-password')

    next()

  } else {
    res.status(401).send({ message: 'No Token' });
  }
};

const isAdmin = (req, res, next) => {
  try {

    if (req.user && req.user.role === 'admin') {
      next();
    } else {
      res.status(401);
      throw new Error('Not authorized as an admin');
    }
  } catch (error) {
    res.json({ message: error.message })
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
