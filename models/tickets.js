const mongoose = require('mongoose');

const attachmentSchema = new mongoose.Schema({
    url: String,
    proxyURL: String,
    contentType: String,
    name: String,
    id: String,
    timestamp: Date
});

const messageSchema = new mongoose.Schema({
    author: String,
    authorId: String,
    content: String,
    timestamp: Date,
    attachments: [attachmentSchema]
});

const questionSchema = new mongoose.Schema({
    question: { type: String, required: true },
    answer: { type: String, required: true }
});

const ticketSchema = new mongoose.Schema({
    ticketId: {
        type: Number,
        required: true,
        unique: true
    },
    userId: {
        type: String,
        required: true
    },
    channelId: {
        type: String,
        required: true
    },
    channelName: String,
    guildId: {
        type: String,
        required: true
    },
    ticketType: {
        type: String,
        required: true
    },
    status: { type: String, default: 'open' },
    priority: String,
    rating: {
        type: String,
        default: 'No Rating Yet'
    },
    reviewFeedback: {
        type: String,
        default: ''
    },
    messageCount: Number,
    messages: {
        type: [messageSchema],
        default: []
    },
    attachments: {
        type: [attachmentSchema],
        default: []
    },
    logMessageId: String,
    alertMessageId: String,
    questions: {
        type: [questionSchema],
        default: []
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    closedAt: Date,
    alertTime: Date,
});

const Ticket = mongoose.model('Ticket', ticketSchema);
module.exports = Ticket;