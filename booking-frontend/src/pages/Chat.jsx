import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useAuth } from '@/context/authContext'
import Message from '@/components/Message'

export default function Chat() {
  const [chats, setChats] = useState([])
  const { user } = useAuth()
  const params = useParams()

  useEffect(() => {
    console.log({ params, user })

    axios.get(`/api/messages/chat/${user._id}/${params.id}`).then((res) => {
      console.log('res.data', res.data)
      setChats(res.data)
    })
  }, [])
  return (
    <div className='flex flex-col gap-2  justify-end '>
      {chats.map((chat) => {
        return (
          <Message
            message={chat.content}
            isYours={chat.sender_id === user._id}
          ></Message>
        )
      })}
    </div>
  )
}
