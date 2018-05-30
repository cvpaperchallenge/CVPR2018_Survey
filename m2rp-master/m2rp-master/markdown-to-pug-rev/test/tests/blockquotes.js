const assert = require('assert');
const md2pug = new (require('../../lib/markdown-to-pug'))();

describe('Blockquotes', function()
{
  it('Simple', function()
  {
    let src = '> one level';
    let result = 'blockquote\n\tp one level';

    assert.equal(md2pug.render(src), result);
  });

  it('NestedCompact', function()
  {
    let src = '>> two level';
    let result = 'blockquote\n\tblockquote\n\t\tp two level';

    assert.equal(md2pug.render(src), result);
  });

  it('NestedSpaced', function()
  {
    let src = '> > > spaced';
    let result = 'blockquote\n\tblockquote\n\t\tblockquote\n\t\t\tp spaced';

    assert.equal(md2pug.render(src), result);
  });
});
