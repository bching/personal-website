const {promisify} = require('util');
const ejsRenderfile = promisify(require('ejs').renderFile);
const fs = require('fs-extra');

const publicPath = './public';

fs.copy('./assets', `${publicPath}/assets`, {overwrite: true})
  .catch(err => console.log(err));

fs.copyFileSync('./index.js', `${publicPath}/index.js`, {overwrite: true});

ejsRenderfile('./index.ejs', {})
  .then(index => {
    fs.writeFileSync(`${publicPath}/index.html`, index);
  });
ejsRenderfile('./posts.ejs', {})
  .then(result => {
    fs.writeFileSync(`${publicPath}/posts.html`, result);
  });
