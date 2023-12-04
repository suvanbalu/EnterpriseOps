import React from 'react'

const HighlightedNumber = ({ className, title, value }) => {
  return (
    <div className={`${className} flex flex-col gap-1 text-center w-1/4`}>
      <p className='text-xs text-gray-700'>{title}</p>
      <p className='text-2xl font-semibold'>{value}</p>
    </div>
  )
}

export default HighlightedNumber