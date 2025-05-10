import React, { useState, useRef } from 'react'
import { Button } from '../components/ui/button'
import { SendHorizontal } from 'lucide-react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const styles = {
  container: {
    display: 'flex',
    padding: '10px',
    borderTop: '1px solid #ccc',
    background: '#f9f9f9',
  },
  input: {
    flex: 1,
    resize: 'none',
    padding: '8px',
    fontSize: '1rem',
    borderRadius: '8px',
    border: '1px solid #ccc',
    overflow: 'hidden',
    lineHeight: '1.5',
    minHeight: '40px',
    marginRight: '8px',
  },
  button: {
    padding: '8px 16px',
    backgroundColor: '#1976d2',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
}

export default function SendMEssage() {
  const [message, setMessage] = useState('')
  const [sentMessage, setSentMessage] = useState([])
  const textareaRef = useRef(null)
  const params = useParams()

  const handleChange = (e) => {
    console.log(e)
    setMessage(e.target.value)
    autoResize()
  }
  const handleSend = () => {
    autoResize()
    setSentMessage((prev) => [...prev, message])
    const token = localStorage.getItem('token')

    axios.post(
      '/api/messages/send',
      {
        receiver_id: params.id,
        content: message,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    setMessage('')
  }

  const autoResize = () => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto' // reset height
      textarea.style.height = `${textarea.scrollHeight}px` // grow as needed
    }
  }
  return (
    <div className='flex h-[100%] w-full flex-col px-4 justify-end overflow-hidden'>
      <div className='flex flex-col'>
        {sentMessage.map((msg) => {
          return (
            <div className='text-right p-4 mb-4 bg-[#e3eced] rounded-[8px]'>
              {msg}
            </div>
          )
        })}
      </div>
      <div className='  mt-4 flex items-end pb-[0px]  justify-center'>
        <textarea
          ref={textareaRef}
          style={styles.input}
          rows={1}
          placeholder='Type your message...'
          value={message}
          onChange={handleChange}
        ></textarea>
        <Button
          variant='outline'
          size='icon'
          className='border-none shadow-none'
          onClick={handleSend}
        >
          <SendHorizontal />
        </Button>
      </div>
    </div>
  )
}
