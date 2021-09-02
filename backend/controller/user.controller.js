import { User } from '../models/user.model.js';
import { HttpStatusCode } from '../utils/constants.js';

// @desc    Get all users
// @route   GET /v1/user
// @access  Private/Admin
const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    if (!users) {
      res.status(HttpStatusCode.NOT_FOUND);
      throw new Error('Không tìm thấy users');
    }
    res.json(users);
  } catch (error) {
    res.send({ message: error.message });
  }
};

// @desc    Register a new user
// @route   POST /v1/user
// @access  Public
const registUser = async (req, res) => {
  //const { email, password } = req.body;
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  try {
    const userExists = await User.findOne({ email: email });
    if (userExists) {
      res.status(HttpStatusCode.BAD_REQUEST);
      throw new Error('Email này đã tồn tại!');
    }
  } catch (error) {
    res.send({ message: error.message });
  }

  try {
    const userCreate = await User.create({
      name,
      email,
      password
    });

    if (userCreate) {
      res.status(HttpStatusCode.CREATED_SUCCESS).json({
        _id: userCreate._id,
        name: userCreate.name,
        email: userCreate.email,
        role: userCreate.role
      });
    }
    else {
      throw new Error('Dữ liệu người dùng không hợp lệ!');
    }
  } catch (error) {
    res.status(HttpStatusCode.BAD_REQUEST).send({ message: error.message });
  }
}

//@desc     Get info user by id
//@route    GET /v1/user/profile/:id
//@access   private/ user
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);// error: nếu truyen ko dung objectid se bi loi
    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      });
    }
    else {
      res.status(HttpStatusCode.BAD_REQUEST);
      throw new Error('User not found!');
    };
  } catch (error) {
    res.send({ message: error.message });
  }
}

//@desc     Update user profile
//@route    PUT /v1/user/profile
//@access   private/ user
const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.body._id);

    if (!user) {
      res.status(HttpStatusCode.NOT_FOUND);
      throw new Error('Không tìm thấy user!');
    }

    if (req.body.email && (await User.isEmailTaken(req.body.email, req.body._id))) {
      res.status(HttpStatusCode.BAD_REQUEST);
      throw new Error('Email này đã được sử dụng!');
    }

    Object.assign(user, req.body);

    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
    });
  } catch (error) {
    res.send({ message: error.message });
  }
}

// @desc    Delete user
// @route   DELETE /api/user/:id
// @access  Private/Admin
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      await user.remove();
      res.json({ message: 'Xóa tài khoản thành công!' });
    }
    else {
      res.status(HttpStatusCode.NOT_FOUND);
      throw new Error('Không tìm thấy tài khoản này!');
    }
  } catch (error) {
    res.send({ message: error.message });
  }
}

// @desc    Get user by ID
// @route   GET /api/user/:id
// @access  Private/Admin

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');

    if (user) {
      res.json(user);
    }
    else {
      res.status(HttpStatusCode.NOT_FOUND);
      throw new Error('Không tìm thấy tài khoản!')
    }
  } catch (error) {
    res.send({ message: error.message });
  }
}

// @desc    Update user
// @route   PUT /api/user/:id
// @access  Private/Admin
const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {

      if (req.body.email && (await User.isEmailTaken(req.body.email, req.body._id))) {
        res.status(HttpStatusCode.BAD_REQUEST);
        throw new Error('Email này đã được sử dụng!');
      }

      user.name = req.body.name;
      user.email = req.body.email;
      user.role = req.body.role;

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
      });
    } else {
      res.status(HttpStatusCode.NOT_FOUND);
      throw new Error('User not found');
    }
  } catch (error) {
    res.send({ message: error.message });
  }
}

export const userController =
{
  getUsers,
  registUser,
  getUserProfile,
  updateUserProfile,
  deleteUser,
  updateUser,
  getUserById
};