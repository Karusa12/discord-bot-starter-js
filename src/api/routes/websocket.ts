import { Router } from 'express';
import { WebSocketHandler } from '../middlewares/websocketHandler';

const router = Router();
const wsHandler = new WebSocketHandler();

router.get('/', (_req, res) => {
  res.status(200).send('WebSocket server is running!');
});

// ws://localhost:3000/websocket
/* 
Use Postman or any other tool to send a message to the WebSocket server.
Example JSON message:
{
  "guild": "1234idguild",
  "channel": "1234idchannel in guild",
  "message": "Hello, world! (this is a test message)",
}
*/
export const websocketHandler = wsHandler;
export default router;