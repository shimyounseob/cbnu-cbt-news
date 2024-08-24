import Chatbot from '@/components/chatbot/chatbotpage' 

export default function ChatbotPage() {
  return (
    <>
      <section
        className="relative mx-auto max-w-xl px-4 sm:px-12 sm:py-16 md:max-w-3xl lg:max-w-screen-xl lg:px-8 lg:py-24"
        style={{ paddingTop: '40px', paddingBottom: '0px' }}
      >
        <div className="w-full">
          <Chatbot /> 
        </div>
      </section>
    </>
  )
}
