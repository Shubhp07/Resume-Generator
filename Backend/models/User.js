import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
	{
		name: { type: String, trim: true },
		email: { type: String, required: true, unique: true, lowercase: true, trim: true },
		password : {type : String, required: true},
		profilePicture:{type:String,default:""},
		userType:{type:String,enum:['admin','user'],default:'user'}
	},
	{ timestamps: true }
);

const User = mongoose.models.User || mongoose.model('User', UserSchema);
export default User;	