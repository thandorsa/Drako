const mongoose = require('mongoose');
const WORD_SNAKE_CHANNEL_ID = '1333813227267686470';

const wordSnakeSchema = new mongoose.Schema({
  lastWord: { type: String, default: '' },
  lastUserId: { type: String, default: null },
});

const WordSnake = mongoose.model('WordSnake', wordSnakeSchema);

// Set to keep track of recent words/messages
const recentMessages = new Set();
const MAX_RECENT_MESSAGES = 10; // Adjust as needed
const WARNING_TIMEOUT = 2000; // Timeout duration for warnings in ms
const DISABLE_WARNING_TIMEOUT = true; // Set to true to disable warning timeouts

module.exports.run = async (client) => {
  let wordSnake = await WordSnake.findOne();
  if (!wordSnake) {
    wordSnake = new WordSnake();
    await wordSnake.save();
  }

  client.on('messageCreate', async (message) => {
    // Ensure this handler is only active for the designated channel
    if (message.author.bot || message.channel.id !== WORD_SNAKE_CHANNEL_ID) return;

    const word = (message.content || '').trim().toLowerCase();

    // Check for special characters, including spaces
    if (/[^a-z]/.test(word)) {
      await message.delete();
      const warningMessage = await message.channel.send(`The word cannot contain special characters or spaces. Please enter a valid word.`);
      if (!DISABLE_WARNING_TIMEOUT) {
        setTimeout(() => warningMessage.delete(), WARNING_TIMEOUT);
      }
      return;
    }

    // Check if the word has been used recently
    if (recentMessages.has(word)) {
      await message.delete();
      const warningMessage = await message.channel.send(`The word '${word}' has already been used recently. Please choose a different word.`);
      if (!DISABLE_WARNING_TIMEOUT) {
        setTimeout(() => warningMessage.delete(), WARNING_TIMEOUT);
      }
      return;
    }

    // Add the new word to the set of recent messages
    recentMessages.add(word);
    if (recentMessages.size > MAX_RECENT_MESSAGES) {
      // Remove the oldest message to maintain the size of the set
      recentMessages.delete([...recentMessages][0]);
    }

    // Check word matching logic with the last word in the game
    if (wordSnake.lastWord) {
      const lastLetter = wordSnake.lastWord.slice(-1);
      if (word[0] !== lastLetter) {
        await message.delete();
        const warningMessage = await message.channel.send(`The word must start with '${lastLetter.toUpperCase()}'.`);
        if (!DISABLE_WARNING_TIMEOUT) {
          setTimeout(() => warningMessage.delete(), WARNING_TIMEOUT);
        }
        return;
      }
    }

    // Prevent consecutive plays by the same user
    if (message.author.id === wordSnake.lastUserId) {
      await message.delete();
      const warningMessage = await message.channel.send(`You cannot play consecutively. Wait for someone else.`);
      if (!DISABLE_WARNING_TIMEOUT) {
        setTimeout(() => warningMessage.delete(), WARNING_TIMEOUT);
      }
      return;
    }

    try {
      // Check word validity using Datamuse API
      const response = await fetch(`https://api.datamuse.com/words?sp=${word}&max=1`);
      if (!response.ok) {
        throw new Error('Failed to fetch from Datamuse API');
      }
      const data = await response.json();

      if (data.length === 0 || data[0].word !== word) {
        // Word not found or does not match exactly, consider it invalid
        await message.delete();
        const warningMessage = await message.channel.send(`${word} is not a valid word. Starting over from the last valid word.`);
        if (!DISABLE_WARNING_TIMEOUT) {
          setTimeout(() => warningMessage.delete(), WARNING_TIMEOUT);
        }
        wordSnake.lastWord = ''; // Reset last word
        wordSnake.lastUserId = null; // Reset last user
      } else {
        // Word found and is valid, proceed with game logic
        wordSnake.lastWord = word;
        wordSnake.lastUserId = message.author.id;
        await message.react('✅');
      }

      await wordSnake.save();
    } catch (error) {
      console.error('Error handling message:', error.message);
    }
  });

  console.log("Word snake game addon is loaded and ready!");
};
