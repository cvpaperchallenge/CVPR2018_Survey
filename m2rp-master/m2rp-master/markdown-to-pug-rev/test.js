var fs = require('fs');
var url = 'test.md';

md2pug = new (require('./lib/markdown-to-pug'))();
fs.readFile(url, 'utf8', function(err, md) {
  let ret = md2pug.render(md);
  console.log(md);
  console.log();
  console.log(ret);
});
