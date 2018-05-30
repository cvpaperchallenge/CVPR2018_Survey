;(function()
{


  function pugjsMixin (state)
  {
    var tokens = state.tokens;
    var m;

    tokens.forEach(function (token, i)
    {
      // "<!-- +something() -->"
      // ...sequence of [heading_open, inline, heading_close, html_block]
      if (token.type === 'html_block')
      {
        m = token.content.match(/^<!-- ?\+(.*) ?-->\n?$/)
        if (!m) return

        token.type = 'pugjs-mixin';
        token.content = m[1];
      }
    });
  }

  function attributes (md)
  {
    md.core.ruler.push('pugjs.mixins', pugjsMixin)
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
    this.MarkdownToPug.mixin = attributes;
  }
}).call(function()
{
  return this || (typeof window !== 'undefined' ? window : global);
}());
