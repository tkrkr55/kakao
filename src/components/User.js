import React from 'react'

export default function User({user:{photoURL, displayName }}) {
  return (
    <div className='flex items-center shrink-0'>
      <img className='w-10 h-10 rounded-full mr-2' src={photoURL} alt={displayName}/>
      
      {/* 이름은 화면 사이즈가 작을때는 숨어져있어 hidden 미디움일땐 블럭으로 보여줘 */}
      <span className='hidden md:block'>{displayName}</span>
    </div>
  )
}
