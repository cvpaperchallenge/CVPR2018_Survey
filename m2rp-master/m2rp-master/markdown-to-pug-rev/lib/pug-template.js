;(function()
{


  function pugjsTemplate (state)
  {
    var tokens = state.tokens;
    var m;

    var level = 0;


    tokens.forEach(function (token, i)
    {
      if (token.type === 'html_block')
      {
        // "<!-- extend xyz -->"
        // ...sequence of [heading_open, inline, heading_close, html_block]
        m = token.content.match(/^<!--\s?extends\s?(.*)\s?-->\n?$/)
        if (m)
        {
          token.type = 'pugjs-extends';
          token.content = 'extends ' + m[1];
        }

        // "<!-- block xyz -->"
        if (!m)
        {
          m = token.content.match(/^<!--\s?block\s?(.*)\s?-->\n?$/)

          if (!m) return

          token.type = 'pugjs-block';
          token.content = 'block ' + m[1];
          level = 1;
          return;
        }
      }
      token.level = token.level + level;
    });

    // console.log(tokens);

  }

  function attributes (md)
  {
    md.core.ruler.push('pugjs.template', pugjsTemplate)
  }

  if (typeof module !== 'undefined' && typeof exports === 'object')
  {
    module.exports = attributes;
  }
  else if (typeof define === 'function' && define.amd)
  {
    define(function() { return attributes; });
  }
  else
  {
    this.MarkdownToPug.template = attributes;
  }
}).call(function()
{
  return this || (typeof window !== 'undefined' ? window : global);
}());
