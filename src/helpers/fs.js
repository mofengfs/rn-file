const RNFS = require('react-native-fs');
const root = `${RNFS.DocumentDirectoryPath}/data`;
const externalRoot = `${RNFS.ExternalStorageDirectoryPath}/data`;
const init = async (external=false) => {
  const dir = external ? externalRoot : root;
  const exist = await RNFS.exists(dir);
  if (!exist) {
    await RNFS.mkdir(dir);
  }
};

const getPath = (name, external=false) => {
  const dir = external ? externalRoot : root;
  return `${dir}/${name}`;
};

const getFiles = async (external=false, length=40) => {
  try {
    const dir = external ? externalRoot : root;
    await init(external);
    const items = await RNFS.readDir(dir);
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

const readFile = async (name, external=false) => {
  try {
    await init(external);
    const path = getPath(name, external);
    const content = await RNFS.readFile(path);
    return content;
  } catch (e) {
    console.error(e);
  }
};

const createFile = async (name, content, external=false) => {
  try {
    await init(external);
    const path = getPath(name, external);
    await RNFS.writeFile(path, content);
  } catch (e) {
    console.error(e);
  }
};

const updateFile = async (oldName, newName, content, external=false) => {
  try {
    await init(external);
    const oldPath = getPath(oldName, external);
    const newPath = getPath(newName, external);
    await Promise.all([RNFS.unlink(oldPath), RNFS.writeFile(newPath, content)]);
  } catch (e) {
    console.error(e);
  }
};

const deleteFile = async (name, external=false) => {
  try {
    const path = getPath(name, external);
    await RNFS.unlink(path);
  } catch (e) {
    console.error(e);
  }
};

export { init, getFiles, readFile, createFile, updateFile, deleteFile };