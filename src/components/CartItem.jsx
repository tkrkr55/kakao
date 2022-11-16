import React from 'react'
import { AiOutlineMinusSquare, AiOutlinePlaySquare, AiOutlinePlusSquare } from 'react-icons/ai'
import {RiDeleteBin5Fill} from 'react-icons/ri'
import { addOrUpdateToCart, removeFromCart } from '../api/firebase'

const ICON_CLASS ='transition-all cursor-pointer hover:text-org hover:scale-105 mx-1'
export default function CartItem({product, product:{id,image,title,option,quantity,price, },uid}) {
  
  const handleMinus = () =>{
    if(quantity <2 ) return
    // uid = 사용자의 카트 / 의 제품을 업데이트 해줄래?  제품은 기존 프로덕은 유지하되 수량만 :   바꿀거고 수량은 -1 할거야
    addOrUpdateToCart(uid,{...product, quantity: quantity -1})
  }
  const handleplus= () => addOrUpdateToCart(uid,{...product, quantity: quantity +1 })
 
   // 사용자의 카트에서 제품의 아이디 product.id 인데 그냥 id만 해줘도 된다.
  const handleDelet = () => removeFromCart(uid, id)
  
   
   
  return (
    <li className='flex justify-between my-2 items-center' >
      <img className='w-24 md:w-48 rounded-lg ml-4 ' src={image} alt={title}/>
      <div className='flex-1 flex justify-between ml-4'>
        <div className='basis-3/5 '>
        <p className='text-lg'>{title}</p>
        <p className='text-xl font-bold text-org'>{option}</p>
        <p className=''>₩{price}</p>
        </div>
      
      <div className='text-2xl flex items-center '>
      {/* 수량을 마이너스해줌 */}
      <AiOutlineMinusSquare className={ICON_CLASS} onClick={handleMinus}/>
      <span>{quantity}</span>
      {/* 수량을 더해줌 */}
      <AiOutlinePlusSquare className={ICON_CLASS} onClick={handleplus}/>
      {/* 삭제해줌 */}
      <RiDeleteBin5Fill onClick={handleDelet} className={ICON_CLASS}  />
      </div>
      </div>
    </li>
  )
}
