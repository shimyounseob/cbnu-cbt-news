import { allArticles } from 'contentlayer/generated'

export function getTags() {
  const allArticleTags = allArticles.map((article) => article.tags).flat()

  // Map to capture count of elements
  const tagCount = new Map()

  allArticleTags.forEach((tag) => {
    if (tagCount.has(tag)) {
      tagCount.set(tag, tagCount.get(tag) + 1)
    } else {
      tagCount.set(tag, 1)
    }
  })

  const uniqueTags = [...new Set(allArticleTags)]

  const tags = uniqueTags.sort((tag1, tag2) => {
    let freq1 = tagCount.get(tag1)
    let freq2 = tagCount.get(tag2)

    return freq2 - freq1
  })

  return tags
}
