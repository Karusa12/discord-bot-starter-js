import { ShardingManager } from 'discord.js';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const token = process.env.token;

if (!token) {
    console.error('The Discord token is missing. Make sure the .env file contains DISCORD_TOKEN.');
    process.exit(1);
}

const manager = new ShardingManager(path.join(__dirname, 'bot.js'), {
    token: token,
    totalShards: 'auto', 
});

manager.on('shardCreate', (shard) => {
    console.log(`Shard ${shard.id} launched.`);
});

manager.spawn().catch((error) => {
    console.error('Error while launching shards:', error);
});