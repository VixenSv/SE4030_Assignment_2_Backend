const { randomBytes } = require('crypto');
const mongoose = require('mongoose');

const MessageEntity = new mongoose.Schema(
  {
    messageSubject: {
      type: String,
      required: [true, 'Missing title'],
      trim: true,
    },
    messageBody : {
      type: String,
      required: [true, 'Missing message text'],
      trim: true,
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'Missing sender id'],
      ref: 'staff',
    },
    messageDateTime: {
      type: Date,
      required: false,
      trim: true
    },
    messageSecurityKey : {
      type: String,
      required: true,
      trim: true,
    },
    messageInitVector : {
      type: String,
      required: true,
      trim: true,
    },
  }
);

const Message = mongoose.model("messages", MessageEntity);
module.exports = Message;