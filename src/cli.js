import { onUp, onCd, onLs } from './nwd.js';
import { rl, printCurrentDirectory } from './config.js';
import { onCat, onAdd, onRn, onCp, onMv, onRm } from './operations.js';

// export const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// export const rootDirectory = parse(process.cwd()).root;

// export const printCurrentDirectory = () => {
//   console.log(`\nYou are currently in ${process.cwd()}\n`);
// }

// export const onUp = () => {
//   if (process.cwd() !== rootDirectory) {
//     process.chdir(dirname(process.cwd()));
//     printCurrentDirectory();
//   }
// }

// export const onCd = async (data) => {
//   const dirPath = data.substring(2).trim();
//   const targetPath = isAbsolute(dirPath)
//     ? dirPath
//     : resolve(process.cwd(), dirPath);

//   try {
//     const isStat = await stat(targetPath); // TODO: swat to lstat
//     if (isStat.isDirectory()) {
//       process.chdir(targetPath);
//     } else {
//       console.error('Operation failed\n');
//       return;
//     }
//   } catch (err) {
//     console.error('Operation failed\n');
//     return;
//   }
//   printCurrentDirectory();
// }

// export const onLs = async () => {
//   try {
//     const fileArray = await readdir(process.cwd());
//     const fileInfoArray = await Promise.all(
//       fileArray.map(async (file) => {
//         const stats = await stat(join(process.cwd(), file));
//         return {
//           name: file,
//           type: stats.isDirectory() ? 'directory' : 'file'
//         };
//       })
//     );
//     fileInfoArray
//       .sort((a, b) => {
//         return a.type === b.type
//           ? a.name.localeCompare(b.name)
//           : a.type === 'directory' ? -1 : 1;
//       });
//     console.table(fileInfoArray);
//   } catch (err) {
//     console.error('Operation failed\n');
//     return;
//   }
//   printCurrentDirectory();
// }

// export const onCat = async (data) => {
//   const pathFile = data.substring(3).trim();

//   try {
//     const targetPathFile = join(process.cwd(), pathFile);
//     const targetFileInfo = await stat(targetPathFile);
//     const isFile = targetFileInfo.isFile();
//     if (isFile) {
//       const stream = createReadStream(targetPathFile);
//       stream.pipe(process.stdout);
//       stream.on('end', () => {
//         console.log('');
//         printCurrentDirectory();
//       });
//       stream.on('error', () => {
//         console.error('Operation failed\n');
//         return;
//       });
//     } else {
//       console.error('Invalid input\n');
//       return;
//     }
//   } catch (err) {
//     console.error('Operation failed\n');
//     return;
//   }
// }

// export const onAdd = async (data) => {
//   const pathName = data.substring(3).trim();
//   try {
//     const createFile = await open(pathName, 'wx');
//     await createFile.close();
//   } catch (err) {
//     console.error('Operation failed\n');
//     return;
//   }
//   printCurrentDirectory();
// }

// export const onRn = async (data) => {
//   const nameArray = data.substring(2).trim().split(' ');

//   try {
//     if (nameArray.length === 2) {
//       const [oldName, newName] = nameArray.map(elem => join(process.cwd(), elem));
//       const isOldName = await stat(oldName);
//       if (isOldName.isDirectory()) {
//         console.error('Operation failed\n');
//         return;
//       }
//       try {
//         await stat(newName);
//         console.error('Operation failed\n');
//         return;
//       } catch {
//         await rename(oldName, newName);
//       }
//     } else {
//       console.error('Invalid input\n');
//       return
//     }
//   } catch (err) {
//     console.error('Operation failed\n');
//     return;
//   }
//   printCurrentDirectory();
// }

// export const onCp = async (data) => {
//   const pathArray = data.substring(2).trim().split(' ');

//   try {
//     if (pathArray.length === 2) {
//       const [oldFile, newFolder] = pathArray;
//       const oldPath = join(process.cwd(), oldFile);
//       const newPath = join(process.cwd(), newFolder);
//       const newPathAbsolute = isAbsolute(newPath)
//         ? newPath
//         : resolve(process.cwd(), newPath);

//       const isOldPath = await stat(oldPath);
//       const isNewPath = await stat(newPathAbsolute);

//       try {
//         await stat(join(newPathAbsolute, oldFile));
//         console.error('Operation failed\n');
//         return;
//       } catch { }

//       if (isOldPath.isDirectory() || isNewPath.isFile()) {
//         console.error('Operation failed\n');
//         return;
//       }

//       const readStream = createReadStream(oldPath);
//       const writeStream = createWriteStream(join(newPathAbsolute, oldFile));

//       readStream
//         .pipe(writeStream)
//         .on('finish', () => {
//           printCurrentDirectory();
//         })
//         .on('error', (err) => {
//           console.error('Operation failed\n');
//           return;
//         });

//     } else {
//       console.error('Invalid input\n');
//       return;
//     }
//   } catch (err) {
//     console.error('Operation failed\n');
//     return;
//   }
// }

// export const onMv = async (data) => {
//   const pathArray = data.substring(2).trim().split(' ');

//   try {
//     if (pathArray.length === 2) {
//       const [oldFile, newFolder] = pathArray;
//       const oldPath = join(process.cwd(), oldFile);
//       const newPath = join(process.cwd(), newFolder);
//       const newPathAbsolute = isAbsolute(newPath)
//         ? newPath
//         : resolve(process.cwd(), newPath);

//       const isOldPath = await stat(oldPath);
//       const isNewPath = await stat(newPathAbsolute);

//       try {
//         await stat(join(newPathAbsolute, oldFile));
//         console.error('Operation failed\n');
//         return;
//       } catch { }

//       if (isOldPath.isDirectory() || isNewPath.isFile()) {
//         console.error('Operation failed\n');
//         return;
//       }

//       const readStream = createReadStream(oldPath);
//       const writeStream = createWriteStream(join(newPathAbsolute, oldFile));

//       readStream
//         .pipe(writeStream)
//         .on('finish', async () => {
//           try {
//             await unlink(oldPath);
//             printCurrentDirectory();
//           } catch (err) {
//             console.error('Operation failed\n');
//           }
//         })
//         .on('error', (err) => {
//           console.error('Operation failed\n');
//           return;
//         });

//     } else {
//       console.error('Invalid input\n');
//       return;
//     }
//   } catch (err) {
//     console.error('Operation failed\n');
//     return;
//   }
// }

// export const onRm = async (data) => {
//   const pathFile = data.substring(2).trim();

//   try {
//     const targetPathFile = join(process.cwd(), pathFile);
//     const targetFileInfo = await stat(targetPathFile);
//     const isFile = targetFileInfo.isFile();
//     if (isFile) {
//       await unlink(targetPathFile);
//     } else {
//       console.error('Invalid input\n');
//       return;
//     }
//   } catch (err) {
//     console.error('Operation failed\n');
//     return;
//   }
//   printCurrentDirectory();
// }

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