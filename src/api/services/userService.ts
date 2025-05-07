import client from '../../bot'; 

export const findAll = async ()  => {
  
  const guilds = await client.guilds.fetch();
  const guildsId = guilds.map(guild => guild.id);
  const users: { id: string; name: string }[] = [];

  for (const guildId of guildsId) {
    const guild = await client.guilds.fetch(guildId);
    try {
      const members = await guild.members.fetch(); 
      members.forEach(member => {
        users.push({ id: member.id, name: member.user.username });
      });
    } catch (error) {
      continue;
    }
  }

  return users;
};

export const findById = async (id: string) => {
  const guilds = await client.guilds.fetch();
  const guildsId = guilds.map(guild => guild.id);

  for (const guildId of guildsId) {
    const guild = await client.guilds.fetch(guildId);
    try {
      const member = await guild.members.fetch(id); 
      if (member) {
        return { id: member.id, name: member.user.username }; 
      }
    } catch (error) {
      
      continue;
    }
  }

  return null;
};
