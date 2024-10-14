import { printCurrentDirectory, username } from './config.js';

export const greetings = async () => {

  console.log(`Welcome to the File Manager, ${username}!`);
  printCurrentDirectory();
}