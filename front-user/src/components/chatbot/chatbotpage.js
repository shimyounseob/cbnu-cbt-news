'use client'

import { useState, useEffect } from 'react'
import {
  PaperAirplaneIcon,
  ChevronRightIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/20/solid'
import Image from 'next/image'
import Modal from '../ui/modal' // 모달 컴포넌트 import

function Chatbot({ googleId }) {
  console.log('Google ID: ', googleId)

  const [rooms, setRooms] = useState([]) // 채팅방 목록 상태
  const [currentRoom, setCurrentRoom] = useState(null) // 현재 선택된 채팅방
  const [isSidebarOpen, setIsSidebarOpen] = useState(true) // 사이드바 열림 상태
  const [messages, setMessages] = useState([]) // 채팅 메시지 상태
  const [message, setMessage] = useState('') // 현재 입력된 메시지
  const [socket, setSocket] = useState(null) // WebSocket 연결 상태

  const [isModalOpen, setIsModalOpen] = useState(false) // 이름 수정 모달 열림 상태
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false) // 삭제 확인 모달 열림 상태
  const [modalRoomId, setModalRoomId] = useState(null) // 모달에서 수정할 채팅방 ID
  const [newRoomName, setNewRoomName] = useState('') // 새 채팅방 이름 상태
  const [roomToDelete, setRoomToDelete] = useState(null) // 삭제할 채팅방 상태

  // 모달을 열기 위한 함수
  const openModal = (roomId, currentName) => {
    setModalRoomId(roomId)
    setNewRoomName(currentName) // 현재 이름을 기본값으로 설정
    setIsModalOpen(true) // 모달 열기
  }

  // 삭제 모달 열기 위한 함수
  const openDeleteModal = (roomId) => {
    setRoomToDelete(roomId) // 삭제할 채팅방 설정
    setIsDeleteModalOpen(true) // 삭제 확인 모달 열기
  }

  // 모달을 닫기 위한 함수
  const closeModal = () => {
    setIsModalOpen(false) // 모달 닫기
    setNewRoomName('') // 이름 초기화
  }

  // 삭제 확인 모달 닫기
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false) // 삭제 확인 모달 닫기
    setRoomToDelete(null) // 삭제할 채팅방 초기화
  }

  // 모달을 통해 채팅방 이름 수정 처리
  const handleEditRoomName = async () => {
    if (!newRoomName.trim()) return
    try {
      const response = await fetch(
        `http://localhost:5001/chatRoom/${modalRoomId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ roomName: newRoomName }), // 새 이름 전송
        },
      )

      if (response.ok) {
        setRooms(
          rooms.map(
            (room) =>
              room._id === modalRoomId
                ? { ...room, roomName: newRoomName }
                : room, // 이름 수정
          ),
        )
        closeModal() // 모달 닫기
      }
    } catch (error) {
      console.error('Error updating room name:', error)
    }
  }

  // 채팅방 목록을 가져오기
  useEffect(() => {
    async function fetchRooms() {
      try {
        const response = await fetch(
          `http://localhost:5001/chatRoom/${googleId}`,
        ) // googleId를 기반으로 채팅방 목록 가져오기
        const data = await response.json()
        console.log('Fetched rooms data:', data) // 가져온 데이터 콘솔에서 확인하기
        setRooms(data) // 가져온 채팅방 목록을 상태에 설정하기
        if (data.length > 0) {
          setCurrentRoom(data[0]._id) // 첫 번째 채팅방을 기본으로 선택하기
        }
      } catch (error) {
        console.error('Error fetching rooms:', error)
      }
    }

    if (googleId) {
      fetchRooms() // googleId가 있을 경우에만 채팅방 목록 가져오기
    }
  }, [googleId]) // googleId가 변경될 때마다 다시 실행되도록 설정하기

  // 특정 채팅방의 메시지를 가져오기
  useEffect(() => {
    async function fetchMessages() {
      try {
        if (currentRoom) {
          const response = await fetch(
            `http://localhost:5001/messages/${currentRoom}`,
          ) // 현재 채팅방에 해당하는 메시지 가져오기
          const data = await response.json()
          console.log('Fetched messages:', data) // 가져온 메시지 콘솔에서 확인하기
          setMessages(
            data.map((msg) => ({
              text: msg.message,
              isUser: msg.sender !== 'GPT', // sender가 GPT인지 아닌지만 비교하기
            })),
          ) // 가져온 메시지를 상태에 설정하기
        }
      } catch (error) {
        console.error('Error fetching messages:', error) // 오류 발생 시 콘솔에 출력하기
      }
    }

    fetchMessages() // 메시지 가져오기 함수 호출하기
  }, [currentRoom]) // currentRoom이 변경될 때마다 실행되도록 설정하기

  // WebSocket 연결 설정
  useEffect(() => {
    if (currentRoom) {
      console.log(
        `Connecting WebSocket to ws://127.0.0.1:8000/ws/chat/${googleId}/${currentRoom}/`,
      )
      const ws = new WebSocket(
        `ws://127.0.0.1:8000/ws/chat/${googleId}/${currentRoom}/`,
      ) // googleId와 현재 채팅방을 기반으로 WebSocket 연결 설정하기
      setSocket(ws) // WebSocket 객체를 상태에 저장하기

      ws.onopen = () => {
        console.log('WebSocket connection opened') // WebSocket 연결이 열렸을 때 로그 출력하기
      }

      ws.onmessage = (event) => {
        console.log('Received message:', event.data) // 수신한 메시지 로그로 출력하기
        const data = JSON.parse(event.data) // 수신한 데이터를 JSON 형식으로 파싱하기
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: data.message, isUser: false }, // 수신된 메시지를 상태에 추가하기
        ])
      }

      ws.onclose = () => {
        console.error('WebSocket closed unexpectedly') // WebSocket 연결이 끊어졌을 때 로그 출력하기
      }

      ws.onerror = (error) => {
        console.error('WebSocket error:', error) // WebSocket 오류 발생 시 로그 출력하기
      }

      return () => {
        console.log('Closing WebSocket connection')
        ws.close() // 컴포넌트 언마운트 시 WebSocket 연결 닫기
      }
    }
  }, [currentRoom, googleId]) // currentRoom이나 googleId가 변경될 때마다 WebSocket 연결을 다시 설정하기

  // 메시지 전송 처리
  const handleSendMessage = () => {
    if (socket && message.trim() !== '') {
      console.log('Sending message:', message)
      socket.send(JSON.stringify({ message })) // WebSocket을 통해 메시지 전송하기
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: message, isUser: true }, // 전송한 메시지를 상태에 추가하기
      ])
      setMessage('') // 메시지 전송 후 입력창 초기화하기
    } else {
      console.log('No message to send or WebSocket is not connected') // 메시지가 없거나 WebSocket이 연결되지 않았을 때 로그 출력하기
    }
  }

  // 새로운 채팅방 추가
  const handleAddRoom = async () => {
    const roomName = `Room ${rooms.length + 1}` // 새로운 채팅방 이름 생성하기

    try {
      const response = await fetch(
        `http://localhost:5001/chatRoom/${googleId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ roomName }), // 새로운 채팅방 생성 요청 보내기
        },
      )

      if (response.ok) {
        const newRoom = await response.json() // 생성된 채팅방 정보를 받아오기
        setRooms([...rooms, newRoom]) // 새로운 채팅방을 상태에 추가하기
        setCurrentRoom(newRoom._id) // 새로 생성된 채팅방을 현재 채팅방으로 설정하기
      } else {
        const errorData = await response.json()
        console.error('Failed to create room:', errorData) // 채팅방 생성 실패 시 로그 출력하기
      }
    } catch (error) {
      console.error('Error during room creation:', error) // 채팅방 생성 중 오류 발생 시 로그 출력하기
    }
  }

  // 채팅방 삭제
  const handleDeleteRoom = async () => {
    const id = roomToDelete; // 삭제할 방 ID
    if (id) {
      try {
        const response = await fetch(`http://localhost:5001/chatRoom/${id}`, {
          method: 'DELETE',
        })

        if (response.ok) {
          setRooms(rooms.filter((room) => room._id !== id)) // 삭제된 채팅방을 목록에서 제거하기
          setCurrentRoom(rooms.length > 0 ? rooms[0]._id : null) // 남은 채팅방 중 첫 번째 채팅방을 현재 채팅방으로 설정하기
          closeDeleteModal() // 삭제 모달 닫기
        }
      } catch (error) {
        console.error('Error deleting room:', error) // 채팅방 삭제 중 오류 발생 시 로그 출력하기
      }
    }
  }

  return (
    <div className="flex h-screen flex-col bg-gray-100">
      {/* 모달 컴포넌트 추가 */}
      <Modal
        isOpen={isModalOpen}
        closeModal={closeModal}
        title="Edit Room Name"
      >
        <input
          type="text"
          value={newRoomName}
          onChange={(e) => setNewRoomName(e.target.value)} // 입력된 이름 업데이트
          className="w-full rounded-md border p-2"
        />
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleEditRoomName}
            className="rounded-lg bg-[#b42258] px-4 py-2 text-white hover:bg-[#991d4a]"
          >
            Save
          </button>
        </div>
      </Modal>

      {/* 삭제 확인 모달 추가 */}
      <Modal
        isOpen={isDeleteModalOpen}
        closeModal={closeDeleteModal}
        title="Delete Room"
      >
        <p>Are you sure you want to delete this room?</p>
        <div className="mt-4 flex justify-end">
          <button
            onClick={closeDeleteModal}
            className="mr-2 rounded-lg bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleDeleteRoom}
            className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </Modal>

      <div className="flex flex-1 overflow-hidden">
        {isSidebarOpen ? (
          <div className="w-full max-w-[260px] border-r bg-gray-100 p-4 pt-5 transition-all duration-700">
            <div className="flex w-full items-center justify-between gap-2 px-2 pl-0 text-left">
              <div className="flex h-12 w-12 items-center justify-center rounded-full">
                <Image
                  src="/images/gptlogo.png"
                  alt="GPT Logo"
                  width={40}
                  height={40}
                  className="object-cover"
                />
              </div>
              <button
                className="p-2 focus:outline-none"
                onClick={() => setIsSidebarOpen(false)} // 사이드바 열림 상태 업데이트하기
              >
                <ChevronRightIcon className="h-6 w-6 text-gray-600" />
              </button>
            </div>
            <div className="mt-4">
              <div className="text-foreground grid gap-1">
                <div className="text-muted-foreground px-2 text-xs font-medium">
                  Chat Rooms
                </div>
                {Array.isArray(rooms) && rooms.length > 0 ? (
                  rooms.map((room) => (
                    <div
                      key={room._id}
                      className="flex cursor-pointer items-center justify-between p-2 hover:bg-gray-200"
                      onClick={() => setCurrentRoom(room._id)} // 클릭 시 현재 채팅방을 설정하기
                    >
                      <span>{room.roomName}</span>
                      <div className="flex space-x-2">
                        <PencilIcon
                          className="h-4 w-4 text-gray-600"
                          onClick={() => openModal(room._id, room.roomName)} // 이름 수정 모달 열기
                        />
                        <TrashIcon
                          className="h-4 w-4 text-gray-600"
                          onClick={() => openDeleteModal(room._id)} // 삭제 확인 모달 열기
                        />
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No chat rooms available.</p>
                )}
                <button
                  className="mt-4 flex w-full items-center justify-center rounded bg-gray-200 p-2 text-sm font-medium text-gray-600 hover:bg-gray-300"
                  onClick={handleAddRoom} // 새로운 채팅방 추가 버튼 클릭 시 처리하기
                >
                  <PlusIcon className="mr-2 h-5 w-5" />
                  Add Room
                </button>
              </div>
            </div>
          </div>
        ) : (
          <button
            className="p-2 focus:outline-none"
            onClick={() => setIsSidebarOpen(true)} // 사이드바 열기
          >
            <ChevronRightIcon className="h-6 w-6 text-gray-600" />
          </button>
        )}

        <div
          className={`flex flex-1 flex-col overflow-auto transition-all duration-300 ${
            isSidebarOpen ? '' : 'pl-10'
          }`}
        >
          <div
            className="border-b bg-[#f3f4f6] p-2 text-center shadow-sm"
            style={{ paddingTop: '16px', paddingBottom: '16px' }}
          >
            <h2 className="text-base font-semibold text-black">
              {rooms.find((room) => room._id === currentRoom)?.roomName}
            </h2>
          </div>

          <div className="flex-1 space-y-4 overflow-auto p-4 md:p-6">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex items-start ${
                  msg.isUser ? 'justify-end' : 'gap-2'
                }`}
              >
                {!msg.isUser && (
                  <div className="h-8 w-8 overflow-hidden rounded-full">
                    <Image
                      src="/images/cbnuicon.png"
                      alt="ChatGPT Avatar"
                      width={32}
                      height={32}
                      className="object-cover"
                    />
                  </div>
                )}
                <div
                  className={`max-w-[60%] rounded-lg p-3 text-white ${
                    msg.isUser ? 'bg-[#f03077]' : 'bg-[#b42258]'
                  }`}
                >
                  <div className="text-sm">
                    <p>{msg.text}</p> {/* 메시지 텍스트 표시하기 */}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t bg-gray-100 p-4 md:p-6">
            <div className="relative">
              <textarea
                placeholder="Message ..."
                name="message"
                id="message"
                rows={1}
                value={message}
                onChange={(e) => setMessage(e.target.value)} // 입력된 메시지 상태 업데이트하기
                className="min-h-[48px] w-full resize-none rounded-2xl border border-neutral-400 p-4 pr-16 shadow-sm"
              />
              <button
                type="button"
                onClick={handleSendMessage} // 전송 버튼 클릭 시 메시지 전송 처리하기
                className="absolute right-3 top-3 h-8 w-8"
              >
                <PaperAirplaneIcon className="h-4 w-4" />
                <span className="sr-only">Send</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chatbot
