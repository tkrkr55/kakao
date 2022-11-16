import React from 'react'

export default function Button({text,onClick}) {
  return (
    <button className='bg-kakao py-2 px-4 text-brawons
    rounded-sm hover:brightness-110
    ' onClick={onClick}>
      {text}
    </button>
  )
}
