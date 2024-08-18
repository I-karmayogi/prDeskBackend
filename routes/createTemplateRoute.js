const express = require('express');
const router = express.Router();
const Template = require('../models/Template');
const HeaderFooter = require('../models/HeaderFooter');
const { protect } = require('../middlewares/authMiddleware');

// Create a new template
router.post('/create', protect, async (req, res) => {
    try {
        const { templateName, templateType, content, headerFooterId } = req.body;

        // Check if the headerFooterId exists in the HeaderFooter collection
        const headerFooter = await HeaderFooter.findById(headerFooterId);
        if (!headerFooter) {
            return res.status(404).json({ success: false, message: 'Header-Footer combination not found' });
        }

        // Create a new template
        const newTemplate = new Template({
            templateName,
            templateType,
            content,
            headerFooter: headerFooter._id, // Store the ID of the selected header-footer
        });

        await newTemplate.save();

        res.status(201).json({
            success: true,
            data: newTemplate,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating template',
            error: error.message,
        });
    }
});

module.exports = router;
