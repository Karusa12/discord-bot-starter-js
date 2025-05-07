import { Client, Message } from 'discord.js';
import { readdirSync } from 'fs';
import { join } from 'path';

declare module 'discord.js' {
  interface Client {
    textCommands: Map<string, any>;
  }
}

const loadTextCommands = (client: Client, directory: string) => {
  const files = readdirSync(directory, { withFileTypes: true });

  for (const file of files) {
    const path = join(directory, file.name);

    if (file.isDirectory()) {
      loadTextCommands(client, path); 
    } else if (file.name.endsWith('.js')) {
      const command = require(path);
      client.textCommands.set(command.name, command);
      console.log(`Text command ${command.name} loaded!`);
    }
  }
};

module.exports = (client: Client) => {
  client.textCommands = new Map();

  const commandsDir = join(__dirname, '../commands/message');
  loadTextCommands(client, commandsDir);

  client.on('messageCreate', async (message: Message) => {
    if (message.author.bot || !message.guild) return;

    const prefix = process.env.PREFIX || '+';
    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift()?.toLowerCase();

    if (!commandName) return;

    const command = client.textCommands.get(commandName);
    if (!command) return;

    try {
      await command.execute(message, args);
    } catch (error) {
      console.error(error);
      await message.reply('There was an error executing that command.');
    }
  });
};