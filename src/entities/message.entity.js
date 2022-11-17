const mongoose = require('mongoose');

const MessageEntity = new mongoose.Schema(
  {

    messageBody : {
      type: String,
      required: [true, 'Missing message text'],
      trim: true,
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'Missing sender id'],
      ref: 'staff',
    }
  }
);

const Message = mongoose.model("messages", MessageEntity);
module.exports = Message;