// src/events/ready.ts
import { Client, Events, ActivityType } from 'discord.js';
import { Mongoose } from 'mongoose';
import websocketRouter, { websocketHandler } from '../../api/routes/websocket';
import app from '../../api';

const mongoose: Mongoose = require('mongoose');

export default {
  name: Events.ClientReady,
  once: true,

  execute: async (client: Client) => {

    const PORT = process.env.port || 3000;

    const guildCount = client.guilds.cache.size;
    const time = new Date().toLocaleString("fr-FR", {
      hour12: false,
      timeZone: "Europe/Paris"
    });

    const banner = [
      "╔══════════════════════════════════════════════════╗",
      "║              🤖 BOT CONNECTED – KARUSA 🤖       ║",
      "╚══════════════════════════════════════════════════╝"
    ].join("\n");

    console.clear();
    
    console.log(
      "%c" + banner,
      "background:#222; color:#61dafb; font-size:14px; padding:6px 12px; border-radius:6px;"
    );

    mongoose.set("strictQuery", true);
    mongoose.connect(process.env.mongo as string)
      .then(() => {
        console.log(
          "%c✔️  MongoDB connected",
          "color:#0a0; font-size:12px;"
        );
      })
      .catch((err: Error) => {
        console.error(
          "%c❌  MongoDB connection error: " + err,
          "color:#a00; font-size:12px;"
        );
      });

    const server = app.listen(PORT, () => {
      console.log(`%c🌐  Server started on port http://localhost:${PORT}`, "color:#888; font-size:12px;");
    });

    server.on('upgrade', (request, socket, head) => {
      websocketHandler.handleUpgrade(request, socket, head);
    });
    
    console.log(
      "%c🕒  Time :%c " + time,
      "color:#888; font-size:12px;",
      ""
    );
    
    console.log(
      "%c🤝  Servers :%c " + guildCount,
      "color:#888; font-size:12px;",
      ""
    );
    
    console.groupCollapsed(
      "%c🔍  Server details",
      "color:#555; font-size:12px;"
    );
    client.guilds.cache.forEach(guild => {
      console.log(`• ${guild.name} (${guild.id}) (shard: ${guild.shardId})`);
    });
    console.groupEnd();
    
    console.log(
      "%c✔️  Ready for action!",
      "color:#0a0; font-style:italic; font-size:13px;"
    );

    client.user?.setPresence({
      status: "dnd",
      activities: [
        {
          name: "Karusa BOT",
          type: ActivityType.Streaming,
          url: "https://www.twitch.tv/karusa_"
        }
      ]
    });
  },
};
