import { useAppSelector } from '@helpers/redux.hooks'

import React from 'react'

const AccountOverview = ({ currentView }: { currentView: string }) => {
  const { user: { user } } = useAppSelector(state => state)

  return (
    <div>
      <h1 className='h-12 py-2 border-b font-semibold px-4 text-xl'>
        {currentView}
      </h1>
      <div className='flex justify-between gap-4 px-4'>
        <div className=' flex border h-52 flex-1 mt-4 flex-col rounded-md'>
          <h1 className='border-b flex items-center h-12 px-4'>ACCOUNT DETAILS</h1>
          <div className='flex-1 flex flex-col font-extralight py-4 px-4 gap-2'>
            <span className='font-thin'>
              {user?.firstName} {user?.lastName}
            </span>
            <span className='text-gray-400 text-sm'>
              {user?.email}
            </span>
          </div>

        </div>
        <div className='flex-1 flex border h-52 mt-4 flex-col rounded-md' >
          <h1 className='border-b flex items-center h-12 px-4'>ADDRESS BOOK</h1>
        </div>
      </div>
    </div>
  )
}

export default AccountOverview

