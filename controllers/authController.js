const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

// Generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

exports.registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const user = await User.create({ username, email, password });
        res.status(201).json({
            success: true,
            token: generateToken(user._id),
            user: { id: user._id, username: user.username, email: user.email }
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (user && await user.matchPassword(password)) {
            res.json({
                success: true,
                token: generateToken(user._id),
                user: { id: user._id, username: user.username, email: user.email }
            });
        } else {
            res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};


const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

exports.uploadImage = async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path);
        res.status(200).json({ success: true, url: result.secure_url });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

