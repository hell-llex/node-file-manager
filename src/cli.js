import { onUp, onCd, onLs } from './nwd.js';
import { rl, printCurrentDirectory } from './config.js';
import { onCat, onAdd, onRn, onCp, onMv, onRm } from './operations.js';

export const initCLI = () => {

  const args = process.argv.slice(2);
  const usernameArg = args.find((arg) => arg.startsWith('--username='));
  const username = usernameArg ? usernameArg.split('=')[1] : 'User';

  console.log(`Welcome to the File Manager, ${username}!\n`);
  printCurrentDirectory();

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
    }
    else {
      console.error('Invalid input\n');
    }
  })

  rl.on("close", () => {
    console.log(`\n\nThank you for using File Manager, ${username}, goodbye!\n`);
    process.exit();
  });
};