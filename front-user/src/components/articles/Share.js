'use client'

import { SocialButton } from '@/components/social/SocialButton'
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
} from 'next-share'

export function Share() {
  const IS_SERVER = typeof window === 'undefined'
  const url = IS_SERVER ? '' : window.location.href

  return (
    <div className="py-8 sm:py-10">
      <div className="flex items-center justify-between">
        <span className="text-lg font-medium text-gray-900">Share</span>

        {/* Social Links */}
        <div className="flex items-center space-x-3">
          <TwitterShareButton url={url}>
            <SocialButton name="twitter" containerClassName="sm:w-12 sm:h-12" />
          </TwitterShareButton>
          <FacebookShareButton url={url}>
            <SocialButton
              name="facebook"
              containerClassName="sm:w-12 sm:h-12"
            />
          </FacebookShareButton>
          <LinkedinShareButton url={url}>
            <SocialButton
              name="linkedin"
              containerClassName="sm:w-12 sm:h-12"
            />
          </LinkedinShareButton>
        </div>
      </div>
    </div>
  )
}
