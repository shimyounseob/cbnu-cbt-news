import { defineDocumentType, makeSource } from "contentlayer/source-files";

const computedFields = {
  url: {
    type: "string",
    resolve: (doc) => `/${doc._raw.flattenedPath}`,
  },
  slug: {
    type: "string",
    resolve: (doc) => `${doc._raw.sourceFileName.replace(".mdx", "")}`,
  },
};

export const Category = defineDocumentType(() => ({
  name: "Category",
  filePathPattern: `categories/**/*.mdx`,
  contentType: "mdx",
  fields: {
    name: { type: "string", required: true },
    image: { type: "string", required: true },
  },
  computedFields,
}));

export const Author = defineDocumentType(() => ({
  name: "Author",
  filePathPattern: `authors/**/*.mdx`,
  contentType: "mdx",
  fields: {
    name: { type: "string", required: true },
    avatar: { type: "string", required: true },
    role: { type: "string", required: true },
    social_links: {
      type: "list",
      of: { type: "json" },
    },
  },
  computedFields,
}));

export const Article = defineDocumentType(() => ({
  name: "Article",
  filePathPattern: `articles/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    date: { type: "date", required: true },
    image: { type: "string", required: true },
    description: { type: "string", required: true },
    time_to_read_in_minutes: { type: "number", required: true },
    views: { type: "number", required: true },
    tags: {
      type: "list",
      of: { type: "string" },
    },
    featured: {
      type: "boolean",
      default: false,
    },
    cover_story: {
      type: "boolean",
      default: false,
    },
    banner: {
      type: "boolean",
      default: false,
    },
    category: {
      type: "reference",
      of: Category,
      embedDocument: true,
    },
    author: {
      type: "reference",
      of: Author,
      embedDocument: true,
    },
  },

  computedFields,
}));

export const Page = defineDocumentType(() => ({
  name: "Page",
  filePathPattern: `pages/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
    },
    date: { type: "date" },
  },
  computedFields,
}));

export default makeSource({
  contentDirPath: "src/content",
  documentTypes: [Category, Author, Article, Page],
});
