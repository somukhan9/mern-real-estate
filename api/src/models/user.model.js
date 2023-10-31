import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide name'],
      minLength: [6, 'Name should be at least 6 characters'],
    },
    username: {
      type: String,
      unique: true,
      required: [true, 'Please provide a unique username'],
      minLength: [6, 'Username should be at least 6 characters'],
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Please provide a valid and unique email'],
    },
    password: {
      type: String,
      required: [true, 'Please provide a strong password'],
      minLength: [6, 'Password should be at least 6 characters'],
    },
  },
  { timestamps: true }
)

userSchema.pre('save', function () {
  const salt = bcrypt.genSaltSync(20)
  this.password = bcrypt.hashSync(this.password, salt)
})

userSchema.methods.isPasswordMatched = function (password) {
  return bcrypt.compareSync(password, this.password)
}

userSchema.methods.generateAccessToken = function () {
  const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  })
  return token
}

const User = mongoose.model('User', userSchema)

export default User
