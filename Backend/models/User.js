import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },

    // Password is required only if isOAuth is false
    password: {
      type: String,
      required: function() {
        return !this.isOAuth; // Make password required only for non-OAuth users
      },
    },

    profilePicture: { type: String, default: "" },
    userType: { type: String, enum: ['admin', 'user'], default: 'user' },

    // Flag to identify OAuth users
    isOAuth: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model('User', UserSchema);
export default User;
