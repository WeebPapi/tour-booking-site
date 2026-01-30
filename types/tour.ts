export interface TourAsset {
  id: number
  alt: string
  name: string
  focus: string
  title: string
  source: string
  filename: string
  copyright: string
  fieldtype: string
  is_external_url: boolean
  meta_data: {
    alt: string
    title: string
    source: string
    copyright: string
  }
}

export interface StoryblokMark {
  type: "bold" | "italic" | "strike" | "underline" | "code" | "link" | string
  attrs?: any
}

export interface StoryblokTextNode {
  type: "text"
  text: string
  marks?: StoryblokMark[]
}

export interface StoryblokImageNode {
  type: "image"
  attrs: {
    id: number
    alt: string
    src: string
    title: string
    source: string
    copyright: string
    meta_data?: any
  }
}

export interface StoryblokHeadingNode {
  type: "heading"
  attrs: {
    level: 1 | 2 | 3 | 4 | 5 | 6
    textAlign?: string | null
  }
  content: StoryblokRichTextNode[]
}

export interface StoryblokParagraphNode {
  type: "paragraph"
  attrs?: {
    textAlign?: string | null
  }
  content?: StoryblokRichTextNode[]
}

export interface StoryblokListItemNode {
  type: "list_item"
  content: StoryblokRichTextNode[]
}

export interface StoryblokBulletListNode {
  type: "bullet_list"
  content: StoryblokListItemNode[]
}

export interface StoryblokOrderedListNode {
  type: "ordered_list"
  attrs?: {
    order: number
  }
  content: StoryblokListItemNode[]
}

export interface StoryblokHorizontalRuleNode {
  type: "horizontal_rule"
}

export interface StoryblokBlockquoteNode {
  type: "blockquote"
  content: StoryblokRichTextNode[]
}

export type StoryblokRichTextNode =
  | StoryblokTextNode
  | StoryblokImageNode
  | StoryblokHeadingNode
  | StoryblokParagraphNode
  | StoryblokBulletListNode
  | StoryblokOrderedListNode
  | StoryblokListItemNode
  | StoryblokHorizontalRuleNode
  | StoryblokBlockquoteNode

export interface TourRichText {
  type: "doc"
  content: StoryblokRichTextNode[]
}

export interface TourContent {
  _uid: string
  body: TourRichText
  name: string
  price: string
  location: string
  component: "tour" // Literal type since component is "tour"
  main_image: TourAsset
  introduction: string
}

export interface TourStory {
  name: string
  created_at: string
  published_at: string
  updated_at: string
  id: number
  uuid: string
  content: TourContent
  slug: string
  full_slug: string
  sort_by_date: string | null
  position: number
  tag_list: string[]
  is_startpage: boolean
  parent_id: number
  meta_data: any | null
  group_id: string
  first_published_at: string
  release_id: string | null
  lang: string
  path: string | null
  alternates: any[]
  default_full_slug: string | null
  translated_slugs: any | null
}
