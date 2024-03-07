import {marked} from 'marked';
import sanitizeHtml from 'sanitize-html';
import hljs from 'highlight.js';
import 'highlight.js/styles/base16/solarized-dark.css';

const allowedTags = sanitizeHtml.defaults.allowedTags.concat([
  'h1', 'h2', 'h3', 'img',
]);

const allowedAttributes = Object.assign({}, sanitizeHtml.defaults.allowedAttributes, {
  img: ['src', 'alt'],
});
const sanitizeOptions = {
  allowedTags,
  allowedAttributes,
}

const NotePreview = ({children}: {children: string}) => {

  if (!children) return null;

  const renderer = new marked.Renderer();

  // 重写Renderer的code方法，在其中进行语法高亮
  renderer.code = (code, language) => {
    const validLanguage = hljs.getLanguage(language as string) ? language : 'plaintext';
    const highlightedCode = hljs.highlight(validLanguage as string, code).value;
    return `<pre class="hljs"><code>${highlightedCode}</code></pre>`;
  };

  const markdownOptions = {
    gfm: true,
    breaks: true,
    renderer,
  };

  const sanitizedMarkdown = sanitizeHtml(children, sanitizeOptions);
  const renderedMarkdown = marked(sanitizedMarkdown, markdownOptions);

  return (
    <div
      className="text-with-markdown"
      dangerouslySetInnerHTML={{ __html: renderedMarkdown }}
    />
  );
}

export default NotePreview;
