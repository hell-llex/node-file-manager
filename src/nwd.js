import { dirname, isAbsolute, resolve, join } from 'path';
import { stat, readdir } from 'fs/promises';
import { printCurrentDirectory, rootDirectory } from './config.js';

export const onUp = () => {
  if (process.cwd() !== rootDirectory) {
    process.chdir(dirname(process.cwd()));
  }
  printCurrentDirectory();
}

export const onCd = async (data) => {
  const dirPath = data.substring(2).trim();
  const targetPath = isAbsolute(dirPath)
    ? dirPath
    : resolve(process.cwd(), dirPath);

  try {
    const isStat = await stat(targetPath); // TODO: swat to lstat
    if (isStat.isDirectory()) {
      process.chdir(targetPath);
    } else {
      console.error('Operation failed\n');
      return;
    }
  } catch (err) {
    console.error('Operation failed\n');
    return;
  }
  printCurrentDirectory();
}

export const onLs = async () => {
  try {
    const fileArray = await readdir(process.cwd());
    const fileInfoArray = await Promise.all(
      fileArray.map(async (file) => {
        const stats = await stat(join(process.cwd(), file));
        return {
          name: file,
          type: stats.isDirectory() ? 'directory' : 'file'
        };
      })
    );
    fileInfoArray
      .sort((a, b) => {
        return a.type === b.type
          ? a.name.localeCompare(b.name)
          : a.type === 'directory' ? -1 : 1;
      });
    console.table(fileInfoArray);
  } catch (err) {
    console.error('Operation failed\n');
    return;
  }
  printCurrentDirectory();
}