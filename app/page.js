"use client"
import React, { useEffect } from 'react';
import Landing from '@/app/pages/landing';
import Header from '../components/header';
import { useRecoilState } from 'recoil';
import { CartState } from './state/atoms/CartState';


const page = () => {
  // const [ cart,setCart] = useRecoilState(CartState);
  // useEffect(()=>{
  //   const getlocatstorage = ()=>{
    
  //     let local = JSON.parse(localStorage.getItem('Cake'))
  //     if(local == []){
  //         return [];
  //     }
  //     else{
  //         return local;
  //     }
  //     setCart(getlocatstorage())
  //   }

  // })
  return (
    <>
    {/* <Header /> */}
    <Landing />
    </>
  )
}

export default page