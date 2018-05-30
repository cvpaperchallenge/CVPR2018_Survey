const assert = require('assert');
const md2pug = new (require('../../lib/markdown-to-pug'))();

describe('Tables', function()
{
  it('Left', function()
  {
    let src = '| Option | Description |\n| ------ | ----------- |\n| data   | path to data files to supply the data that will be passed into templates. |\n| engine | engine to be used for processing templates. Handlebars is the default. |\n| ext    | extension to be used for dest files. |\n';
    let result = 'table\n\tthead\n\t\ttr\n\t\t\tth Option\n\t\t\tth Description\n\ttbody\n\t\ttr\n\t\t\ttd data\n\t\t\ttd path to data files to supply the data that will be passed into templates.\n\t\ttr\n\t\t\ttd engine\n\t\t\ttd engine to be used for processing templates. Handlebars is the default.\n\t\ttr\n\t\t\ttd ext\n\t\t\ttd extension to be used for dest files.';

    assert.equal(md2pug.render(src), result);
  });

  it('Right', function()
  {
    let src = '| Option | Description |\n| -----: | ----------: |\n| data   | path to data files to supply the data that will be passed into templates. |\n| engine | engine to be used for processing templates. Handlebars is the default. |\n| ext    | extension to be used for dest files. |\n';
    let result = 'table\n\tthead\n\t\ttr\n\t\t\tth(style="text-align:right") Option\n\t\t\tth(style="text-align:right") Description\n\ttbody\n\t\ttr\n\t\t\ttd(style="text-align:right") data\n\t\t\ttd(style="text-align:right") path to data files to supply the data that will be passed into templates.\n\t\ttr\n\t\t\ttd(style="text-align:right") engine\n\t\t\ttd(style="text-align:right") engine to be used for processing templates. Handlebars is the default.\n\t\ttr\n\t\t\ttd(style="text-align:right") ext\n\t\t\ttd(style="text-align:right") extension to be used for dest files.';

    assert.equal(md2pug.render(src), result);
  });
});
