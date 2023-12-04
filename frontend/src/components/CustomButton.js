import React from 'react'

const CustomButton = ({ className, onClick, icon, text }) => {
  return (
    <button
      className={`${className} flex flex-row gap-2 items-center text-lg font-semibold rounded-xl text-orange-700 bg-orange-50 w-fit px-4 py-3 shadow-md`}
      onClick={onClick}
    >
      {icon && React.cloneElement(icon)}
      {text}
    </button>
  )
}

export default CustomButton