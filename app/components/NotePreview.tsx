import {marked} from 'marked';
import sanitizeHtml from 'sanitize-html';

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
  return (
    <div
      className="text-with-markdown"
      dangerouslySetInnerHTML={{
        __html: sanitizeHtml(marked(children), sanitizeOptions)
      }}
    />
  );
}

export default NotePreview;
