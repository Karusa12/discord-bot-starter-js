import client from '../../bot';

export const findAll = async () => {
  
  const guilds = await client.guilds.fetch();

  const guilds_ : { id: string; name: string }[] = [];

  guilds.forEach(guild => {
    guilds_.push({ id: guild.id, name: guild.name });
  });

  return guilds_;
}

export const findById = async (id: string) => {
  const guilds = await client.guilds.fetch();
  const guildsId = guilds.map(guild => guild.id);

  for (const guildId of guildsId) {
    const guild = await client.guilds.fetch(guildId);
    try {
      if (guild.id === id) {
        return { id: guild.id, name: guild.name };
      }
    } catch (error) {
      continue;
    }
  }

  return null;
};