const assert = require('assert');
const md2pug = new (require('../../lib/markdown-to-pug'))();

describe('Inline', function()
{
  it('Bold', function()
  {
    let src = '**This is bold text**';
    let result = 'p\n\tstrong This is bold text';

    assert.equal(md2pug.render(src), result);
  });

  it('Italic', function()
  {
    let src = '*This is italic text*';
    let result = 'p\n\tem This is italic text';

    assert.equal(md2pug.render(src), result);
  });

  it('Strikethrough', function()
  {
    let src = '~~Strikethrough~~';
    let result = 'p\n\ts Strikethrough';

    assert.equal(md2pug.render(src), result);
  });

  it('Code', function()
  {
    let src = 'Inline `code`';
    let result = 'p Inline \n\tcode code';

    assert.equal(md2pug.render(src), result);
  });

  it('Link Text', function()
  {
    let src = '[link text](http://google.com)';
    let result = 'p\n\ta(href="http://google.com") link text';

    assert.equal(md2pug.render(src), result);
  });

  it('Link Title', function()
  {
    let src = '[link with title](http://google.com "Google!")';
    let result = 'p\n\ta(href="http://google.com",title="Google!") link with title';

    assert.equal(md2pug.render(src), result);
  });

  it('Images', function()
  {
    let src = '![Stormtroopocat](https://octodex.github.com/images/stormtroopocat.jpg "The Stormtroopocat")';
    let result = 'p\n\timg(src="https://octodex.github.com/images/stormtroopocat.jpg",alt="",title="The Stormtroopocat") Stormtroopocat';

    assert.equal(md2pug.render(src), result);
  });
});
