const assert = require('assert');
const md2pug = new (require('../../lib/markdown-to-pug'))();

describe('Lists', function()
{
  it('Ordered', function()
  {
    let src = '1. item 1\n2. item 2\n3. item 3';
    let result = 'ol\n\tli\n\t\tp item 1\n\tli\n\t\tp item 2\n\tli\n\t\tp item 3';

    assert.equal(md2pug.render(src), result);
  });

  it('Ordered - Offset', function()
  {
    let src = '56. item 1\n2. item 2\n3. item 3';
    let result = 'ol(start="56")\n\tli\n\t\tp item 1\n\tli\n\t\tp item 2\n\tli\n\t\tp item 3';

    assert.equal(md2pug.render(src), result);
  });


  it('Unordered', function()
  {
    let src = '- item 1\n- item 2\n- item 3';
    let result = 'ul\n\tli\n\t\tp item 1\n\tli\n\t\tp item 2\n\tli\n\t\tp item 3';

    assert.equal(md2pug.render(src), result);
  });
});
