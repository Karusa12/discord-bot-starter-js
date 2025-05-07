import { Interaction, Events, Client} from 'discord.js';

export default {
  name: Events.InteractionCreate,
  once: false,

  execute: async (interaction: Interaction, client: Client) => {

    if (interaction.isChatInputCommand()) {
      const command = interaction.client.commands.get(interaction.commandName);
      if (!command) return;
      await command.execute(interaction, client);
    } else if (interaction.isContextMenuCommand()) {
      const command = interaction.client.commands.get(interaction.commandName);
      if (!command) return;
      await command.execute(interaction, client);
    }
  },
};