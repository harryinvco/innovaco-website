import { defineDocumentType, makeSource } from 'contentlayer/source-files'

export const CaseStudy = defineDocumentType(() => ({
  name: 'CaseStudy',
  filePathPattern: 'case-studies/**/*.mdx',
  contentType: 'mdx',
  fields: {
    title:      { type: 'string',  required: true },
    titleEl:    { type: 'string',  required: true },
    client:     { type: 'string',  required: true },
    sector:     { type: 'string',  required: true },
    summary:    { type: 'string',  required: true },
    summaryEl:  { type: 'string',  required: true },
    date:       { type: 'date',    required: true },
    tags:       { type: 'list', of: { type: 'string' }, required: true },
    featured:   { type: 'boolean', default: false },
    coverImage: { type: 'string',  required: true },
    results:    { type: 'list', of: { type: 'string' }, required: false },
  },
  computedFields: {
    slug: { type: 'string', resolve: (d) => d._raw.flattenedPath.replace('case-studies/', '') },
    url:  { type: 'string', resolve: (d) => `/case-studies/${d._raw.flattenedPath.replace('case-studies/', '')}` },
  },
}))

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: 'blog/**/*.mdx',
  contentType: 'mdx',
  fields: {
    title:      { type: 'string', required: true },
    titleEl:    { type: 'string', required: true },
    summary:    { type: 'string', required: true },
    summaryEl:  { type: 'string', required: true },
    date:       { type: 'date',   required: true },
    author:     { type: 'string', default: 'Harry Newton' },
    tags:       { type: 'list', of: { type: 'string' }, required: false },
    coverImage: { type: 'string', required: false },
  },
  computedFields: {
    slug: { type: 'string', resolve: (d) => d._raw.flattenedPath.replace('blog/', '') },
    url:  { type: 'string', resolve: (d) => `/blog/${d._raw.flattenedPath.replace('blog/', '')}` },
  },
}))

export default makeSource({ contentDirPath: 'content', documentTypes: [CaseStudy, Post] })
