import { MessageFlags, StringSelectMenuInteraction } from 'discord.js';

export default {
  id: 'example', 

  execute: async (interaction: StringSelectMenuInteraction, params: string[]) => {
    const selectedValue = interaction.values[0]; 
    const extraParam = params[0] || 'none'; 
    const customId = interaction.customId; 
    const parts = customId.split(':');

    await interaction.reply({
      content: `You selected: ${selectedValue}. Additional parameter: ${extraParam}. CustomId: ${customId}`,
      flags: MessageFlags.Ephemeral,
    });
  },
};