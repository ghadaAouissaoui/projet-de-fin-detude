const express = require('express');
const router = express.Router();
const Message = require('../models/messageModel');
const User = require('../models/userModel');
const Veterinary=require('../models/veterinaryModel');


// Route pour envoyer un message
router.post('/', async (req, res) => {
    const { senderId, receiverId, content } = req.body;

    try {
        // Recherche à la fois dans User et Veterinary pour le sender
        const [senderUser, senderVeterinary] = await Promise.all([
            User.findById(senderId),
            Veterinary.findById(senderId)
        ]);

        // Vérification si le sender existe dans User ou Veterinary
        if (!senderUser && !senderVeterinary) {
            return res.status(404).json({ message: 'Sender not found' });
        }

        // Recherche à la fois dans User et Veterinary pour le receiver
        const [receiverUser, receiverVeterinary] = await Promise.all([
            User.findById(receiverId),
            Veterinary.findById(receiverId)
        ]);

        // Vérification si le receiver existe dans User ou Veterinary
        if (!receiverUser && !receiverVeterinary) {
            return res.status(404).json({ message: 'Receiver not found' });
        }

        // Création du message
        const senderIdValue = senderUser ? senderUser._id : senderVeterinary._id;
        const receiverIdValue = receiverUser ? receiverUser._id : receiverVeterinary._id;
        const message = new Message({ sender: senderIdValue, receiver: receiverIdValue, content });
        await message.save();

        // Ajouter le message au sender
        if (senderUser) {
            senderUser.messages.push(message._id);
            await senderUser.save();
        } else {
            senderVeterinary.messages.push(message._id);
            await senderVeterinary.save();
        }

        // Ajouter le message au receiver
        if (receiverUser) {
            receiverUser.messages.push(message._id);
            await receiverUser.save();
        } else {
            receiverVeterinary.messages.push(message._id);
            await receiverVeterinary.save();
        }

        return res.status(201).json(message);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});



// Route pour obtenir tous les messages entre deux utilisateurs
router.get('/:user1Id/:user2Id', async (req, res) => {
    const { user1Id, user2Id } = req.params;

    try {
        const messages = await Message.find({
            $or: [
                { sender: user1Id, receiver: user2Id },
                { sender: user2Id, receiver: user1Id },
            ],
        }).sort('createdAt');

        return res.status(200).json(messages);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.get('/:userId', async (req, res) => {
    const userId = req.params.userId;

    try {
        // Rechercher l'utilisateur par son ID
        const user = await User.findById(userId);

        // Rechercher le vétérinaire par son ID
        const veterinaire = await Veterinary.findById(userId);

        if (!user && !veterinaire) {
            return res.status(404).json({ message: 'User or Veterinary not found' });
        }

        // Récupérer tous les messages associés à cet utilisateur ou vétérinaire
        const messages = await Message.find({ receiver: userId }).populate('user');

        return res.status(200).json(messages);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
module.exports = router;
