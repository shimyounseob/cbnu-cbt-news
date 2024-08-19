import AboutHeader from '@/components/about/AboutHeader'
import AboutContent from '@/components/about/AboutContent'
import Partners from '@/components/about/Partners'
import Team from '@/components/about/Team'
import Careers from '@/components/about/Careers'
import Newsletter from '@/components/shared/Newsletter'

export const metadata = {
  title: 'About',
  description:
    "We are a dynamic team of journalists dedicated to shedding light on today's important stories. Dive into our vibrant community and experience our commitment to compelling, insightful journalism.",
}

export default function AboutPage() {
  return (
    <>
      <AboutHeader />
      <AboutContent />
      <Partners />
      <Team />
      <Careers />
      <Newsletter />
    </>
  )
}
