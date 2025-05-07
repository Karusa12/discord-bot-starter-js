import { SlashCommandBuilder, ActionRowBuilder, StringSelectMenuBuilder, RoleSelectMenuBuilder, ChannelSelectMenuBuilder, UserSelectMenuBuilder, MentionableSelectMenuBuilder } from 'discord.js';

export const command = {
  data: new SlashCommandBuilder()
    .setName('sendselectmenu')
    .setDescription('Sends a message with an interactive select menu'),

  execute: async (interaction: any) => {
    const selectMenu = new StringSelectMenuBuilder()
      .setCustomId('example:string') // Identifier for the string select menu
      .setPlaceholder('Choose an option')
      .addOptions([
        { label: 'Option 1', value: 'option1' },
        { label: 'Option 2', value: 'option2' },
        { label: 'Option 3', value: 'option3' },
      ]);

    const roleSelectMenu = new RoleSelectMenuBuilder()
      .setCustomId('example:role') // Identifier for the role select menu
      .setPlaceholder('Choose a role');

    const channelSelectMenu = new ChannelSelectMenuBuilder()
      .setCustomId('example:channel') // Identifier for the channel select menu
      .setPlaceholder('Choose a channel');

    const userSelectMenu = new UserSelectMenuBuilder()
      .setCustomId('example:user') // Identifier for the user select menu
      .setPlaceholder('Choose a user');

    const mentionableSelectMenu = new MentionableSelectMenuBuilder()
      .setCustomId('example:mentionable') // Identifier for the mentionable select menu
      .setPlaceholder('Choose something to mention');

    const row_string = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(selectMenu);
    const row_role = new ActionRowBuilder<RoleSelectMenuBuilder>().addComponents(roleSelectMenu);
    const row_channel = new ActionRowBuilder<ChannelSelectMenuBuilder>().addComponents(channelSelectMenu);
    const row_user = new ActionRowBuilder<UserSelectMenuBuilder>().addComponents(userSelectMenu);
    const row_mentionable = new ActionRowBuilder<MentionableSelectMenuBuilder>().addComponents(mentionableSelectMenu);

    await interaction.reply({
      content: 'Here is an interactive select menu:',
      components: [row_string, row_role, row_channel, row_user, row_mentionable],
    });
  },
};