const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tokenSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "user",
        unique: true,
    },
    token: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: '24h' },
});

// Définition de la méthode removeToken() pour le schéma tokenSchema
tokenSchema.methods.removeToken = async function() {
    try {
        await Token.findOneAndDelete({ _id: this._id }); // Supprimez le token en utilisant findOneAndDelete
        console.log('Token removed successfully.');
    } catch (error) {
        console.error('Error removing token:', error);
        throw new Error('Failed to remove token.');
    }
};


const Token = mongoose.model('Token', tokenSchema);

module.exports = Token;
