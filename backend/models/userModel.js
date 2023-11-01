import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'A user must have a First name'],
        
    },
    lastName: {
        type: String,
        required: [true, 'A user must have a Last name'],
        
    },
    userName: {
        type: String,
        required: [true, 'A user must have a username'],
        unique: true,
    },
    phoneNumber: {
        type: String,
        required: [true, 'Please add a phone number'],
        default: "+234"
    },
    email: {
        type: String,
        required: [true, 'A user must have an email'],
        unique: true,
        
    },
    password: {
        type: String,
        required: [true, 'A user must have a password'],
    },
    
   
    
    bio: {
        type: String,
        maxLength: [250, "Bio must not be more than 250 characters"],
        default: "bio",
    },
    photo: {
        type: String,
        required: [true, "Please add a photo"],
        default: "https://i.ibb.co/4pDNDk1/avatar.png"
    },
    isLoggedIn: {
        type: Boolean,
        default: false,
    }
},
{
    timestamps: true
});


// Encrypt password before saving to DB
userSchema.pre("save", async function(next) {
    if (!this.isModified("password")) {
        next()
    }
    //Hash password
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

const User = mongoose.model('User', userSchema);

export default User;