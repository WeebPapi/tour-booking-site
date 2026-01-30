import React from "react"
import Image from "next/image"
import {
  StoryblokRichTextNode,
  StoryblokTextNode,
  StoryblokImageNode,
  StoryblokHeadingNode,
  StoryblokParagraphNode,
  StoryblokBulletListNode,
  StoryblokOrderedListNode,
  StoryblokListItemNode,
  StoryblokBlockquoteNode,
  StoryblokMark,
  TourRichText,
} from "@/types/tour"

/**
 * Renders text nodes with their marks (bold, italic, links, etc.)
 */
const renderTextWithMarks = (
  node: StoryblokTextNode,
  key: string,
): React.ReactNode => {
  let content: React.ReactNode = node.text

  if (!node.marks || node.marks.length === 0) {
    return <React.Fragment key={key}>{content}</React.Fragment>
  }

  // Apply marks in reverse order to ensure proper nesting
  node.marks.forEach((mark: StoryblokMark, index: number) => {
    const markKey = `${key}-mark-${index}`

    switch (mark.type) {
      case "bold":
        content = <strong key={markKey}>{content}</strong>
        break
      case "italic":
        content = <em key={markKey}>{content}</em>
        break
      case "strike":
        content = <s key={markKey}>{content}</s>
        break
      case "underline":
        content = <u key={markKey}>{content}</u>
        break
      case "code":
        content = <code key={markKey}>{content}</code>
        break
      case "link":
        content = (
          <a
            key={markKey}
            href={mark.attrs?.href || "#"}
            target={mark.attrs?.target || "_self"}
            rel={
              mark.attrs?.target === "_blank"
                ? "noopener noreferrer"
                : undefined
            }
            title={mark.attrs?.title}
          >
            {content}
          </a>
        )
        break
      default:
        // Handle any custom mark types
        content = (
          <span key={markKey} data-mark-type={mark.type}>
            {content}
          </span>
        )
    }
  })

  return content
}

/**
 * Recursively renders rich text nodes
 */
const renderNode = (
  node: StoryblokRichTextNode,
  index: number,
  parentKey = "",
): React.ReactNode => {
  const key = `${parentKey}-${node.type}-${index}`

  switch (node.type) {
    case "text":
      return renderTextWithMarks(node, key)

    case "paragraph": {
      const paragraphNode = node as StoryblokParagraphNode
      const textAlign = paragraphNode.attrs?.textAlign as
        | "left"
        | "center"
        | "right"
        | "justify"
        | undefined

      return (
        <p key={key} style={textAlign ? { textAlign } : undefined}>
          {paragraphNode.content?.map((child, i) =>
            renderNode(child, i, key),
          ) || null}
        </p>
      )
    }

    case "heading": {
      const headingNode = node as StoryblokHeadingNode
      const HeadingTag = `h${headingNode.attrs.level}` as
        | "h1"
        | "h2"
        | "h3"
        | "h4"
        | "h5"
        | "h6"
      const textAlign = headingNode.attrs.textAlign as
        | "left"
        | "center"
        | "right"
        | "justify"
        | undefined

      return React.createElement(
        HeadingTag,
        { key, style: textAlign ? { textAlign } : undefined },
        headingNode.content.map((child, i) => renderNode(child, i, key)),
      )
    }

    case "bullet_list": {
      const listNode = node as StoryblokBulletListNode
      return (
        <ul key={key}>
          {listNode.content.map((child, i) => renderNode(child, i, key))}
        </ul>
      )
    }

    case "ordered_list": {
      const listNode = node as StoryblokOrderedListNode
      return (
        <ol key={key} start={listNode.attrs?.order || 1}>
          {listNode.content.map((child, i) => renderNode(child, i, key))}
        </ol>
      )
    }

    case "list_item": {
      const listItemNode = node as StoryblokListItemNode
      return (
        <li key={key}>
          {listItemNode.content.map((child, i) => renderNode(child, i, key))}
        </li>
      )
    }

    case "blockquote": {
      const blockquoteNode = node as StoryblokBlockquoteNode
      return (
        <blockquote key={key}>
          {blockquoteNode.content.map((child, i) => renderNode(child, i, key))}
        </blockquote>
      )
    }

    case "horizontal_rule":
      return <hr key={key} />

    case "image": {
      const imageNode = node as StoryblokImageNode
      return (
        <Image
          key={key}
          src={imageNode.attrs.src}
          alt={imageNode.attrs.alt || ""}
          title={imageNode.attrs.title || undefined}
          width={800}
          height={600}
          className="rich-text-image"
          style={{ width: "100%", height: "auto" }}
        />
      )
    }

    default:
      // Fallback for unknown node types
      console.warn(
        `Unknown rich text node type: ${(node as { type: string }).type}`,
      )
      return null
  }
}

/**
 * Props for the RichTextRenderer component
 */
interface RichTextRendererProps {
  /** The rich text document from Storyblok */
  content: TourRichText
  /** Optional className for the container div */
  className?: string
  /** Optional inline styles for the container div */
  style?: React.CSSProperties
}

/**
 * Robust component for rendering Storyblok rich text content
 * Handles all standard Storyblok rich text nodes including:
 * - Text with marks (bold, italic, links, etc.)
 * - Headings (h1-h6)
 * - Paragraphs with text alignment
 * - Bullet and ordered lists
 * - Blockquotes
 * - Images
 * - Horizontal rules
 *
 * @example
 * ```tsx
 * <RichTextRenderer content={tourPage.body} className="prose" />
 * ```
 */
export const RichTextRenderer: React.FC<RichTextRendererProps> = ({
  content,
  className,
  style,
}) => {
  if (!content || content.type !== "doc" || !content.content) {
    return null
  }

  return (
    <div className={className} style={style}>
      {content.content.map((node, index) => renderNode(node, index))}
    </div>
  )
}

export default RichTextRenderer
