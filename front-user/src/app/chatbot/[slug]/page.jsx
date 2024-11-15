import Chatbot from '@/components/chatbot/chatbotpage';

// ChatbotPage 컴포넌트
export default function ChatbotPage({ params }) {
  const googleId = params.slug; 

  return (
    <section
      className="relative mx-auto max-w-xl px-4 sm:px-12 sm:py-16 md:max-w-3xl lg:max-w-screen-xl lg:px-8 lg:py-24"
      style={{ paddingTop: '40px', paddingBottom: '0px' }}
    >
      <div className="w-full">
        <Chatbot googleId={googleId} /> {/* 서버에서 받은 googleId를 클라이언트 컴포넌트로 전달 */}
      </div>
    </section>
  );
}
