const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary').v2;
const HeaderFooter = require('../models/headerFooterModel.js');
const upload = require('../middlewares/upload');
const { protect } = require('../middlewares/authMiddleware');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.post('/upload', protect, upload.array(`headerImage`, 1), async (req, res) => {
    try {
        // Check if files are uploaded
        // if (!req.files || !req.files.headerImage) {
        //     return res.status(400).json({
        //         success: false,
        //         message: 'Both headerImage and footerImage are required.',
        //     });
        // }
        console.log(req);

        const {name} =  req.body;

        const headerFooterTemplate = new HeaderFooter({
            name: name,
        })

        console.log(req.files);
        headerFooterTemplate.headerImage = req.files[0];
        await headerFooterTemplate.save();

        console.log('1');

        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error uploading images',
            error: error.message,
        });
    }
});

module.exports = router;

