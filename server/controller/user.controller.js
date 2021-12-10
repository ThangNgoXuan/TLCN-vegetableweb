import bcrypt from 'bcryptjs'
import { OAuth2Client } from 'google-auth-library'
import User from '../models/user.model.js';
import { HttpStatusCode } from '../utils/constants.js';
import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import Token from '../models/token.model.js'
import { sendMail } from '../utils/sendMail.js';
import crypto from 'crypto'

// @desc    Get all users
// @route   GET /v1/user
// @access  Private/Admin
// const getUsers = async (req, res) => {
//   try {
//     const users = await User.find({});
//     if (!users) {
//       res.status(HttpStatusCode.NOT_FOUND);
//       throw new Error('Không tìm thấy users');
//     }
//     res.json(users);
//   } catch (error) {
//     res.send({ message: error.message });
//   }
// };

const getUsers = async (req, res) => {
  const pageSize = 8;
  const page = Number(req.query.pageNumber) || 1;
  const keyword = req.query.keyword === 'undefined' ? '' : req.query.keyword;
  //console.log(keyword)
  // let objectId = mongoose.Types.ObjectId;
  // if (objectId.isValid(keyword)) {
  //   const kq = await User.findById(keyword)
  //   if (kq) {
  //     res.json([kq]);
  //     return
  //   }
  // }

  const searchFilter = keyword ? {
    $or: [
      {
        firstName: {
          $regex: keyword,
          $options: "$i"
        }
      },
      {
        lastName: {
          $regex: keyword,
          $options: "$i"
        }
      },
      {
        email: {
          $regex: keyword,
          $options: "$i"
        }
      },
      {
        phone: {
          $regex: keyword,
          $options: "$i"
        }
      },
    ]
  } : {}

  const count = await User.count({
    ...searchFilter,
  });

  const users = await User.find({
    ...searchFilter,
  })
    .skip(pageSize * (page - 1))
    .limit(pageSize);

  if (users) {
    res.json({ users, page, pages: Math.ceil(count / pageSize) });
  } else {
    res.json([]).status(HttpStatusCode.NOT_FOUND);
    throw new Error('Không tìm thấy tài khoản');
  }
};

// @desc    Login 
// @route   Post /v1/user/login
// @access  Public
// const signinUser = asyncHandler(async (req, res) => {

//   const user = await User.findOne({ email: req.body.email });
//   if (user) {
//     if (await user.matchPassword(req.body.password)) {
//       res.json({
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         token: generateToken(user._id),
//       })
//     } else {
//       res.status(401);
//       throw new Error('Sai mật khẩu!');
//     }
//   } else {
//     res.status(401);
//     res.send('Email bạn nhập không chính xác')
//     throw new Error('Email bạn nhập không chính xác!');
//   }
// });

const signinUser = async (req, res) => {
  try {

    const user = await User.findOne({ email: req.body.email });
    if (user && user.status === false) {
      res.status(401)
      throw new Error('Tài khoản của bạn đang bị khóa');
    }

    if (user && await user.matchPassword(req.body.password)) {
      res.json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        email: user.email,
        address: user.address,
        token: generateToken(user._id),
      })
    } else {
      res.status(401);
      throw new Error('Sai tài khoản hoặc mật khẩu');
    }

  } catch (error) {
    res.send({ message: error.message });
  }
};

const googleLogin = asyncHandler(async (req, res) => {
  const { token, ggId } = req.body;
  const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID);
  const ticket = await client.verifyIdToken({
    idToken: token,
    //audience: process.env
  })

  if (ticket) {
    const { email, given_name, family_name, picture } = ticket.payload;
    const oldAccount = await User.findOne({ email: email });
    let user;
    if (oldAccount) {
      if (oldAccount.status === false) {
        res.status(401)
        throw new Error('Tài khoản của bạn đang bị khóa!')
      } else {
        user = {
          _id: oldAccount._id,
          firstName: oldAccount.firstName,
          lastName: oldAccount.lastName,
          email: oldAccount.email,
          role: oldAccount.role,
          phone: oldAccount.phone,
          email: oldAccount.email,
          address: oldAccount.address,
          avatar: oldAccount.avatar,
        };
      }

    } else {

      const userCreate = await User.create({
        firstName: given_name,
        lastName: family_name,
        googleId: ggId,
        avatar: picture,
        email: email
      });
      if (userCreate) {
        user = {
          _id: userCreate._id,
          firstName: userCreate.firstName,
          lastName: userCreate.lastName,
          email: userCreate.email,
          role: userCreate.role,
          avatar: userCreate.avatar,
        };
      } else {
        res.status(401)
        throw new Error('Đăng nhập không thành công');
      }
    }
    if (user) {
      res.status(200).json({
        ...user,
        token: generateToken(user._id),
      });
    } else {
      res.status(401)
      throw new Error('Đăng nhập không thành công');
    }
  }
});

// @desc    Register a new user
// @route   POST /v1/user/register
// @access  Public
const registUser = async (req, res) => {
  //const { email, password } = req.body;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
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
      firstName,
      lastName,
      email,
      password,
    });

    if (userCreate) {
      res.status(HttpStatusCode.CREATED_SUCCESS).json({
        _id: userCreate._id,
        firstName: userCreate.firstName,
        lastName: userCreate.lastName,
        email: userCreate.email,
        role: userCreate.role,
        avatar: userCreate.avatar,
        phone: userCreate.phone,
        token: generateToken(userCreate._id),
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
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        address: user.address,
        avatar: user.avatar,
        role: user.role,
        status: user.status,
      });
    }
    else {
      res.status(HttpStatusCode.BAD_REQUEST);
      throw new Error('User not found!');
    };
  } catch (error) {
    res.json({ message: error.message });
  }
}

//@desc     Update user profile
//@route    PUT /v1/user/profile
//@access   private/ user
const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.body._id);

    if (user) {
      if (req.body.email && (await User.isEmailTaken(req.body.email, req.body._id))) {
        res.status(HttpStatusCode.BAD_REQUEST);
        throw new Error('Email này đã được sử dụng!');
      }
      user.firstName = req.body.firstName || user.firstName
      user.lastName = req.body.lastName || user.lastName
      user.email = req.body.email || user.email
      user.avatar = req.body.avatar || user.avatar
      user.status = req.body.status || user.status
      user.phone = req.body.phone || user.phone
      user.address = req.body.address || user.address
      if (req.body.password) {
        user.password = req.body.password
      }
    }
    else {
      res.status(HttpStatusCode.NOT_FOUND);
      throw new Error('Không tìm thấy user!');
    }

    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      phone: updatedUser.phone,
      address: updatedUser.address,
      avatar: updatedUser.avatar,
      role: updatedUser.role,
      token: generateToken(updatedUser._id),
    });
    console.log("user update")

  } catch (error) {
    res.json({ message: error.message });
    console.log(error.message)
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

      user.firstName = req.body.firstName;
      user.lastName = req.body.lastName;
      user.email = req.body.email;
      user.role = req.body.role;
      user.phone = req.body.phone;
      user.address = req.body.address;

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
        phone: user.phone,
        address: user.address,
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

// [PATCH] - /api/users/update-password
const updatePassword = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userUpdated = await User.updateOne({ email }, { password });
    if (userUpdated) {
      res.send({ message: "Update user successfully!", data: userUpdated });
    }
  } catch (error) {
    res.send({ message: error.message });
  }
}

// [POST] - /api/fogot-password
const sentCodeResetPassword = async (req, res) => {
  const email = req.body.email;
  try {
    const user = await User.findOne({ email });

    if (!user)
      return res.status(400).send({ message: 'Email không tồn tại trong hệ thống!' });

    let token = await Token.findOne({ userId: user._id });
    if (!token) {

      token = await new Token({
        userId: user._id,
        token: crypto.randomBytes(4).toString("hex"),
      }).save();
    }

    const subject = 'NSHC - Đặt lại mật khẩu';
    const code = generateToken(user._id);
    const content = `
        <p>Xin chào ${user.firstName},</p>
        <p>NSHC đã nhận được yêu cầu đổi mật khẩu của bạn. 
            Đây là mã kích hoạt để đổi mật khẩu: <b>${token.token}</b></p>
        <p>Nếu bạn không yêu cầu đổi mật khẩu thì hãy bỏ qua email này để tài khoản được bảo mật nhé!</p>
        <p>Trân trọng,</p>
        <p>NSHC</p>`;
    sendMail(email, subject, content);

    res.send({ status: 'SENT_EMAIL', _id: user._id });
  } catch (error) {
    res.send({ message: error.message });
  }
}

// [POST] - /api/auth/reset-password
const resetPassword = async (req, res) => {
  console.log(req.body)

  const { code, password, _id } = req.body;
  try {
    const user = await User.findById(_id);

    if (!user) {
      res.status(400).json({ mesage: "Mã code không chính xác hoặc đã hết hạn" })
      return

    }
    const token = await Token.findOne({
      userId: user._id,
      token: code,
    });

    if (!token) {
      res.status(400).json({ mesage: "Mã code không chính xác hoặc đã hết hạn" })
      return;
      ;
    }

    user.password = password;
    const userSave = await user.save();
    delete userSave.password;
    await token.delete();

    res.send({ status: "Cập nhật mật khẩu thành công" });

  } catch (error) {
    res.send({ message: error.message });
    console.log({ message: error.message })
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
  getUserById,
  signinUser,
  googleLogin,
  updatePassword,
  sentCodeResetPassword,
  resetPassword,
};