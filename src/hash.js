import { createHash } from 'crypto';
import { createReadStream } from 'fs';
import { stat } from 'fs/promises';
import { join } from 'path';
import { printCurrentDirectory } from './config.js';

export const onHash = async (data) => {
  const pathFile = data.substring(4).trim();

  try {
    const targetPathFile = join(process.cwd(), pathFile);
    const targetFileInfo = await stat(targetPathFile);
    const isFile = targetFileInfo.isFile();
    if (isFile) {
      const hash = createHash('sha256');
      const stream = createReadStream(targetPathFile);
      stream.on('data', (chunk) => hash.update(chunk));
      stream.on('end', () => {
        const fileHash = hash.digest('hex');
        console.log(`\nHash: ${fileHash}`);
        printCurrentDirectory();
      });
      stream.on('error', (err) => console.error('Operation failed\n'));
    } else {
      console.error('Invalid input\n');
      return;
    }
  } catch (err) {
    console.error('Invalid input\n');
    return;
  }
};