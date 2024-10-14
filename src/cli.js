import { onUp, onCd, onLs } from './nwd.js';
import { greetings } from './greetings.js';
import { rl, username } from './config.js';
import { onCat, onAdd, onRn, onCp, onMv, onRm } from './operations.js';
import { onOsInfo } from './os-info.js';
import { onHash } from './hash.js';
import { onCompress, onDecompress } from './zip.js';

export const initCLI = async () => {

  await greetings();

  rl.on("line", async (input) => {
    const data = input.trim();
    if (data === '.exit') {
      rl.close();
    }

    if (data === 'up') {
      onUp();
    } else if (data.startsWith('cd ')) {
      await onCd(data);
    } else if (data === 'ls') {
      await onLs();
    } else if (data.startsWith('cat ')) {
      await onCat(data);
    } else if (data.startsWith('add ')) {
      await onAdd(data);
    } else if (data.startsWith('rn ')) {
      await onRn(data);
    } else if (data.startsWith('cp ')) {
      await onCp(data);
    } else if (data.startsWith('mv ')) {
      await onMv(data);
    } else if (data.startsWith('rm ')) {
      await onRm(data);
    } else if (data.startsWith('os ')) {
      await onOsInfo(data);
    } else if (data.startsWith('hash ')) {
      await onHash(data);
    } else if (data.startsWith('compress ')) {
      await onCompress(data);
    } else if (data.startsWith('decompress ')) {
      await onDecompress(data);
    }
    else {
      console.error('Invalid input\n');
    }
  })

  rl.on("close", () => {
    console.log(`\n\nThank you for using File Manager, ${username}, goodbye!\n`);
    process.exit(0);
  });
};