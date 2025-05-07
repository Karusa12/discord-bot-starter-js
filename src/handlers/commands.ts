import { Client, REST, Routes } from 'discord.js';
import { readdirSync } from 'fs';
import { join } from 'path';

declare module 'discord.js' {
  interface Client {
    commands: any; 
  }
}

const loadCommands = (client: Client, directory: string, body: object[]) => {
  const files = readdirSync(directory, { withFileTypes: true });

  for (const file of files) {
    const path = join(directory, file.name);

    if (file.isDirectory()) {
      loadCommands(client, path, body); 
    } else if (file.name.endsWith('.js')) {
      const command = require(path).command;
      body.push(command.data.toJSON());
      client.commands.set(command.data.name, command);
    }
  }
};

module.exports = async (client: Client) => {
  const body: object[] = [];
  const commandsDir = join(__dirname, '../commands/public');
  const token = process.env.token || ''; 
  const clientid = process.env.client || '';

  loadCommands(client, commandsDir, body);

  const rest = new REST({ version: '10' }).setToken(token);

  try {
    await rest.put(Routes.applicationCommands(clientid), { body: body });
  } catch (error) {
    console.error(error);
  }
};