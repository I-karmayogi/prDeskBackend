const express = require('express');
const router = express.Router();
const HeaderFooter = require('../models/headerFooterModel.js');
const upload = require('../middlewares/upload');
const { protect } = require('../middlewares/authMiddleware');




// auth middleware removed for testing
router.post('/upload', upload.array(`image`, 2), async (req, res) => {
    try {
        // Check if files are uploaded
        // if (!req.files || !req.files.headerImage) {
        //     return res.status(400).json({
        //         success: false,
        //         message: 'Both headerImage and footerImage are required.',
        //     });
        // }
        console.log(req);

        const { name } = req.body;

        const headerFooterTemplate = new HeaderFooter({
            name: name,
        })

        console.log(req.files);
        headerFooterTemplate.headerImage.filename = req.files[0].filename;
        headerFooterTemplate.headerImage.url = req.files[0].path;
        headerFooterTemplate.footerImage.filename = req.files[1].filename;
        headerFooterTemplate.footerImage.url = req.files[1].path;
        await headerFooterTemplate.save();

        res.status(201).json({
            success: true,
            message: 'Images uploaded successfully',
            data: headerFooterTemplate,
        });


    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error uploading images',
            error: error.message,
        });
    }
});

module.exports = router;

