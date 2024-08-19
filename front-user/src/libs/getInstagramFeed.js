import fs from 'fs'
import path from 'path'

export function getInstagramFeed() {
  const instagramImages = fs.readdirSync(path.join('public/images/instagram'))
  const instagramFeed = instagramImages.map((filename) => {
    return {
      image: `/images/instagram/${filename}`,
      href: '#0',
    }
  })

  return instagramFeed
}
