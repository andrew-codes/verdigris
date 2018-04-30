const path = require('path');
const spawn = require('projector-spawn');

module.exports = {
  getChangedFilesSince,
  getMasterRef,
};

async function getMasterRef() {
  const cmd = await spawn('git', ['rev-parse', 'master']);
  return cmd.stdout.trim().split('\n')[0];
}

async function getChangedFilesSince(ref) {
  let cmd = await spawn('git', ['merge-base', ref, 'HEAD']);
  const divergedAt = cmd.stdout.trim();
  cmd = await spawn('git', ['diff', '--name-only', divergedAt]);
  const files = cmd.stdout.trim().split('\n');
  return files.map(file => path.resolve(file));
}
