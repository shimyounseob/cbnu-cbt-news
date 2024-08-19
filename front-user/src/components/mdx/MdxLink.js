import Link from 'next/link'

export function MdxLink({ href, ...props }) {
  return (
    <Link href={href} {...props}>
      {props.children}
    </Link>
  )
}
