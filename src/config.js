import readline from 'readline';
import { parse } from 'path';

export const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export const rootDirectory = parse(process.cwd()).root;

export const printCurrentDirectory = () => {
  console.log(`\nYou are currently in ${process.cwd()}\n`);
}