const Message = require('../models/Message');

exports.sendMessage = async (req, res) => {
  try {
    const message = new Message({
      sender: req.user.id,
      receiver: req.body.receiver,
      content: req.body.content
    });
    await message.save();
    res.json(message);
  } catch (err) {
    res.status(400).json({ error: 'Failed to send message' });
  }
};

exports.getMessages = async (req, res) => {
  const messages = await Message.find({
    $or: [{ sender: req.user.id }, { receiver: req.user.id }]
  });
  res.json(messages);
};
