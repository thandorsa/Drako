const mongoose = require('mongoose');

const botActivitySchema = new mongoose.Schema({
    guildId: { type: String, required: true, unique: true },
    activities: [
        {
            status: { type: String, required: true },
            activityType: { type: String, required: true },
            statusType: { type: String, required: true },
            streamingURL: { type: String, default: null }
        }
    ]
});

module.exports = mongoose.model('BotActivity', botActivitySchema);