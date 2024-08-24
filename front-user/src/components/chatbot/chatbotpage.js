'use client'

import { useState } from 'react'
import { PaperAirplaneIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'

export default function Chatbot() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex-1 flex overflow-hidden">
        {/* 사이드바 */}
        {isSidebarOpen ? (
          <div className="bg-gray-100 border-r w-full max-w-[260px] p-4 pt-5 transition-all duration-700">
            <div className="flex justify-between items-center w-full gap-2 px-2 text-left pl-0">
              <div className="flex items-center justify-center rounded-full w-12 h-12">
                <Image 
                  src="/images/gptlogo.png" 
                  alt="GPT Logo" 
                  width={40}  
                  height={40} 
                  className="object-cover"
                />
              </div>
              <button 
                className="p-2 focus:outline-none "
                onClick={() => setIsSidebarOpen(false)}
              >
                <ChevronRightIcon className="h-6 w-6 text-gray-600" />
              </button>
            </div>
            <div className="mt-4">
              <div className="grid gap-1 text-foreground">
                <div className="px-2 text-xs font-medium text-muted-foreground">Today</div>
                <div className="flex-1 block p-2 overflow-hidden text-sm truncate transition-colors rounded-md whitespace-nowrap hover:bg-gray-200">
                  Airplane Turbulence: Sky's Rollercoaster
                </div>
                <div className="flex-1 block p-2 overflow-hidden text-sm truncate transition-colors rounded-md whitespace-nowrap hover:bg-gray-200">
                  How to make a chat app with React
                </div>
                <div className="flex-1 block p-2 overflow-hidden text-sm truncate transition-colors rounded-md whitespace-nowrap hover:bg-gray-200">
                  Cooking recipe for disaster
                </div>
              </div>
              <div className="grid gap-1 text-foreground">
                <div className="px-2 pt-3 pb-2 text-xs font-medium text-muted-foreground">Yesterday</div>
                <div className="flex-1 block p-2 overflow-hidden text-sm truncate transition-colors rounded-md whitespace-nowrap hover:bg-gray-200">
                  Python function for Fibonacci sequence
                </div>
                <div className="flex-1 block p-2 overflow-hidden text-sm truncate transition-colors rounded-md whitespace-nowrap hover:bg-gray-200">
                  Five largest lakes in the world
                </div>
                <div className="flex-1 block p-2 overflow-hidden text-sm truncate transition-colors rounded-md whitespace-nowrap hover:bg-gray-200">
                  Weather forecast in Seattle
                </div>
              </div>
            </div>
          </div>
        ) : (
          <button 
            className="p-2 focus:outline-none"
            onClick={() => setIsSidebarOpen(true)}
          >
            <ChevronRightIcon className="h-6 w-6 text-gray-600" />
          </button>
        )}

        {/* 메인 채팅 영역 */}
        <div className={`flex-1 overflow-auto flex flex-col transition-all duration-300 ${isSidebarOpen ? '' : 'pl-10'}`}>
          {/* 채팅방 이름 영역 */}
          <div className="bg-[#f3f4f6] p-2 shadow-sm border-b text-center" style={{ paddingTop: '16px', paddingBottom: '16px' }}>
            <h2 className="text-base font-semibold text-black">CBNU Protest and Integration Update</h2>
          </div>

          {/* 메시지 목록 */}
          <div className="flex-1 space-y-4 p-4 md:p-6 overflow-auto"> {/* 스크롤 가능하게 설정 */}
            <div className="flex items-start justify-end">
              <div className="bg-[#f03077] p-3 rounded-lg max-w-[60%] text-white">
                <div className="text-sm">
                  <p>What are the main reasons behind the student protest at Chungbuk National University on May 7?</p>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <div className="w-8 h-8 rounded-full overflow-hidden">
                <Image 
                  src="/images/cbnuicon.png" 
                  alt="ChatGPT Avatar" 
                  width={32} 
                  height={32} 
                  className="object-cover"
                />
              </div>
              <div className="bg-[#b42258] p-3 rounded-lg max-w-[60%] text-white">
                <div className="text-sm text-muted-foreground">
                  <p>Students protested against the integration with Korea National University of Transportation (KNUT) and the potential change to CBNU's name. They believe these changes could harm the university's identity, history, and legacy.</p>
                </div>
              </div>
            </div>

            <div className="flex items-start justify-end">
              <div className="bg-[#f03077] p-3 rounded-lg max-w-[60%] text-white">
                <div className="text-sm">
                  <p>What actions have CBNU and KNUT planned regarding the integration and name selection?</p>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <div className="w-8 h-8 rounded-full overflow-hidden">
                <Image 
                  src="/images/cbnuicon.png" 
                  alt="ChatGPT Avatar" 
                  width={32} 
                  height={32} 
                  className="object-cover"
                />
              </div>
              <div className="bg-[#b42258] p-3 rounded-lg max-w-[60%] text-white">
                <div className="text-sm text-muted-foreground">
                  <p>CBNU conducted a name survey from April 30 to May 9. KNUT held a name contest from April 22 to May 3. Both universities plan to hold information sessions and finalize the integrated university name by the end of June.</p>
                </div>
              </div>
            </div>
          </div>

          {/* 채팅 입력창 */}
          <div className="bg-gray-100 border-t p-4 md:p-6">
            <div className="relative">
              <textarea
                placeholder="Message ..."
                name="message"
                id="message"
                rows={1}
                className="min-h-[48px] rounded-2xl resize-none p-4 border border-neutral-400 shadow-sm pr-16 w-full"
              />
              <button type="submit" className="absolute w-8 h-8 top-3 right-3">
                <PaperAirplaneIcon className="w-4 h-4" />
                <span className="sr-only">Send</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
