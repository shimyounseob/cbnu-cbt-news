import clsx from 'clsx'
import '@/styles/globals.css'
import { Roboto_Flex } from 'next/font/google'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import AccordionChild from '@/components/accordion/AccordionChild'

const roboto = Roboto_Flex({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
})

export const metadata = {
  title: {
    template: '%s | Banter',
    default: 'The Chungbuk Times',
  },
  icons: {
    icon: '/images/cbnuicon.png',
  },
}

export default function RootLayout({ children, params  }) {
  const googleId = params?.slug; 

  return (
    <html lang="en">
      <body className={clsx('font-sans', roboto.variable)}>
        <Navbar />
        {children}
        <Footer />
        <AccordionChild googleId={googleId} /> {/* 아코디언 컴포넌트 */}
      </body>
    </html>
  )
}
