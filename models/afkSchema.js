const mongoose = require('mongoose');

const AFKSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  afkMessage: { type: String, required: true },
  backTime: { type: Number, required: true },
  noBackTime: { type: Boolean, required: true, default: true },  
  afk: { type: Boolean, required: true, default: false },  
  notifyMessageId: { type: String },  
  notifyChannelId: { type: String },  
  oldDisplayName: { type: String },
});

module.exports = mongoose.model('AFK', AFKSchema);