const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'senderModel',
        required: true,
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'receiverModel',
        required: true,
    },
    senderModel: {
        type: String,
        required: true,
        enum: ['User', 'Veterinary']
    },
    receiverModel: {
        type: String,
        required: true,
        enum: ['User', 'Veterinary']
    },
    content: {
        type: String,
        required: true,
    },
    read: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true,
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
