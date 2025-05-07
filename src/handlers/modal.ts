import { Client, Interaction, MessageFlags } from 'discord.js';
import { readdirSync } from 'fs';
import { join } from 'path';

declare module 'discord.js' {
  interface Client {
    modals: Map<string, any>;
  }
}

const loadModals = (client: Client, directory: string) => {
  const files = readdirSync(directory, { withFileTypes: true });

  for (const file of files) {
    const path = join(directory, file.name);

    if (file.isDirectory()) {
      loadModals(client, path); 
    } else if (file.name.endsWith('.js') || file.name.endsWith('.ts')) {
      const modal = require(path).default;
      
      if (!modal.id || !modal.execute) {
        console.warn(`The file ${file.name} does not have an ID or an execute method.`);
        continue;
      }
      client.modals.set(modal.id, modal); 
    }
  }
};

module.exports = (client: Client) => {
  client.modals = new Map(); 
  const modalsDir = join(__dirname, '../interactions/modal');
  loadModals(client, modalsDir);

  client.on('interactionCreate', async (interaction: Interaction) => {
    if (!interaction.isModalSubmit()) return;

    const customId = interaction.customId;
    const [modalId, ...params] = customId.split(':'); 

    const modal = client.modals.get(modalId);
    if (!modal) {
      return interaction.reply({ content: 'Modal not found.', ephemeral: true });
    }

    try {
      await modal.execute(interaction, params);
    } catch (error) {
      console.error(`Error while executing the modal ${customId}:`, error);
      await interaction.reply({ content: 'An error occurred while executing this modal.', ephemeral: true });
    }
  });
};