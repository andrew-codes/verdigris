const path = require('path');

function dir(id, dPath = '') {
  return { type: 'dir', id, path: dPath, children: [] };
}

function file(id, fPath) {
  return { type: 'file', id, path: fPath };
}

function findInDir(directory, id) {
  return directory.children.find(c => c.id === id);
}

function isDirHasFiles(directory) {
  return directory.children.some(child => child.type === 'file');
}

function appendToDir(directory, child) {
  if (findInDir(directory, child.id)) return directory;
  return Object.assign(directory, { children: [].concat(directory.children, child) });
}

function buildFs(curDir, [seg, ...restSegments]) {
  if (!seg) return curDir;

  let item = findInDir(curDir, seg);
  if (item && item.type === 'file') return curDir;
  if (!restSegments || !restSegments.length)
    return appendToDir(curDir, file(seg, path.join(curDir.path, seg)));

  item = buildFs(item || dir(seg, path.join(curDir.path, seg)), restSegments);
  return appendToDir(curDir, item);
}

module.exports = { dir, file, findInDir, isDirHasFiles, appendToDir, buildFs };
