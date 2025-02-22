import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import rehypeHighlight from 'rehype-highlight'
import remarkGfm from 'remark-gfm'
import CopyButton from '../CopyButton'
import { useRef } from 'react'
import PropTypes from 'prop-types'

function Pre({ className, children }) {
  const preRef = useRef(null)
  return (
    <pre className={className} ref={preRef} style="position: relative;">
      <CopyButton
        className="code-copy-btn"
        contentFn={() => preRef.current.textContent}
        size={14}
      />
      {children}
    </pre>
  )
}

Pre.propTypes = {
  className: PropTypes.string.isRequired,
  children: PropTypes.object.isRequired,
}

export function MarkdownRender(props) {
  const linkProperties = {
    target: '_blank',
    style: 'color: #8ab4f8;',
    rel: 'nofollow noopener noreferrer',
  }
  return (
    <div dir="auto">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[
          rehypeRaw,
          [
            rehypeHighlight,
            {
              detect: true,
              ignoreMissing: true,
            },
          ],
        ]}
        components={{
          a: (props) => (
            <a href={props.href} {...linkProperties}>
              {props.children}
            </a>
          ),
          pre: Pre,
        }}
        {...props}
      >
        {props.children}
      </ReactMarkdown>
    </div>
  )
}

MarkdownRender.propTypes = {
  ...ReactMarkdown.propTypes,
}

export default MarkdownRender
