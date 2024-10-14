import { isAbsolute, resolve, join } from 'path';
import { stat, open, rename, unlink } from 'fs/promises';
import { createReadStream, createWriteStream } from 'fs';
import { printCurrentDirectory } from './config.js';

export const onCat = async (data) => {
  const pathFile = data.substring(3).trim();

  try {
    const targetPathFile = join(process.cwd(), pathFile);
    const targetFileInfo = await stat(targetPathFile);
    const isFile = targetFileInfo.isFile();
    if (isFile) {
      const stream = createReadStream(targetPathFile);
      stream.pipe(process.stdout);
      stream.on('end', () => {
        console.log('');
        printCurrentDirectory();
      });
      stream.on('error', () => {
        console.error('Operation failed\n');
        return;
      });
    } else {
      console.error('Invalid input\n');
      return;
    }
  } catch (err) {
    console.error('Operation failed\n');
    return;
  }
}

export const onAdd = async (data) => {
  const pathName = data.substring(3).trim();
  try {
    const createFile = await open(pathName, 'wx');
    await createFile.close();
  } catch (err) {
    console.error('Operation failed\n');
    return;
  }
  printCurrentDirectory();
}

export const onRn = async (data) => {
  const nameArray = data.substring(2).trim().split(' ');

  try {
    if (nameArray.length === 2) {
      const [oldName, newName] = nameArray.map(elem => join(process.cwd(), elem));
      const isOldName = await stat(oldName);
      if (isOldName.isDirectory()) {
        console.error('Operation failed\n');
        return;
      }
      try {
        await stat(newName);
        console.error('Operation failed\n');
        return;
      } catch {
        await rename(oldName, newName);
      }
    } else {
      console.error('Invalid input\n');
      return
    }
  } catch (err) {
    console.error('Operation failed\n');
    return;
  }
  printCurrentDirectory();
}

export const onCp = async (data) => {
  const pathArray = data.substring(2).trim().split(' ');

  try {
    if (pathArray.length === 2) {
      const [oldFile, newFolder] = pathArray;
      const oldPath = join(process.cwd(), oldFile);
      const newPath = join(process.cwd(), newFolder);
      const newPathAbsolute = isAbsolute(newPath)
        ? newPath
        : resolve(process.cwd(), newPath);

      const isOldPath = await stat(oldPath);
      const isNewPath = await stat(newPathAbsolute);

      try {
        await stat(join(newPathAbsolute, oldFile));
        console.error('Operation failed\n');
        return;
      } catch { }

      if (isOldPath.isDirectory() || isNewPath.isFile()) {
        console.error('Operation failed\n');
        return;
      }

      const readStream = createReadStream(oldPath);
      const writeStream = createWriteStream(join(newPathAbsolute, oldFile));

      readStream
        .pipe(writeStream)
        .on('finish', () => {
          printCurrentDirectory();
        })
        .on('error', (err) => {
          console.error('Operation failed\n');
          return;
        });

    } else {
      console.error('Invalid input\n');
      return;
    }
  } catch (err) {
    console.error('Operation failed\n');
    return;
  }
}

export const onMv = async (data) => {
  const pathArray = data.substring(2).trim().split(' ');

  try {
    if (pathArray.length === 2) {
      const [oldFile, newFolder] = pathArray;
      const oldPath = join(process.cwd(), oldFile);
      const newPath = join(process.cwd(), newFolder);
      const newPathAbsolute = isAbsolute(newPath)
        ? newPath
        : resolve(process.cwd(), newPath);

      const isOldPath = await stat(oldPath);
      const isNewPath = await stat(newPathAbsolute);

      try {
        await stat(join(newPathAbsolute, oldFile));
        console.error('Operation failed\n');
        return;
      } catch { }

      if (isOldPath.isDirectory() || isNewPath.isFile()) {
        console.error('Operation failed\n');
        return;
      }

      const readStream = createReadStream(oldPath);
      const writeStream = createWriteStream(join(newPathAbsolute, oldFile));

      readStream
        .pipe(writeStream)
        .on('finish', async () => {
          try {
            await unlink(oldPath);
            printCurrentDirectory();
          } catch (err) {
            console.error('Operation failed\n');
          }
        })
        .on('error', (err) => {
          console.error('Operation failed\n');
          return;
        });

    } else {
      console.error('Invalid input\n');
      return;
    }
  } catch (err) {
    console.error('Operation failed\n');
    return;
  }
}

export const onRm = async (data) => {
  const pathFile = data.substring(2).trim();

  try {
    const targetPathFile = join(process.cwd(), pathFile);
    const targetFileInfo = await stat(targetPathFile);
    const isFile = targetFileInfo.isFile();
    if (isFile) {
      await unlink(targetPathFile);
    } else {
      console.error('Invalid input\n');
      return;
    }
  } catch (err) {
    console.error('Operation failed\n');
    return;
  }
  printCurrentDirectory();
}