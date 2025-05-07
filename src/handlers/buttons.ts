import { Client, Interaction, MessageFlags } from 'discord.js';
import { readdirSync } from 'fs';
import { join } from 'path';

declare module 'discord.js' {
  interface Client {
    buttons: Map<string, any>;
  }
}

const loadButtons = (client: Client, directory: string) => {
  const files = readdirSync(directory, { withFileTypes: true });

  for (const file of files) {
    const path = join(directory, file.name);

    if (file.isDirectory()) {
      loadButtons(client, path); 
    } else if (file.name.endsWith('.js')) {
      const button = require(path).default;

      if (!button.id || !button.execute) {
        console.warn(`The file ${file.name} does not have an ID or an execute method.`);
        continue;
      }

      client.buttons.set(button.id, button);
    }
  }
};

module.exports = (client: Client) => {
  client.buttons = new Map();
  const buttonsDir = join(__dirname, '../interactions/button');
  loadButtons(client, buttonsDir);

  client.on('interactionCreate', async (interaction: Interaction) => {
    if (!interaction.isButton()) return;

    const customId = interaction.customId;
    const buttonId = customId.split(':')[0];

    const button = client.buttons.get(buttonId);
    if (!button) return interaction.reply({ content: 'Button not found.', flags: MessageFlags.Ephemeral });

    try {
      await button.execute(interaction);
    } catch (error) {
      console.error(`Error while executing the button ${customId}:`, error);
      await interaction.reply({ content: 'An error occurred while executing this button.', flags: MessageFlags.Ephemeral });
    }
  });
};