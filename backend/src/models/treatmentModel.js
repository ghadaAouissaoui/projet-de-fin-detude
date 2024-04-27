const mongoose = require('mongoose');

const treatmentSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 255
        },
        description: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true  
        }
    },
    { timestamps: false }
);

module.exports = mongoose.model('Treatment', treatmentSchema);
