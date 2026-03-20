import React from 'react'
import { Button } from './common'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {

  const navigate = useNavigate();

  return (
    <div className='flex h-[calc(100%-10%)] flex-col gap-3  items-center justify-center'>
        <img src="/images/404.svg"/>
        <Button
          className='bg-secondary px-2 text-white rounded-lg font-bold'
          startIcon='left-arrow'
          iconClassName='h-4 w-4 bg-white rounded-full p-1'
          onClick={()=>navigate('/')}
          text="Back To Home"
        />
    </div>
  )
}

export default NotFound;