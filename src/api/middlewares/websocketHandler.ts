import { WebSocket, WebSocketServer } from 'ws';
import client from '../../bot';

export class WebSocketHandler {
  private wss: WebSocketServer;

  constructor() {
    this.wss = new WebSocketServer({ noServer: true });
    this.setupConnection();
  }

  private setupConnection() {
    this.wss.on('connection', (ws: WebSocket) => {
      console.log('Client connected via WebSocket');

      ws.on('message', (message) => {
        try {
          const data = JSON.parse(message.toString());
          if (data.guild && data.channel && data.message) {
            
            const guild = client.guilds.cache.get(data.guild);
            const channel = guild?.channels.cache.get(data.channel);
            const messageContent = data.message;
            if (channel && channel.isTextBased()) {
              channel.send(messageContent)
                .then(() => {
                  ws.send('Message sent successfully!');
                })
                .catch((error) => {
                  console.error('Error while sending the message:', error);
                  ws.send('Error while sending the message!');
                });
            }
          } else {
            ws.send('This message is not valid!');
          }
        } catch (error) {
          console.error('Error while parsing the message:', error);
        }
      });

      ws.on('close', () => {
        console.log('Client disconnected');
      });
    });
  }

  public handleUpgrade(request: any, socket: any, head: any) {
    this.wss.handleUpgrade(request, socket, head, (ws) => {
      this.wss.emit('connection', ws, request);
    });
  }
}