/**
 *  Markdown To PugJS
 *
 *  @author Alexandre Masy <hello@alexandremasy.com>
 **/
;(function()
{
	/**
	 *  @param {Object} options
	 **/
	function MarkdownToPug(options)
	{
		const defaults = {
			newline: '\n',
			space: '  ',

			linkify: true,
			typographer: true,
			langPrefix: 'language-'
		}

		this.options = Object.assign(defaults, options);

		var mdi;
		if (typeof module !== 'undefined' && typeof exports === 'object')
		{
			mdi = require('markdown-it');
		}
		else
		{
			mdi = window.markdownit;
		}

		this.md = mdi({
			html:         true,                     // Enable HTML tags in source
			xhtmlOut:     false,                    // Use '/' to close single tags (<br />).
													// This is only for full CommonMark compatibility.
			breaks:       false,                    // Convert '\n' in paragraphs into <br>
			langPrefix:   this.options.langPrefix,  // CSS language prefix for fenced blocks. Can be
													// useful for external highlighters.
			linkify:      this.options.linkify,     // Autoconvert URL-like text to links

			// Enable some language-neutral replacement + quotes beautification
			typographer:  this.options.typographer,

			// Double + single quotes replacement pairs, when typographer enabled,
			// and smartquotes on. Could be either a String or an Array.
			//
			// For example, you can use '«»„“' for Russian, '„“‚‘' for German,
			// and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
			quotes: '“”‘’',
		});
	}

	var p = MarkdownToPug.prototype;

	/**
	 *  Render the markdown to pugjs
	 *
	 *  @param {String} src
	 *  @return {String}
	 **/
	p.render = function(src)
	{

		this.md.use(typeof module !== 'undefined' && typeof exports === 'object' ? require('./pug-mixin') : window.MarkdownToPug.mixin);
		this.md.use(typeof module !== 'undefined' && typeof exports === 'object' ? require('./pug-template') : window.MarkdownToPug.template);
		let data = this.md.parse(src, {});
		let ret = '';
		let level = 0;

		data.forEach((e) =>
		{
			// console.log('e', e.type);
			switch (e.type)
			{
				case 'blockquote_open':
				case 'paragraph_open':
				case 'heading_open':
				case 'bullet_list_open':
				case 'ordered_list_open':
				case 'list_item_open':
				case 'hr':
				case 'table_open':
				case 'thead_open':
				case 'tr_open':
				case 'th_open':
				case 'tbody_open':
				case 'td_open':
					if (e.hidden)
					{
						level--;
					}
					else
					{
						ret += this.indent(this.tag(e.tag, e.content, e.attrs), (e.level+level));
					}
					break;
				case 'code_block':
				case 'fence':
					ret += this.indent(this.code(e.tag, e.content, e.attrs, e.info), (e.level+level));
					break;
				case 'pugjs-mixin':
				case 'pugjs-block':
				case 'pugjs-extends':
					ret += this.indent(e.content, (e.level+level));
					break;

				case 'inline':
					if (e.children)
					{
						// console.log('children: ');
						// console.log(e.children);
						e.children.forEach((c) =>
						{
							// console.log('c', c.type);
							switch (c.type)
							{
							  case 'text':
							  case 'html_inline':
							  case 'softbreak':
							    if (c.content.length > 0)
							    {
							      ret += ' ' + c.content;
							    }
							    break;
							case 'hardbreak':
								ret += this.indent(this.tag(c.tag, c.content, c.attrs), (e.level+level));
								break;

							  case 'code_inline':
							    ret += this.indent(this.htmlTag(c.tag, c.content, c.attrs), (e.level+level));
							    break;
							  case 'strong_open':
							  case 'em_open':
							  case 's_open':
							  case 'link_open':
							  case 'image':
							    ret += this.indent(this.tag(c.tag, c.content, c.attrs), (e.level+level));
							    break;

							  default:
							    break;
							}
						})
					}
					else
					{
						ret += this.indent(e.content, (e.level+level));
					}
					break;

				case 'html_block':
					ret += this.indent(e.content, (e.level+level));
					break;
				case 'paragraph_close':
				case 'heading_close':
				case 'th_close':
				case 'tr_close':
				case 'thead_close':
				case 'td_close':
				case 'tbody_close':
				case 'table_close':
				case 'blockquote_close':
				case 'list_item_close':
				case 'ordered_list_close':
				case 'bullet_list_close':
					if (e.hidden)
					{
						level++;
					}
					break;

				default:
					console.log('undefined type: ', e.type, `| Tag: ${e.tag}`);
					console.log(e);
					break;
			}
		})
		return ret.trim();
	}

	/**
	 *  Render the pursed markdown to pugjs (suzuryo hack)
	 *
	 *  @param {Array} src
	 *  @return {String}
	 **/
	p.renderRaw = function(src)
	{

		//this.md.use(typeof module !== 'undefined' && typeof exports === 'object' ? require('./pug-mixin') : window.MarkdownToPug.mixin);
		//this.md.use(typeof module !== 'undefined' && typeof exports === 'object' ? require('./pug-template') : window.MarkdownToPug.template);
		//let data = this.md.parse(src, {});
		let data = src;
		let ret = '';
		let level = 0;

		data.forEach((e) =>
		{
			// console.log('e', e.type);
			switch (e.type)
			{
				case 'blockquote_open':
				case 'paragraph_open':
				case 'heading_open':
				case 'bullet_list_open':
				case 'ordered_list_open':
				case 'list_item_open':
				case 'hr':
				case 'table_open':
				case 'thead_open':
				case 'tr_open':
				case 'th_open':
				case 'tbody_open':
				case 'td_open':
					if (e.hidden)
					{
						level--;
					}
					else
					{
						ret += this.indent(this.tag(e.tag, e.content, e.attrs), (e.level+level));
					}
					break;
				case 'code_block':
				case 'fence':
					ret += this.indent(this.code(e.tag, e.content, e.attrs, e.info), (e.level+level));
					break;
				case 'pugjs-mixin':
				case 'pugjs-block':
				case 'pugjs-extends':
					ret += this.indent(e.content, (e.level+level));
					break;

				case 'inline':
					if (e.children)
					{
						var fst=true;
						var p_after_tag=false;
						// console.log('children: ');
						// console.log(e.children);
						e.children.forEach((c) =>
						{
							// console.log('c', c.type);
							switch (c.type)
							{
							case 'text':
								if(fst || p_after_tag){
									if (c.content.length > 0)
									{
										ret += ' ' + c.content;
									}
									p_after_tag=false;
								}
								else{
									if (c.content.length > 0)
									{
										ret += this.indent('|' + c.content, (e.level+level));
									}
								}
								break;
							case 'html_inline':
							case 'softbreak':
								if (c.content.length > 0)
								{
									ret += ' ' + c.content;
								}
								break;
							case 'hardbreak':
								ret += this.indent(this.tag(c.tag, c.content, c.attrs), (e.level+level));
								break;

							case 'code_inline':
								ret += this.indent(this.htmlTag(c.tag, c.content, c.attrs), (e.level+level));
								break;
							case 'link_open':
								ret += this.indent(this.tag(c.tag, c.content, c.attrs), (e.level+level));
								p_after_tag=true;
								break;
							case 'image':
								ret += this.indent(this.tag(c.tag, "", c.attrs), (e.level+level));
								break;
							case 'strong_open':
							case 'em_open':
							case 's_open':
								ret += this.indent(this.tag(c.tag, c.content, c.attrs), (e.level+level));
								p_after_tag=true;
								break;

							default:
								break;
							}
							fst=false;
						})
					}
					else
					{
						ret += this.indent(e.content, (e.level+level));
					}
					break;

				case 'html_block':
					ret += this.indent(e.content, (e.level+level));
					break;
				case 'paragraph_close':
				case 'heading_close':
				case 'th_close':
				case 'tr_close':
				case 'thead_close':
				case 'td_close':
				case 'tbody_close':
				case 'table_close':
				case 'blockquote_close':
				case 'list_item_close':
				case 'ordered_list_close':
				case 'bullet_list_close':
					if (e.hidden)
					{
						level++;
					}
					break;

				default:
					console.log('undefined type: ', e.type, `| Tag: ${e.tag}`);
					console.log(e);
					break;
			}
		})
		return ret.trim();
	}
	/**
	 *  Properly indent the src
	 *
	 *  @param {String} src
	 *  @param {int} level
	 *  @return {String}
	 **/
	p.indent = function(src, level)
	{
		level = Math.max(0, level);
		let start = this.options.newline + (this.options.space.repeat(level));
		let content = src.replace(/\n/gm, start);
		return start + content;
	}

	/**
	 *  Generate a newline for the content if needed
	 *
	 *  @param {String} src
	 *  @return {String}
	 **/
	p.newline = function(src)
	{
		return src.length > 0 ? ' ' + src : '';
	}

	/**
	 *  Generate the pug version of a tag
	 *
	 *  @param {String} tag
	 *  @param {String} src
	 *  @param {Array.Array<String.2>} attrs
	 **/
	p.tag = function(tag, src, attrs, inline)
	{
		let attributes = (attrs != null && attrs != undefined) && '(' + attrs.map(e => e[0]+'='+((tag==="img" && e[1][0]==='`' && e[1][e[1].length-1]==='`')?'':'"')+e[1]+((tag==="img" && e[1][0]==='`' && e[1][e[1].length-1]==='`')?'':'"')) + ')' || '';
		return tag + attributes + (inline ? src : this.newline(src));
	}

	/**
	 *  Generate the html version of a tag
	 *
	 *  @param {String} tag
	 *  @param {String} src
	 *  @param {Array.Array<String.2>} attrs
	 **/
	p.htmlTag = function(tag, src, attrs)
	{
		var he = require('he');

		let attributes = (attrs != null && attrs != undefined) && ' ' + (attrs.map(e => e[0]+'="'+e[1]+'"').join(' ')) || '';
		return `<${tag}${attributes}>${he.encode(src, {'useNamedReferences': true})}</${tag}>`;
	}

	p.code = function(tag, src, attrs, info)
	{
		if (src.indexOf('\n')!=-1)
		{
			src = this.indent(src, 2);
		}

		if (info)
		{
			info = '.' + this.options.langPrefix + info.trim();
		}

		return `pre.hljs${info}${this.options.newline}${this.options.space}` + this.tag(tag+'.', src, attrs);
	}

	if (typeof module !== 'undefined' && typeof exports === 'object')
	{
		module.exports = MarkdownToPug;
	}
	else if (typeof define === 'function' && define.amd)
	{
		define(function() { return MarkdownToPug; });
	}
	else
	{
		this.MarkdownToPug = MarkdownToPug;
	}
}).call(function()
{
	return this || (typeof window !== 'undefined' ? window : global);
}());
