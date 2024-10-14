import readline from 'readline';
import { parse } from 'path';

export const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const getUserName = () => {
  const args = process.argv.slice(2);
  const usernameArg = args.find((arg) => arg.startsWith('--username='));
  return usernameArg ? usernameArg.split('=')[1] : 'User';
}

export const username = getUserName();

export const rootDirectory = parse(process.cwd()).root;

export const printCurrentDirectory = () => {
  console.log(`\nYou are currently in ${process.cwd()}\n`);
}