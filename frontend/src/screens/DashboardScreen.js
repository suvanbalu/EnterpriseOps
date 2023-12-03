import React from 'react'

const DashboardScreen = () => {
  return (
    <div className='px-8 flex flex-col gap-6 w-full'>
      <p className='text-2xl font-semibold text-orange-700'>Dashboard</p>
      <div className='flex flex-row gap-4'>
        <div className='w-1/3 h-96 bg-red-100 rounded-xl'></div>
        <div className='w-1/3 h-96 bg-blue-100 rounded-xl'></div>
        <div className='w-1/3 h-96 bg-green-100 rounded-xl'></div>
      </div>

      <p className='text-xl font-semibold text-orange-700'>Recent Transanctions</p>

    </div>
  )
}

export default DashboardScreen