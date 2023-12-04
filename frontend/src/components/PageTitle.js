import React from 'react'

const PageTitle = ({ className, title }) => {
  return (
    <p className={`${className} text-3xl text-orange-700 font-semibold`}>{title}</p>
  )
}

export default PageTitle