import client from '../../bot';
import { 
  ContainerBuilder, 
  ChannelType, 
  TextDisplayBuilder, 
  SeparatorBuilder, 
  SeparatorSpacingSize, 
  MessageFlags 
} from 'discord.js';

export function getRecurringMessages() {

  const channel = client.channels.cache.get('1221886677665189939');
  if (channel && (channel.type === ChannelType.GuildText)) {

    const container = new ContainerBuilder()
      .setAccentColor(11903991)
      .addTextDisplayComponents(
        new TextDisplayBuilder().setContent('Hello!')
      )
      .addSeparatorComponents(
        new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Large)
      )
      .addTextDisplayComponents(
        new TextDisplayBuilder().setContent('This is a recurring message!')
      )

    channel.send({
      components: [container],
      flags: MessageFlags.IsComponentsV2
    })
  }
}