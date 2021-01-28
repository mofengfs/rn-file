const RNFS = require('react-native-fs');
const root = `${RNFS.DocumentDirectoryPath}/data`;
const init = async () => {
  const exist = await RNFS.exists(root);
  if (!exist) {
    RNFS.mkdir(root);
  }
};

const getPath = (name) => `${root}/${name}`;

const getFiles = async (length = 40) => {
  try {
    await init();
    const items = await RNFS.readDir(root);
    const files = await Promise.all(
      items.filter(i => i.isFile())
        .map(async ({ name, path, size }) => {
          const head = await RNFS.read(path, length);
          return { name, size, head };
        }));
    return files;
  } catch (e) {
    console.error(e);
  }
};

const readFile = async (name) => {
  try {
    await init();
    const path = getPath(name);
    const content = await RNFS.readFile(path);
    return content;
  } catch (e) {
    console.error(e);
  }
};

const createFile = async (name, content) => {
  try {
    await init();
    const path = getPath(name);
    await RNFS.writeFile(path, content);
  } catch (e) {
    console.error(e);
  }
};

const updateFile = async (oldName, newName, content) => {
  try {
    await init();
    const oldPath = getPath(oldName);
    const newPath = getPath(newName);
    await Promise.all([RNFS.unlink(oldPath), RNFS.writeFile(newPath, content)]);
  } catch (e) {
    console.error(e);
  }
};

const deleteFile = async (name) => {
  try {
    const path = getPath(name);
    await RNFS.unlink(path);
  } catch (e) {
    console.error(e);
  }
};

export { init, getFiles, readFile, createFile, updateFile, deleteFile };