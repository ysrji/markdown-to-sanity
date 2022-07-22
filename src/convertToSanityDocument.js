const { randomUUID } = require('crypto')
const convertHTMLtoPortableText = require('./convertHTMLtoPortableText')
const {format} = require('date-fns')
function convertToSanityDocument({data = {}, contents}) {
  const { _id, _type, tags, title, date, image, slug, hidden } = data.frontmatter || {}
  const portableText = convertHTMLtoPortableText(contents)

  const doc = {
    // _type: 'post',
    _id: randomUUID(),
    _type,
    _createdAt: format(new Date(date)),
    // date: format(new Date(date)),
    date,
    hidden,
    image: {
      "_type": "image",
      "_sanityAsset": `image@file://.${image}`,
    },
    slug: {
      "_type": "slug",
      "current": slug,
    },
    tags,
    title,
    body: portableText
  }
  return doc
}

module.exports = convertToSanityDocument
