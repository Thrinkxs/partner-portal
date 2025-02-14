import Image from 'next/image'
import React from 'react'

const Logo = () => {
  return (
    <div className=''>
        <Image src="/logo.png" alt="logo" width={300} height={300} />
    </div>
  )
}

export default Logo