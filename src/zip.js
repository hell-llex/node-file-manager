import { createBrotliCompress, createBrotliDecompress } from 'zlib';
import { createReadStream, createWriteStream } from 'fs';
import { join, resolve, isAbsolute } from 'path';
import { stat } from 'fs/promises';
import { printCurrentDirectory } from './config.js';

export const onCompress = async (data) => {
  const [pathFile, pathDestination] = data.substring(8).trim().split(' ');

  try {
    const sourcePath = join(process.cwd(), pathFile);
    const newPathAbsolute = isAbsolute(pathDestination)
      ? pathDestination
      : resolve(process.cwd(), pathDestination);

    const isSourcePath = await stat(sourcePath);
    try {
      await stat(newPathAbsolute);
      console.error('Operation failed\n');
      return;
    } catch { }

    if (isSourcePath.isFile() && newPathAbsolute.endsWith('.br')) {
      const source = createReadStream(sourcePath);
      const destination = createWriteStream(newPathAbsolute);
      const brotli = createBrotliCompress();

      source.pipe(brotli).pipe(destination);

      destination.on('finish', () => {
        console.log(`\nArchive created \n\u2193\u2193\u2193 \n${sourcePath} \n\u2193\u2193\u2193 \n${newPathAbsolute}`);
        printCurrentDirectory();
      });

      destination.on('error', (err) => {
        console.error('Operation failed\n');
      });
    } else {
      console.error('Invalid input\n');
    }
  } catch (err) {
    console.error('Operation failed\n');
  }
};

export const onDecompress = async (data) => {
  const [pathFile, pathDestination] = data.substring(10).trim().split(' ');

  try {
    const sourcePath = join(process.cwd(), pathFile);
    const newPathAbsolute = isAbsolute(pathDestination)
      ? pathDestination
      : resolve(process.cwd(), pathDestination);

    const isSourcePath = await stat(sourcePath);
    try {
      await stat(newPathAbsolute);
      console.error('Operation failed\n');
      return;
    } catch { }

    if (isSourcePath.isFile() && sourcePath.endsWith('.br')) {
      const destination = createWriteStream(newPathAbsolute);
      const source = createReadStream(sourcePath);
      const brotli = createBrotliDecompress();

      source.pipe(brotli).pipe(destination);

      destination.on('finish', () => {
        console.log(`\nArchive extracted \n\u2193\u2193\u2193 \n${sourcePath} \n\u2193\u2193\u2193 \n${newPathAbsolute}`);
        printCurrentDirectory();
      });

      destination.on('error', (err) => {
        console.error('Operation failed\n');
      });
    } else {
      console.error('Invalid input\n');
      return;
    }
  } catch (err) {
    console.error('Operation failed\n');
  }
};