import fs from 'fs';
import path from 'path';

const logDir = path.join(__dirname, '../../logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const logFilePath = path.join(logDir, 'console.log');

if (!fs.existsSync(logFilePath)) {
  fs.writeFileSync(logFilePath, '', { flag: 'w' });
}

const logToFile = (message: string) => {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}\n`;
  fs.appendFile(logFilePath, logMessage, err => {
    if (err) {
      originalError('Error while writing to the log file:', err);
    }
  });
};

const originalLog = console.log;
const originalError = console.error;

console.log = (...args: any[]) => {
  const message = args.map(arg =>
    typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
  ).join(' ');
  logToFile(message);
  originalLog(...args);
};

console.error = (...args: any[]) => {
  const message = args.map(arg =>
    typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
  ).join(' ');
  logToFile(`ERROR: ${message}`);
  originalError(...args);
};