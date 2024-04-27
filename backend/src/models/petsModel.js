const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    datebirth: {
        type: Date,
        required: true,
        validate: {
            validator: function(value) {
                return value instanceof Date && !isNaN(value);
            },
            message: props => `${props.value} is not a valid date!`
        }
    },

    chip_num: Number,
    species: String,
    breed: String,
    sex: String,
    profile_picture: String,
    comments: String
});

const Pets = mongoose.model('Pets', petSchema);

module.exports = Pets;
