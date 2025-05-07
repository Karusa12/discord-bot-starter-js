import {
  SlashCommandBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
} from 'discord.js';

export const command = {
  data: new SlashCommandBuilder()
    .setName('sendmodal')
    .setDescription('Sends an interactive modal'),

  execute: async (interaction: any) => {
    const modal = new ModalBuilder()
      .setCustomId('example:param1') 
      .setTitle('Example Modal');

    const input1 = new TextInputBuilder()
      .setCustomId('input1') 
      .setLabel('Enter a value')
      .setStyle(TextInputStyle.Short);

    const row = new ActionRowBuilder<TextInputBuilder>().addComponents(input1);

    modal.addComponents(row);

    await interaction.showModal(modal);
  },
};