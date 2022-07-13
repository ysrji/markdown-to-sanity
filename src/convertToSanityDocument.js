const convertHTMLtoPortableText = require('./convertHTMLtoPortableText')
const {format} = require('date-fns')
function convertToSanityDocument({data = {}, contents}) {
  const { _type, tags, title, date, image, slug } = data.frontmatter || {}
  const portableText = convertHTMLtoPortableText(contents)

  const doc = {
    // _type: 'post',
    _type,
    _createdAt: format(new Date(date)),
    // date: format(new Date(date)),
    date,
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
