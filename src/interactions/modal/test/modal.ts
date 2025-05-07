import { MessageFlags, ModalSubmitInteraction } from 'discord.js';

export default {
  id: 'example',

  execute: async (interaction: ModalSubmitInteraction, params: string[]) => {
    const input1 = interaction.fields.getTextInputValue('input1'); 
    const extraParam = params[0] || 'none'; 
    const customId = interaction.customId;
    const parts = customId.split(':');

    await interaction.reply({
      content: `You submitted: ${input1}. Additional parameter: ${extraParam}. Modal ID: ${parts[0]}`,
      flags: MessageFlags.Ephemeral,
    });
  },
};