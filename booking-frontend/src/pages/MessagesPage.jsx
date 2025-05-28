import React, { useEffect, useState } from 'react'
import ConversationList from '../components/ConversationList'
import axios from 'axios'
import { useAuth } from '@/context/authContext'
import { RequireAuth } from '@/ProtectedRoute'

export default function MessagesPage() {
  const [conversations, setConversations] = useState([])
  const { user } = useAuth()
  console.log({ user })

  useEffect(() => {
    //127.0.0.1:8000/api/messages/conversations/{id}
    axios.get('/api/messages/conversations/' + user._id).then((response) => {
      setConversations(response.data)
      console.log('response.data', response.data)
    })
  }, [user])
  return (
    <RequireAuth>
      <div className='h-full w-full h-min-screen'>
        <ConversationList
          conversations={conversations}
          currentUserId={user._id}
          onSelect={(userId) => console.log('Open chat with', userId)}
        />
      </div>
    </RequireAuth>
  )
}
