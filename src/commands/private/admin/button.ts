import { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';

export const command = {
  data: new SlashCommandBuilder()
    .setName('sendbutton')
    .setDescription('Sends a message with an interactive button'),

  execute: async (interaction: any) => {
    const button = new ButtonBuilder()
      .setCustomId('example:12345')
      .setLabel('Click here')
      .setStyle(ButtonStyle.Primary);

    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(button);

    await interaction.reply({
      content: 'Here is an interactive button:',
      components: [row],
    });
  },
};