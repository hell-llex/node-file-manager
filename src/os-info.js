import os from 'os';
import { printCurrentDirectory } from './config.js';

export const onOsInfo = async (data) => {
  const command = data.substring(2).trim();

  if (command === '--EOL') {
    console.log(`\nEOL: ${JSON.stringify(os.EOL)}`);
  } else if (command === '--cpus') {
    const cpus = os.cpus();
    console.log(`\nCPUs: ${cpus.length}\n`);
    const result = {};
    cpus.forEach((cpu, index) => {
      result[`CPU ${index + 1}`] = {
        Model: `${cpu.model}`, Speed: `${cpu.speed} MHz`,
      }
    });
    console.table(result);
  } else if (command === '--homedir') {
    console.log(`\nHome Directory: ${os.homedir()}`);
  } else if (command === '--username') {
    console.log(`\nUsername: ${os.userInfo().username}`);
  } else if (command === '--architecture') {
    console.log(`\nArchitecture: ${os.arch()}`);
  } else {
    console.error('Invalid input\n');
    return;
  }
  printCurrentDirectory();
}