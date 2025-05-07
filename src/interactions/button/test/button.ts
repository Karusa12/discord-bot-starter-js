import { ButtonInteraction, MessageFlags } from 'discord.js';

export default {
  id: 'example',

  execute: async (interaction: ButtonInteraction) => {
    const customId = interaction.customId;
    const parts = customId.split(':');
    if (parts.length < 2) {
      await interaction.reply({ content: 'Invalid customId format.', ephemeral: true });
      return;
    }
  
    const extraData = parts[1];
    await interaction.reply({ content: `You clicked the button with data: ${extraData}`, flags: MessageFlags.Ephemeral });
  },
};