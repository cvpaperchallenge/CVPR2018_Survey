const assert = require('assert');
const md2pug = new (require('../../lib/markdown-to-pug'))();

describe('Code', function()
{
  it('Inline', function()
  {
    let src = 'Inline `code`';
    let result = 'p Inline \n\tcode code';

    assert.equal(md2pug.render(src), result);
  });

  it('Indented', function()
  {
    let src = 'Indented code\n\n    // Some comments\n    line 1 of code\n    line 2 of code\n    line 3 of code';
    let result = 'p Indented code\npre.hljs\n\tcode \n\t\t// Some comments\n\t\tline 1 of code\n\t\tline 2 of code\n\t\tline 3 of code';

    assert.equal(md2pug.render(src), result);
  });

  it('Fences', function()
  {
    let src = '```\nSample text here...\n```';
    let result = 'pre.hljs\n\tcode \n\t\tSample text here...';

    assert.equal(md2pug.render(src), result);
  });

  it('Highlighting', function()
  {
    let src = '```js\nvar foo = function (bar) {\n  return bar++;\n};\n\nconsole.log(foo(5));\n```';
    let result = 'pre.hljs.language-js\n\tcode \n\t\tvar foo = function (bar) {\n\t\t  return bar++;\n\t\t};\n\t\t\n\t\tconsole.log(foo(5));';

    assert.equal(md2pug.render(src), result);
  });
});
