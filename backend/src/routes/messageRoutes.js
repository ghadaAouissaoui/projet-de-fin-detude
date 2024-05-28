const express = require('express');
const router = express.Router();
const Message = require('../models/messageModel');
const User = require('../models/userModel');
const Veterinary=require('../models/veterinaryModel');


// Route pour envoyer un message
router.post('/', async (req, res) => {
    const { senderId, receiverId, content } = req.body;
  
    try {
      const [senderUser, senderVeterinary] = await Promise.all([
        User.findById(senderId),
        Veterinary.findById(senderId)
      ]);
  
      if (!senderUser && !senderVeterinary) {
        return res.status(404).json({ message: 'Sender not found' });
      }
  
      const [receiverUser, receiverVeterinary] = await Promise.all([
        User.findById(receiverId),
        Veterinary.findById(receiverId)
      ]);
  
      if (!receiverUser && !receiverVeterinary) {
        return res.status(404).json({ message: 'Receiver not found' });
      }
  
      const senderIdValue = senderUser ? senderUser._id : senderVeterinary._id;
      const receiverIdValue = receiverUser ? receiverUser._id : receiverVeterinary._id;
      const senderModel = senderUser ? 'User' : 'Veterinary';
      const receiverModel = receiverUser ? 'User' : 'Veterinary';
  
      const message = new Message({
        sender: senderIdValue,
        receiver: receiverIdValue,
        senderModel: senderModel,
        receiverModel: receiverModel,
        content
      });
  
      await message.save();
  
      if (senderUser) {
        senderUser.messages.push(message._id);
        await senderUser.save();
      } else {
        senderVeterinary.messages.push(message._id);
        await senderVeterinary.save();
      }
  
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



// Route pour récupérer les messages pour un utilisateur ou vétérinaire
router.get('/:userId', async (req, res) => {
    const userId = req.params.userId;

    try {
        // Rechercher les messages où l'utilisateur est le récepteur ou l'expéditeur
        const messages = await Message.find({ $or: [{ receiver: userId }, { sender: userId }] }).populate('sender receiver');

        return res.status(200).json(messages);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

module.exports = router;
