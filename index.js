const {promisify} = require('util');
const ejsRenderfile = promisify(require('ejs').renderFile);
const fs = require('fs-extra');

const publicPath = './public';

fs.copy('./assets', `${publicPath}/assets`, {overwrite: true})
  .catch(err => console.log(err));

ejsRenderfile('./index.ejs', {})
  .then(index => {
    fs.writeFileSync(`${publicPath}/index.html`, index);
  })
