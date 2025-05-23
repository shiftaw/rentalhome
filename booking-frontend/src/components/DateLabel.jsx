import React from 'react'
const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export default function DateLabel({ date }) {
  const d = new Date()
  return (
    <div>
      {monthNames[d.getMonth()]} {d.getDate()}
    </div>
  )
}
