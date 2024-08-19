import Image from 'next/image'

export function MdxImage({ alt, caption, ...props }) {
  return (
    <figure>
      <Image className="h-auto w-full" {...props} alt={alt} />
      {caption && (
        <figcaption className="mt-3 text-center text-sm text-gray-500">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
