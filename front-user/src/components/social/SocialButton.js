import Link from 'next/link'
import { twMerge } from 'tailwind-merge'

import * as SocialIconsComponent from '@/components/social/SocialIcons'

const ComponentsMap = {
  twitter: SocialIconsComponent.Twitter,
  facebook: SocialIconsComponent.Facebook,
  instagram: SocialIconsComponent.Instagram,
  linkedin: SocialIconsComponent.Linkedin,
}

export function SocialButton({
  name,
  containerClassName = '',
  iconClassName = '',
  type = 'button',
  ...props
}) {
  containerClassName = twMerge(
    type === 'button'
      ? 'flex items-center justify-center w-10 h-10 duration-300 ease-in-out bg-transparent border rounded-full border-gray-300/70 group hover:bg-gray-50'
      : 'relative group',
    containerClassName,
  )
  iconClassName = twMerge(
    'w-4 h-4 text-gray-700 duration-300 ease-in-out group-hover:text-red-700',
    iconClassName,
  )

  if (name in ComponentsMap) {
    const Icon = ComponentsMap[name]
    return (
      <>
        {props.href ? (
          <Link className={containerClassName} {...props}>
            <span className="sr-only">{name}</span>
            <Icon className={iconClassName} />
          </Link>
        ) : (
          <span className={containerClassName} {...props}>
            <span className="sr-only">{name}</span>
            <Icon className={iconClassName} />
          </span>
        )}
      </>
    )
  } else {
    return null
  }
}
