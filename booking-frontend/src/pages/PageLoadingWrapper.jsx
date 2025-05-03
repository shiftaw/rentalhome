import React from 'react'
import { Circles, TailSpin } from 'react-loader-spinner'

export default function PageLoadingWrapper({ children, isLoading }) {
  return (
    <div className='h-full min-h-screen w-full '>
      {isLoading ? (
        <div className='min-h-screen w-full flex items-center justify-center '>
          <TailSpin color='#00BFFF' height={80} width={80} />
        </div>
      ) : (
        children
      )}
    </div>
  )
}
