import { Client, Interaction, MessageFlags } from 'discord.js';
import { readdirSync } from 'fs';
import { join } from 'path';

declare module 'discord.js' {
  interface Client {
    selectMenus: Map<string, any>;
  }
}

const loadSelectMenus = (client: Client, directory: string) => {
  const files = readdirSync(directory, { withFileTypes: true });

  for (const file of files) {
    const path = join(directory, file.name);

    if (file.isDirectory()) {
      loadSelectMenus(client, path); 
    } else if (file.name.endsWith('.js')) {
      const selectMenu = require(path).default;

      if (!selectMenu.id || !selectMenu.execute) {
        console.warn(`The file ${file.name} does not have an ID or an execute method.`);
        continue;
      }

      client.selectMenus.set(selectMenu.id, selectMenu); 
    }
  }
};

module.exports = (client: Client) => {
  client.selectMenus = new Map(); 
  const selectMenusDir = join(__dirname, '../interactions/selectmenu');
  loadSelectMenus(client, selectMenusDir);

  client.on('interactionCreate', async (interaction: Interaction) => {
    if (
      interaction.isStringSelectMenu() ||
      interaction.isUserSelectMenu() ||
      interaction.isChannelSelectMenu() ||
      interaction.isRoleSelectMenu() ||
      interaction.isMentionableSelectMenu()
    ) {
      
      const customId = interaction.customId;
      const [menuId, ...params] = customId.split(':'); 

      const selectMenu = client.selectMenus.get(menuId);
      if (!selectMenu) {
        return interaction.reply({ content: 'Select menu not found.', ephemeral: true });
      }

      try {
        await selectMenu.execute(interaction, params);
      } catch (error) {
        console.error(`Error while executing the select menu ${customId}:`, error);
        await interaction.reply({ content: 'An error occurred while executing this select menu.', ephemeral: true });
      }
    }
  });
};