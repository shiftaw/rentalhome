import React from 'react'
import clsx from 'clsx'

export default function Message({ message, isYours }) {
  console.log({ isYours })
  return (
    <div
      className={clsx('flex p-2', isYours ? 'justify-end' : 'justify-start')}
    >
      <div
        className={clsx(
          ' w-fit',
          'text-md p-2 pl-4 ',
          isYours
            ? 'bg-teal-600 text-white text-right rounded-r-2xl rounded-l-full'
            : 'bg-slate-100 text-left rounded-full p-2 pr-4'
        )}
      >
        {message}
      </div>
    </div>
  )
}
