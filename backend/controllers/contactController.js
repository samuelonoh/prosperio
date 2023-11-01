import asyncHandler from 'express-async-handler'
import sendEmail from '../config/emailSender.js';
import User from '../models/userModel.js'

//@desc Contact Us
//@route POST /api/contactUs/
//@access public
const contactUs = asyncHandler(async (req, res) => {
    const { subject, message } = req.body
    const user = await User.findById(req.user._id)

    if (!user) {
        res.status(400)
        throw new Error("User not found, please signup")
    }

    if (!subject || !message) {
        res.status(400)
        throw new Error("Please add a valid subject and message")
    }
    const send_to = process.env.USER;
    const sent_from = process.env.USER;
    const reply_to = user.email;

    console.log("send_to:", send_to)
    console.log("sent_from:", sent_from)
    try {
        await sendEmail(subject, message, send_to, sent_from, reply_to);
        res.status(200).json({success: true, message:"Email sent successfully"})
    } catch (error) {
        res.status(500)
        throw new Error("Email not sent, please try again")
    }

});


export default contactUs;