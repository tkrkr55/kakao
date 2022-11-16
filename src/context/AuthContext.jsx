import { createContext, useContext, useEffect, useState } from "react";
import { onUserStateChange ,login,logout} from "../api/firebase";

const AuthContext = createContext();

export function AuthContextProvider({children}){
  const [user,setUser] =useState();


  // 콜백함수로 받아온 user를 setUser란 값에 받아온다.
  useEffect(()=>{

    onUserStateChange(user =>{
      console.log(user)
      setUser(user)
    })
     },[])


  return<AuthContext.Provider value={{user, uid : user && user.uid ,login, logout }}>
    {children}
  </AuthContext.Provider>
}

export function useAuthContext() {
  return useContext(AuthContext)
}