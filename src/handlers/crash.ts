import fs from 'fs';
import path from 'path';
import util from 'util';

const logDir = path.join(__dirname, '../../logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const errorLogPath = path.join(logDir, 'errors.log');

if (!fs.existsSync(errorLogPath)) {
  fs.writeFileSync(errorLogPath, '', { flag: 'w' });
}

const logErrorToFile = (message: string) => {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}\n`;
  fs.appendFile(errorLogPath, logMessage, err => {
    if (err) {
      console.error('Error while writing to errors.log:', err);
    }
  });
};

export default () => {
  process.on('unhandledRejection', (reason, promise) => {
    const message = `🟥 Unhandled Rejection:\n${util.inspect(reason, { depth: null })}\nPromise: ${util.inspect(promise)}`;
    console.error(message);
    logErrorToFile(message);
  });

  process.on('uncaughtException', (err, origin) => {
    const message = `🟥 Uncaught Exception:\n${util.inspect(err, { depth: null })}\nOrigin: ${origin}`;
    console.error(message);
    logErrorToFile(message);
  });

  process.on('uncaughtExceptionMonitor', (err, origin) => {
    const message = `🟥 Uncaught Exception Monitor:\n${util.inspect(err, { depth: null })}\nOrigin: ${origin}`;
    console.error(message);
    logErrorToFile(message);
  });
};