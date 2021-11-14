import mongoose from 'mongoose';
//import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    phone: {
      type: String,
      unique: true,
      trim: true
    },
    password: {
      type: String
    },
    avatar: {
      type: String,
      default: 'https://img.icons8.com/officel/260/000000/person-male.png'
    },
    address: {
      type: String,
      trim: true
    },
    role: {
      type: String,
      required: true,
      default: 'user'
    },
    googleId: {
      type: String,
    },
    passwordReset: {
      type: String,
    }
  },
  {
    timestamps: true,
  }
)

// userSchema.methods.matchPassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// }

// userSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) {
//     next();
//   }

//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
// })

//Check if email is taken
userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
}

export const User = mongoose.model('User', userSchema);
