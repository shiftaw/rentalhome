import React from 'react'
import { Link } from 'react-router-dom'

const ConversationList = ({ conversations, currentUserId, onSelect }) => {
  return (
    <div class='conversation-list flex flex-col gap-0.5'>
      {conversations.map((conv) => {
        console.log({ conv })
        const isSentByUser = conv.last_message_sender_id === currentUserId
        const other_user = isSentByUser
          ? conv.receiver
          : conv.last_message_sender_id

        return (
          <Link to={'/chat/' + other_user}>
            <div
              role='button'
              className=' bg-gray-100 text-slate-800 flex w-full items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100'
            >
              <div
                key={conv.user_id}
                class='mr-4 grid place-items-center'
                onClick={() => onSelect(conv.user_id)}
              >
                <img
                  alt='candice'
                  src='https://docs.material-tailwind.com/img/face-1.jpg'
                  className='inline-block h-12 w-12 rounded-full  object-cover object-center'
                />
              </div>
              <div className=''>
                <h6 className='text-[#1f1f1f] font-medium'>{conv.name}</h6>
                <div className='text-[#7d7d7d] text-sm flex'>
                  {isSentByUser && <div> You: </div>}
                  <p className='truncate w-[260px] '>{conv.last_message}</p>
                </div>
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}

export default ConversationList
