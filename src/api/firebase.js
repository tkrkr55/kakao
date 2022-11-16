import { initializeApp } from "firebase/app";
import {v4 as uuid} from 'uuid'
import { getAuth, signInWithPopup, GoogleAuthProvider,signOut ,onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, get, set, remove} from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FITEBASE_API_KEY,
  authDomain: process.env.REACT_APP_FITEBASE_DOMAIN,
  databaseURL: process.env.REACT_APP_FITEBASE_DB_URL,
  projectId: process.env.REACT_APP_FITEBASE_PROJECT_ID,
 
};


const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const db = getDatabase(app);

// 로그인된 유저의 정보를 받아오는 함수 -> 홈페이지에 나와있음
export async function login(){
  return signInWithPopup(auth, provider).catch(console.error)
}

// 로그인된거를 signOut 하여서 null값으로 만드는 함수
export async function logout(){
  return signOut(auth).catch(console.error)
}

// 콜백함수를 이용해서 user의 정보를 onUserStateChange로 넘겨준다.
export function onUserStateChange(callback){
  onAuthStateChanged(auth, async (user) => {
    const updatedUser =  user ? await adminUser(user) : null

   callback(updatedUser)
  });
  
}

// 네트워크 통신을 할경우 async를 붙혀줘야 한다.
async function adminUser (user){

  return get(ref(db,'admins'))//
  .then((snapshot)=>{
    if(snapshot.exists()){
      const admins = snapshot.val();
      const isAdmin = admins.includes(user.uid)
      return {...user, isAdmin}
    }
    return user
  })
}


// 제품에 관한것


export async function addNewProduct(product,image){
  const id = uuid()
 return set(ref(db, `products/${id}`), {
  ...product,
  id,
  price:parseInt(product.price),
  image,
  options:product.options.split(',')
 })
}

export async function getProducts(){
  return get(ref(db,'products')).then(snapshot => {
    if(snapshot.exists()){
      return Object.values(snapshot.val())
    }

    return[];
  })
}

// 쇼핑카트

export async function getCart(userId){
  return get(ref(db,`carts/${userId}`))
  .then (snapshot =>{
    const items = snapshot.val() || {}
    return Object.values(items)
  })
}

export async function addOrUpdateToCart(userId,product){
  return set(ref(db,`carts/${userId}/${product.id}`),product)
}
export async function removeFromCart (userId,productId){
 return remove(ref(db,`carts/${userId}/${productId}`))
}