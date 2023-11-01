import { body } from "express-validator";

//validating middleware for user
const validateUserFields = [
    body('email').
        isEmail()
        .withMessage('Please provide a valid email address')
        .isLowercase(),
    body('password')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long')
        .matches(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/, 'i')
        .withMessage('Password must contain at least one uppercase letter, one lower case letter, one number, and one special character'),
    body('phoneNumber')
        .isMobilePhone()
        .withMessage('Please add a valid phone number'),
    body('firstName')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Firstname is required'),
    body('lastName')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Lastname is required'),
    body('userName')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Username is required')
];
const validateUpdateProfile = [
    body('firstName')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('First name is required'),
    body('lastName')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('Last name is required'),
    body('phoneNumber')
        .optional()
        .isMobilePhone()
        .withMessage('Invalid Phone Number format'),
    body('userName')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Username is required')
]


export {
    validateUserFields,
    validateUpdateProfile,
}