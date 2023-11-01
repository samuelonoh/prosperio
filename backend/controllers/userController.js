import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';
import sendEmail from '../config/emailSender.js';
import Token from '../models/tokenModels.js'
import crypto from 'crypto' 
import jwt from 'jsonwebtoken'

//@desc Register new user
//@route Post /api/users
//@access Public

const registerUser = asyncHandler(async (req, res) => {
    //Extract user data from the request body
    const {firstName, lastName, userName, email, password} = req.body;

    console.log('Received request with body:', req.body)

    // Validate request
    if (!firstName || !lastName || !userName || !email || !password) {
        console.log('validation failed, please fill all fields')
        res.status(400)
        throw new Error('Please fill all fields')

    }
    console.log('Validation Successful')
    //Validate the length of the password
    if(password.length < 6) {
        res.status(400)
        throw new Error("Password must be up to 6 characters");    
    }
    //Check if user exists
    const userExists = await User.findOne
        ({
            $or: [
                { email },
                { userName }
            ]
        })
    
    if (userExists) {
        res.status(400);
        throw new Error("User alreagy exists. Please login!")
    }

    
    // Create new user
    const user = await User.create({
        firstName,
        lastName,
        userName,
        email,
        password,
    })

    
    
    if (user) {
        generateToken(res, user._id)
        const {
            _id,
            firstName,
            lastName,
            userName,
            email,
            photo,
            phoneNumber,
            bio
        } = user;
    res.status(201).json({
      _id,
      firstName,
      lastName,
      userName,
      email,
      photo,
      phoneNumber,
      bio,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});


//@desc Authenticate a user
//@route POST /api/login
//@access Public
const loginUser = asyncHandler(async (req, res) => {
    const { userNameOrEmail, password } = req.body;

    console.log('Received request with body:', req.body)

    //check if user exist
    const user = await User.findOne({
        $or: [
            { userName: userNameOrEmail },
            { email: userNameOrEmail }
        ],
    });

    if (!user) {
        console.log('validation failed, please fill all fields')
        res.status(400)
        throw new Error("User not found, please signup")
    }

    
    console.log('Validation Successful')
    //proceed with login
    if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id)
        const {
            _id,
            firstName,
            lastName,
            userName,
            email,
            photo,
            phoneNumber,
            bio
        } = user;
    res.status(201).json({
      _id,
      firstName,
      lastName,
      userName,
      email,
      photo,
      phoneNumber,
      bio,
      message: 'User logged in successfully',
    });
  } else {
    res.status(401);
    throw new Error("Invalid user data");
  }
});


//@desc Logout user profile
//@route POST /api/users/me
//@access public
const logoutUser = asyncHandler(async (req, res) => {
  // To logout the user  you need to end the token used while logging in
    res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0),
    });
    
    res.status(200).json({ message: "Successfully logged out!" });
})

//@desc Get user Profile
//@route Get /api/users/me
//@access private
const getProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

  if (user) {
    const { _id, firstName, lastName, userName, email, photo, phoneNumber, bio } = user;
    res.status(200).json({
      _id,
      firstName,
      lastName,
      userName,
      phoneNumber,
      email,
      photo,
      bio,
    });
  } else {
    res.status(400);
    throw new Error("User Not Found");
  }
})

//@desc Get login Status
//@route Get /api/users/loggedin
//@access private
const loginStatus = asyncHandler(async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json(false);
  }
  // Verify Token
  const verified = jwt.verify(token, process.env.JWT_SECRET);
  if (verified) {
    return res.json(true);
  }
  return res.json(false);
});

//@desc Update user profile
//@route PUT /api/users/me
//@access private
const updateProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        const { firstName, lastName, email, userName, 
            phoneNumber, bio, photo } = user; 
        
        user.email = email;
        user.firstName = req.body.firstName || firstName;
        user.lastName = req.body.lastName || lastName;
        user.userName = req.body.userName || userName;
        user.phoneNumber = req.body.phoneNumber || phoneNumber;
        user.bio = req.body.bio || bio;
        user.photo = req.body.photo || photo;

        if (req.body.password) {
            user.password = req.body.password
        }
        
        const updatedProfile = await user.save()
        
        res.status(200).json({
            _id: updatedProfile._id,
            firstName: updatedProfile.firstName,
            lastName: updatedProfile.lastName,
            userName: updatedProfile.userName,
            email: updatedProfile.email,
            phoneNumber: updatedProfile.phoneNumber,
            bio: updatedProfile.bio,
            photo: updatedProfile.photo,
            
        })
    } else {
        res.status(404);
        throw new Error("User not found")
    }
})

//@desc Delete user profile
//@route DELETE /api/users/me
//@access private
const deleteProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);

    if (!user) {
        res.status(404);
        throw new Error ('User not found')
    }

    //Deleting the user from the database
    await user.deleteOne();

    res.json({ message: 'User Profile Deleted Successfully' });
})

//@desc Upload profile picture
//@route Post /api/users/upload-profile-picture
//@access Private
const uploadProfilePicture = asyncHandler(async (req, res) => {
    const { profilePicture } = req.body.profilePicture;
    const user = await User.findById(req.user._id);
    // Get only the profile from db
    user.profilePicture = profilePicture;
    const uploadedProfilePicture = await user.save()
    // send photo to the frontend
    res.status(200).json(uploadedProfilePicture);

})


//@desc Delete profile picture
//@route DELETE /api/users/delete-profile-picture
//@access private
const deleteProfilePicture = asyncHandler(async (req, res) => {
    res.status(200).json({message: 'Delete Profile Picture'})
})

//@desc Forgot Password
//@route POST /api/users/forgotPassword
//@access private
const forgotPassword = asyncHandler(async (req, res) => {
   const { email } = req.body;

  // Check if the user exists i.e if email exists
  const user = await User.findOne({ email });

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  // Generate a reset token if user exists
    //create a reset Token
    const resetToken = crypto
        .randomBytes(32)
        .toString("hex") + user._id

    console.log(resetToken)
    
    //Hash Token before saving to the Database
    const hashedToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex")
    
    // Save the reset token in the database
    await new Token({
        userId: user._id,
        token: hashedToken,
        createdAt: Date.now(),
        expiresAt: Date.now() + 30 * (60 * 1000)//30m
    }).save()

    //construct Reset Link
    const resetLink = `${process.env.BASE_URL}/resetpassword/${resetToken}`;
    // Send the reset password email
    const message = `<h2>Hello ${user.userName},</h2>
        <p>You are receiving this email because you requested a password reset for your account.</p>
        <p>This link is valid for 30 min.</p>
        <p>Please click the following link to reset your password:</p>
        <a href=${resetLink} clicktracking=off>${resetLink}</a>
        <p>If you didn't request this, please ignore this email.</p>
        <p> Prosperio team</p>`;
    
    const subject = "Password Reset Request"
    const send_to = user.email
    const sent_from = process.env.User

    try {
        await sendEmail(subject, message, send_to, sent_from)
        res.status(200).json({
            success: true,
            message: 'Password reset email sent. Please check your email for further instructions.',
        });
    } catch (error) {
        res.status(500)
        throw new Error("Email Not Sent, Please Try Again")
    }
});

//@desc Reset user password
//@route PUT /api/users/reset-password/:resetToken
//@access Private
const resetPassword = asyncHandler(async (req, res) => {
    const { password } = req.body;
    const { resetToken } = req.params
    
    //Hash Token then compare to Token in the database
    const hashedToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex")
    
    //finding the token in the database that belongs to the user
    const userToken = await Token.findOne({
        //hashed token
        token: hashedToken,
        //checking if the token has expired
        expiresAt: {$gt: Date.now()}
    });

    if (!userToken) {
        res.status(400)
        throw new Error('Invalid or expired token')
    }

    //Finding the user if the token has not expired
    const user = await User.findOne({
        _id: userToken.userId
    })
    user.password = password
    await user.save()
    res.status(200).json({
        message: "Password successfully reset. Plerase Login!"
    })

})
    
export {
    registerUser,
    loginUser,
    logoutUser,
    getProfile,
    loginStatus,
    updateProfile,
    deleteProfile,
    uploadProfilePicture,
    deleteProfilePicture,
    forgotPassword,
    resetPassword,
};