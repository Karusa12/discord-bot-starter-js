import client from './bot';
import cron from 'node-cron';

import { getRecurringMessages } from './function/bot/RecurringMessages';

cron.schedule('0 0 * * *', async () => { // Schedule to run every day at midnight

  getRecurringMessages();

})