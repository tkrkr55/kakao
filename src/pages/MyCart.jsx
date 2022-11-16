import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { getCart } from '../api/firebase';
import CartItem from '../components/CartItem';
import { useAuthContext } from '../context/AuthContext'
import {BsFillPlusCircleFill } from 'react-icons/bs'
import {FaEquals} from 'react-icons/fa'
import PriceCard from '../components/PriceCard';
import Button from '../components/ui/Button';

const SHIPPING = 3000;
export default function MyCart() {
  
  const  {uid} = useAuthContext();
  const {isLoading, data: products } =useQuery(['carts'], () => getCart(uid))

  if(isLoading) return <p>Loading...</p>
  

  //쇼핑카드 안에 아이템이 있는지 없는지 확인하기
  const hasProducts = products && products.length > 0;

  // 아이템의 가격을 더해줄 수 있는데 reduce를 사용한다 (prev 누적된 값 + current 가져오는값
  //  단 current는 json  형태이기에 정수로 변환해줄 parseInt로 적용해 price를 꺼내온다. 
  // 그값에 current 수량을 곱해주고 초기값을 0 으로 해준다. 그게 totalPrice가 된다.

  const  totalPrice =products && products.reduce(
    (prev , current )=> prev + parseInt(current.price)*current.quantity,0)


  return (
    <section className='p-8 flex flex-col  '>
      <p className='text-2xl text-center font-bold border-b border-gray-300 pb-4'>내 장바구니</p>
      {!hasProducts && <p>장바구니에 상품이 없습니다. 😥</p>}
      {/* 장바구니에 상품이 있다면 아이템들을 보여줄께  */}
      {hasProducts &&  <>
        <ul className='border-b border-gray-300 mb-8 p-4 px-8'>
          {/* map을통해 아이템을 하나씩 꺼내서 <CartItem>에 보여줄게 */}
          {products && products.map(product => 
          <CartItem key={product.id} product={product} uid={uid}/>)}
        </ul>
        <div className='flex justify-between items-center p-2 md:px-8 lg:px-16 mb-4'>
          <PriceCard text="상품총액" className='shrink-0' price={totalPrice} />
          <BsFillPlusCircleFill/>
          <PriceCard className='shrink-0' text="배송액" price={SHIPPING} />
          <FaEquals/>
          <PriceCard text="총가격" price={totalPrice + SHIPPING} />
        </div>
        <Button text='주문하기' />
      </>}
    </section>
  )
}
