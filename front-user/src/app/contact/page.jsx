import SimpleHeader from '@/components/headers/SimpleHeader'
import ContactDepartments from '@/components/contact/ContactDepartments'
import ContactLocations from '@/components/contact/ContactLocations'
import ContactMail from '@/components/contact/ContactMail'
import SidebarSocialLinks from '@/components/sidebar/SidebarSocialLinks'
import SidebarInstagramFeed from '@/components/sidebar/SidebarInstagramFeed'
import Newsletter from '@/components/shared/Newsletter'

export const metadata = {
  title: 'Contact',
  description:
    'We’d love to hear from you! Get in touch with us using our contact information below.',
}

export default function ContactPage() {
  return (
    <>
      <SimpleHeader
        headline={'Contact Banter'}
        text={
          'Lorem ipsum dolor sit amet adipiscing pulvinar nibh enim. Iaculis justo non nibh in lacus non nibh pellentesque libero aenean tincidunt dolore. Ornare etiam praesent mattis purus vitae dapibus at.'
        }
      />

      {/* Contact main */}
      <section className="relative mx-auto max-w-screen-xl py-12 md:py-16 lg:px-8 lg:py-24">
        <div className="w-full lg:flex lg:items-start lg:space-x-8">
          {/* Contact Information */}
          <div className="space-y-16 lg:w-2/3">
            <ContactDepartments />
            <ContactLocations />
            <ContactMail />
          </div>

          {/* Sticky Sidebar */}
          <div className="mx-auto mt-12 w-full max-w-xl space-y-8 px-4 sm:mt-16 sm:px-6 md:max-w-2xl md:px-8 lg:sticky lg:top-8 lg:mt-0 lg:w-1/3 lg:max-w-none lg:px-0">
            <SidebarSocialLinks />
            <SidebarInstagramFeed />
          </div>
        </div>
      </section>

      <Newsletter />
    </>
  )
}
