const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tokenSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User", // Référence au modèle User
    },
    ref:{
        type: String,
        required: true,
    },
    token: { type: String, required: true },
    role: {
        type: String,
        enum: ['veterinaire', 'user'] // Les valeurs autorisées pour le rôle
    },
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
