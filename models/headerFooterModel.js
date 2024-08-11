const mongoose = require('mongoose');

const headerFooterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, // Correctly place `required` outside of `type`
    },
    headerImage: {
        url: {
            type: String,
            required: true, // Correctly place `required` outside of `type`
        },
        public_id: {
            type: String,
            required: true, // Correctly place `required` outside of `type`
        },
    },
    // footerImage: {
    //     url: {
    //         type: String,
    //         //required: true, // Correctly place `required` outside of `type`
    //     },
    //     public_id: {
    //         type: String,
    //        // required: true, // Correctly place `required` outside of `type`
    //     },
    // },
});

module.exports = mongoose.model('HeaderFooter', headerFooterSchema);
