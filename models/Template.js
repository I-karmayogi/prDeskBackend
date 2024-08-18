const mongoose = require('mongoose');

// Create Template schema
const templateSchema = new mongoose.Schema({
    templateName: {
        type: String,
        required: true,
    },
    templateType: {
        type: String,
        enum: ['marriage', 'mourning', 'birthday', 'letter'], // Define valid types
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    headerFooter: {
        type: mongoose.Schema.Types.ObjectId, // Reference to HeaderFooter model
        ref: 'HeaderFooter', // Ensure this references the HeaderFooter schema
        required: true,
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Template', templateSchema);

