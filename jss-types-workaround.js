const fs = require('fs');
const path = require('path');

const copyFolderSync = (from, to) => {
  fs.mkdirSync(to, { recursive: true });
  fs.readdirSync(from).forEach(element => {
    if (fs.lstatSync(path.join(from, element)).isFile()) {
      fs.copyFileSync(path.join(from, element), path.join(to, element));
    } else {
      copyFolderSync(path.join(from, element), path.join(to, element));
    }
  });
};

copyFolderSync('node_modules/@types/jss', 'node_modules/@material-ui/core/node_modules/@types/jss');
