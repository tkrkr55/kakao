import { Link } from 'react-router-dom'
import { FiShoppingBag } from 'react-icons/fi'
import {BsFillPencilFill} from 'react-icons/bs'
import User from './User'
import Button from './ui/Button'
import { useAuthContext } from '../context/AuthContext'
import CartStatus from './CartStatus'

export default function Navbar() {
   const {user,login,logout} = useAuthContext();
  return (
   <header className='flex justify-between border-b border-gray-300 p-2 font-semibold' >

    <Link to='/' className='flex items-center text-4xl text-brawon'>
      <FiShoppingBag/>
      <h1>Shoppy</h1>
    </Link>
   
   <nav className='flex items-center gap-4'>
    <Link to='products'>Products</Link>
  { user && (  <Link to='/carts'>
    <CartStatus/>
  </Link>)}
    { user && user.isAdmin && (
      <Link to='/products/new' className='text-2xl'>
      <BsFillPencilFill/>
    </Link>
    )}
    {/* !user가 없는경우 로그인이라는 UI를 보여준다
      user가 있는경우 즉 로그인을 한경우 Logout을 보여준다. */}
     {user && <User user={user}/>}
    {!user && <Button text={'Login'} onClick={login} />}
    {user && <Button text={'Logout'} onClick={logout} />}


   </nav>
   </header>
  )
}
