module.exports = {
  
  name: 'ping',
  description: 'Replies with Pong!',
  async execute(message: any, args: any) {

    await message.reply('Pong!');

  },
};